import { writable } from 'svelte/store'

const cache = new Map()

export default function fetchData(url: string, opt = {}) {
  const store = writable(new Promise(() => {}))

  if (cache.has(url))
    store.set(Promise.resolve(cache.get(url)))

  const load = async () => {
    try {
      const response = await fetch(url, opt)
      const data = await response.json()
      cache.set(url, data)
      store.set(Promise.resolve(data))
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  load()
  return store
}