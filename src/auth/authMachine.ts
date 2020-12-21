import { createMachine, assign } from 'xstate';
import { auth, createUserWithEmailAndPassword, loginWithEmailPassword, loginWithGoogle } from '../firebase'
import type { 
  AuthContext, 
  AuthEvent, 
  AuthState,
} from './types'
import { assertEventType, emailReg, passwordReg } from './utils';

export const authMachine = createMachine<AuthContext, AuthEvent, AuthState>({
  id: 'authentication',
  initial: 'authenticating',
  context: {
    auth: undefined,
    user: undefined,
    error: undefined
  },
  states: {
    authenticating: {
      invoke: {
        id: 'authChecker',
        src: 'authChecker',
        onDone: { target: 'loading', actions: 'setAuth' },
        onError: { target: 'loggedOut' }
      }
    },
    // we will enrich the user profile
    // with additional data
    loading: {
      invoke: {
        id: 'loader',
        src: 'loader',
        onDone: { target: 'loggedIn', actions: 'setUser' },
        onError: {
          target: 'loggedOut.authFailed',
          actions: ['setError', 'clearAuth']
        }
      }
    },
    loggedIn: {
      // when receiving 'LOGOUT' event
      // transition to singingOut state
      on: { LOGOUT: { target: 'loggingOut' } }
    },
    // loggedOut has two sub-states
    // we will transition to authFailed in
    // case of wrong password, username
    // or network error
    loggedOut: {
      initial: 'ok',
      states: {
        ok: { type: 'final' },
        invalidEmail: {},
        invalidPassword: {},
        authFailed: {}
      },
      on: {
        LOGIN: { target: 'loggingIn' },
        REGISTER: { target: 'creatingUser' }
      }
    },
    loggingIn: {
      invoke: {
        id: 'authenticator',
        src: 'authenticator',
        onDone: {
          target: 'authenticating',
          // clear error if successful login
          actions: 'clearError'
        },
        onError: {
          // transition to authFailed state
          // and set an error
          target: 'loggedOut.authFailed',
          actions: 'setError'
        }
      }
    },
    creatingUser: {
      invoke: {
        id: 'createUser',
        src: 'createUser',
        onDone: {
          target: 'authenticating',
          // clear error if successful login
          actions: 'clearError'
        },
        onError: {
          // transition to authFailed state
          // and set an error
          target: 'loggedOut.authFailed',
          actions: 'setError'
        }
      }
    },
    loggingOut: {
      invoke: {
        id: 'logout',
        src: 'logout',
        onDone: {
          target: 'loggedOut',
          actions: ['clearAuth', 'clearError']
        },
        onError: {
          target: 'loggedOut.authFailed',
          actions: ['clearAuth', 'setError']
        }
      }
    }
  }
}, {
  actions: {
    clearAuth: assign({
      auth: (context, event) => undefined
    }),
    clearError: assign({ error: (context, event) => undefined }),
    setAuth: assign({
      auth: (context, event) => {
        assertEventType(event, "done.invoke.authChecker");
        return event.data;
      }
    }),
    setUser: assign({
      user: (context, event) => {
        assertEventType(event, "done.invoke.loader");
        return event.data;
      }
    }),
    setError: assign({
      error: (context, event) => {
        assertEventType(event, "ERROR");
        return event.data
      }
    }),
  },
  guards: {
    checkEmail: (_, event) => {
      assertEventType(event, "REGISTER");
      return !emailReg.test(event.email)
    },
    checkPassword: (_, event) => {
      assertEventType(event, "REGISTER");
      return !passwordReg.test(event.password)
    }
  },
  services: {
    // ...services,
    authChecker: () =>
      new Promise((resolve, reject) => {
        const unsubscribe = auth.onIdTokenChanged(user => {
          unsubscribe();
          return user ? resolve(user) : reject();
        });
      }),
    authenticator: (context, event) => {
      assertEventType(event, "LOGIN");
      if (event.provider === 'email') {
        return loginWithEmailPassword(event.email!, event.password!)
			} else if (event.provider === 'google') {
        return loginWithGoogle()
      } else {
        return Promise.reject('Firebase Auth Provider Error')
      }
    },
    createUser: (context, event) => {
      assertEventType(event, "REGISTER");
			return createUserWithEmailAndPassword(event.email, event.password).then(() => {
        let user = auth.currentUser
        user?.updateProfile({
          displayName: `${event.firstName} ${event.lastName}`
        })
      });
    },
    loader: async (context, event) => {
      const token = await context.auth?.getIdTokenResult(true)
      return token?.claims
    },
    logout: () => auth.signOut()
  }
});
