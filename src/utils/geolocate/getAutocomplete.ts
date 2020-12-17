import { placeResult, currentLocation } from '@app/stores/location';
import { Loader } from '@googlemaps/js-api-loader';

export const getAutocomplete = async (
  searchInput: HTMLInputElement) => {
  await new Loader({
    apiKey: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_API_KEY,
    libraries: ['places'],
  }).load();

  if (searchInput) {
    const onPlaceChanged = () => {
      const place = autocomplete.getPlace();
      placeResult.set(place)
    };

    let autocomplete = new google.maps.places.Autocomplete(searchInput, {
      types: ['(cities)'],
    } as google.maps.places.AutocompleteOptions);

    autocomplete.setFields(['formatted_address']);

    autocomplete.addListener('place_changed', onPlaceChanged);
  }
}