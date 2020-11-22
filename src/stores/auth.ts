import { writable } from 'svelte/store'

export enum Status {
  AUTHENTICATING = "AUTHENTICATING",
  AUTHENTICATED = "AUTHENTICATED",
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
  HAS_ERRORS = "HAS_ERRORS"
}

export interface User {
  _id: string
  firstName?: String
  lastName?: String
  email: String
  role: String
}

export interface Auth {
  status: Status
  user?: User
  token?: String
}

export const auth = writable<Auth>({ status: Status.NOT_AUTHENTICATED })