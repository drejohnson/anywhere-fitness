<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';

  export const name: string = '';

  const dispatch = createEventDispatcher();

  const store = writable({});
  const onSubmit = (e: Event) => dispatch('submit', { e, store });
</script>

<style lang="postcss">
</style>

<form
  id="form"
  class="flex flex-col"
  on:submit|preventDefault={onSubmit}
  {...$$restProps}>
  <slot {store} />
</form>
