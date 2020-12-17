<script lang="ts">
  import {
    getCoordinates,
    getCurrentLocation,
    getAutocomplete,
  } from '@app/utils/geolocate';
  import { currentLocation } from '@app/stores/location';

  export let name = '';

  let searchInput: HTMLInputElement;

  $: value = searchInput?.value;
  $: getAutocomplete(searchInput);
  $: getCoordinates(getCurrentLocation);
</script>

<style lang="postcss">
</style>

<div
  class="relative text-gray-800 focus-within:text-gray-600 w-full border-solid border-l border-gray-600">
  <span class="absolute inset-y-0 left-0 flex items-center pl-2">
    <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
      <svg class="icon icon-location_pin w-4 h-4"><use
          xlink:href="#icon-location_pin" /></svg>
    </button>
  </span>

  <input
    bind:this={searchInput}
    class="py-2 text-sm text-black  bg-white rounded-md pl-10 focus:outline-none focus:bg-white focus:text-black"
    type="text"
    placeholder={$currentLocation}
    {name}
    bind:value />
  <span class="absolute inset-y-0 right-0 flex items-center pr-2">
    <button
      on:click={() => alert('Get current location')}
      class="p-1 focus:outline-none focus:shadow-outline">
      <svg class="icon icon-navigation w-4 h-4"><use
          xlink:href="#icon-navigation" /></svg>
    </button>
  </span>
</div>
