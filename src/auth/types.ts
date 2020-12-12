import type firebase from 'firebase/app';
import type { ActionFunction, ActionObject, EventObject, ServiceConfig, StateMachine } from 'xstate';

export type TokenResult = Partial<firebase.auth.IdTokenResult>

export type UserClaims = TokenResult['claims']

export interface User {
  user_id: string
  name: string
  email: string
  picture: string
}

export interface UserMapped {
	id: User['user_id'],
	name: User['name'],
	email: User['email'],
	picture: User['picture']
};

export interface AuthStateSchema {
  states: {
    authenticating: {};
    loading: {};
    loggedIn: {};
    loggedOut: {
      states: {
        ok: {},
        failure: {}
      }
    };
    loggingIn: {};
    loggingOut: {}
  };
}

export interface AuthContext {
  auth?: firebase.User
  user?: Partial<UserClaims>
  error?: string
}

// export type AuthEvent =
//   | { type: "AUTHENTICATE", data: firebase.User }
//   | { type: "LOGOUT" }
//   | { type: "LOGIN", provider: string, email: string, password: string, data: UserMapped }
//   | { type: "REGISTER", email: string, password: string, data: UserMapped }
//   | { type: "ERROR", data: string };


export type AuthEvent =
  | { type: 'done.invoke.authChecker', data: firebase.User }
  | { type: "LOGOUT" }
  | { type: "LOGIN", provider: string, email: string, password: string, data: Partial<UserClaims> }
  | { type: "REGISTER", email: string, password: string, data: Partial<firebase.User> }
  | { type: "ERROR", data: string };

export type AuthState =
  | {
      value: 'authenticating';
      context: AuthContext;
    }
  | {
      value: 'loading';
      context: AuthContext;
    }
  | {
      value: 'loggedIn';
      context: AuthContext & { user: UserMapped; error: undefined };
    }
  | {
    value: 'loggedOut';
    context: AuthContext & { user: undefined; error: undefined };
  }
  | {
    value: 'loggingIn';
    context: AuthContext & { user: undefined; error: undefined };
  }
  | {
    value: 'creatingUser';
    context: AuthContext & { user: undefined; error: undefined };
  }
  | {
    value: 'loggingOut';
    context: AuthContext & { user: undefined; error: undefined };
  }
  | {
      value: 'error';
      context: AuthContext & { user: undefined; error: string };
    };

export type AuthMachine = StateMachine<AuthContext, AuthStateSchema, AuthEvent, any>