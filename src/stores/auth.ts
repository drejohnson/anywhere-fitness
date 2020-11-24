import { writable } from 'svelte/store'

export enum Status {
  AUTHENTICATING = "AUTHENTICATING",
  AUTHENTICATED = "AUTHENTICATED",
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
  HAS_ERRORS = "HAS_ERRORS"
}

export interface User {
  _id: string
  firstName?: string
  lastName?: string
  email: string
  role: string
}

export interface Auth {
  status: Status
  user?: User
  token?: string
}

export const auth = writable<Auth>({ status: Status.NOT_AUTHENTICATED })
