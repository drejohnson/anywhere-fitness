import type { Writable } from 'svelte/store'
import type firebase from 'firebase/app';

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type JsonString = { [key: string]: string };
export type JsonBool = { [key: string]: boolean };

export interface SubmitEvent {
  detail: {store: Writable<JsonString>}
}

export enum Status {
  AUTHENTICATING = "AUTHENTICATING",
  AUTHENTICATED = "AUTHENTICATED",
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
  HAS_ERRORS = "HAS_ERRORS"
}

export interface User {
  user_id: string
  name: string
  email: string
  picture: string
}

export interface TokenResult {
  user: Partial<firebase.User>
  token: string
}

export interface Auth {
  status: Status
  user?: Partial<firebase.User>
  token?: string
}

export interface AuthInputs {
  email: string;
  password: string;
}

export interface SignupInputs extends AuthInputs {
  firstName: string;
  lastName: string;
  role: string;
}

export interface LoginPayload {
  loginUser: {
    user: User;
    token: string;
  };
}