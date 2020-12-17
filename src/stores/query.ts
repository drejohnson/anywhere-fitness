import { useLocation } from "svelte-navigator";
import { readable } from "svelte/store";

export const query = (q: string) => readable<string | null>(null, set => {
  const location = useLocation();
  const unsub = location.subscribe(({search}) => {
    set(new URLSearchParams(search).get(q))
  })
  return unsub;
});

export const useQuery = readable<URLSearchParams | null>(null, set => {
  const location = useLocation();
  const unsub = location.subscribe(value => {
    set(new URLSearchParams(value.search))
  })
  return unsub;
});