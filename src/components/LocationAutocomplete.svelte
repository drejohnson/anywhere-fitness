<script lang="ts">
  import { Loader } from '@googlemaps/js-api-loader';

  interface GeolocationConfig {
    apiKey: string;
    mapOptions?: google.maps.MapOptions;
  }

  interface GeolocationValue {
    coordinates?: google.maps.LatLngLiteral;
  }

  let value: GeolocationValue = { coordinates: undefined };
  let config: GeolocationConfig = {
    apiKey: 'AIzaSyApCVfvEiAkIPtSlvirUVCOxdsDP4HaFww',
  };

  let searchInput: HTMLInputElement;
  let autocomplete: google.maps.places.Autocomplete;
  let placeResult: google.maps.places.PlaceResult;

  $: config && loadMap();
  $: console.log('place result', placeResult);

  const loadMap = async () => {
    await new Loader({
      apiKey: config.apiKey,
      libraries: ['places'],
    }).load();

    autocomplete = new google.maps.places.Autocomplete(searchInput, {
      types: ['(cities)'],
      origin: new google.maps.LatLng(value.coordinates!),
    } as google.maps.places.AutocompleteOptions);

    autocomplete.setFields(['formatted_address', 'geometry']);

    autocomplete.addListener('place_changed', onPlaceChanged);
  };

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();
    placeResult = place;
  };
</script>

<style lang="postcss">
</style>

<input
  class="input"
  type="text"
  placeholder="Search for a location"
  bind:this={searchInput} />
