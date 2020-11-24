import type { Auth, User } from "./stores/auth";

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type JsonString = { [key: string]: string };
export type JsonBool = { [key: string]: boolean };

export interface SignupPayload {
  createUser: {
    user: User;
    token: string;
    error?: {
      status: string;
      message: string;
    };
  };
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