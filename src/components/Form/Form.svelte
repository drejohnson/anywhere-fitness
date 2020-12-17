<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';

  export let name: string;

  const dispatch = createEventDispatcher();

  const store = writable({});
  const onSubmit = (e: Event) => dispatch('submit', { e, store });
</script>

<style lang="postcss">
</style>

<form
  class="flex flex-col"
  on:submit|preventDefault={onSubmit}
  {...$$restProps}>
  <slot {store} />

  <button class="btn btn-white-outline rounded-full text-xs mt-6 self-end">
    {name}
  </button>
</form>
