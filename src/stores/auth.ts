import { writable } from 'svelte/store'

interface User {
  firstName?: String
  lastName?: String
  email: String
  role: String
}

interface Auth {
  status: String
  user?: User
  token?: String
}

export const authState = writable<Auth>({ status: 'loading' })
