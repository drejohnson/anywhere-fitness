import { writable } from 'svelte/store'

const cache = new Map()

export default function fetchData(url: string) {
  const store = writable(null)

  if (cache.has(url))
    store.set(cache.get(url))

  const load = async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      cache.set(url, data)
      store.set(data)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  load()
  return store
}