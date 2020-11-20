import { writable } from 'svelte/store'
import {request} from '../graphql/request'

export const createRequest = () => {
  const { subscribe, set } = writable({})

  return {
    subscribe,
    useQuery: async (query: string, variable: unknown) => {
      const result = await request(query, variable)
      set(result?.data as any)
    },
  }
}

// export const store = (fetch) => createRequest(fetch)
