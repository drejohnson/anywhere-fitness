import { writable } from 'svelte/store';

export const placeResult = writable<google.maps.places.PlaceResult | undefined>(undefined)

export const currentLocation = writable('')