import { createMachine, assign } from 'xstate';
import { auth, createUserWithEmailAndPassword, loginWithEmailPassword, loginWithGoogle } from '../firebase'
import type { 
  AuthContext, 
  AuthEvent, 
  AuthState,
} from './types'
import { assertEventType, userMapper } from './utils';

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
        onDone: { target: 'loggedIn', actions: assign({
          user: (context, event) => {
            return event.data;
          }
        }) },
        onError: {
          target: 'loggedOut.failure',
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
    // we will transition to failure in
    // case of wrong password, username
    // or network error
    loggedOut: {
      initial: 'ok',
      states: {
        ok: { type: 'final' },
        failure: {}
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
          actions: assign({ error: (context, event) => undefined })
        },
        onError: {
          // transition to failure state
          // and set an error
          target: 'loggedOut.failure',
          actions: assign({
            error: (context, event) => {
              assertEventType(event, "ERROR");
              return event.data
            }
          })
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
          actions: assign({ error: (context, event) => undefined })
        },
        onError: {
          // transition to failure state
          // and set an error
          target: 'loggedOut.failure',
          actions: assign({
            error: (context, event) => {
              assertEventType(event, "ERROR");
              return event.data
            }
          })
        }
      }
    },
    loggingOut: {
      invoke: {
        id: 'logout',
        src: 'logout',
        onDone: {
          target: 'loggedOut',
          actions: [
            assign({
              auth: (context, event) => undefined
            }), 
            assign({ error: (context, event) => undefined })
          ]
        },
        onError: {
          target: 'loggedOut.failure',
          actions: [
            // clear auth
            assign({
              auth: (context, event) => undefined
            }),
            // set error 
            assign({
              error: (context, event) => {
                // assertEventType(event, "ERROR");
                return event.data
              }
            })
          ]
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
        assertEventType(event, "LOGIN");
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
    authChecker: (context, event) =>
      new Promise((resolve, reject) => {
        const unsubscribe = auth.onIdTokenChanged(auth => {
          unsubscribe();
          return auth ? resolve(auth) : reject();
        });
      }),
    authenticator: (context, event) => {
      assertEventType(event, "LOGIN");
      if (event.provider === 'email') {
				return loginWithEmailPassword(event.email!, event.password!);
			} else if (event.provider === 'google') {
				return loginWithGoogle();
      } else {
        return Promise.reject('Firebase Auth Provider Error')
      }
    },
    createUser: (context, event) => {
      assertEventType(event, "REGISTER");
			return createUserWithEmailAndPassword(event.email!, event.password!);
    },
    loader: async (context, event) => {
      return new Promise(resolve => {
        // auth object is already set on the app context
        // by authChecker service
        context.auth?.getIdTokenResult()
          .then(({ claims }) => claims)
          .then(resolve);
      });
    },
    logout: () => auth.signOut()
  }
});
