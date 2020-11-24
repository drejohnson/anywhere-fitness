import type { Auth, User } from "./stores/auth";

export interface SignupPayload {
  createUser: {
    user: User;
    token: String;
    error?: {
      status: String;
      message: String;
    };
  };
}

export interface AuthInputs {
  email: String;
  password: String;
}

export interface SignupInputs extends AuthInputs {
  firstName: String;
  lastName: String;
  role: String;
}

export interface LoginPayload {
  loginUser: {
    user: User;
    token: String;
  };
}