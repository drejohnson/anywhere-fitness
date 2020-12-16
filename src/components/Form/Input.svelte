<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Writable } from 'svelte/store';
  import type { JsonString } from '../../types';

  export let store: Writable<JsonString>;

  export let name: string;
  export let styleClasses: string = '';
  export let showLabel = false;

  const dispatch = createEventDispatcher();

  let value: string;

  store.subscribe((v) => (value = v[name]));

  const onInput = (e: Event) => {
    store.update((v) => {
      v[name] = value;
      return v;
    });
    dispatch('input', e);
  };
</script>

{#if showLabel}
  <label
    class="text-xs font-bold text-white tracking-wide invisible"
    for={$$restProps.name}>{$$restProps.placeholder}</label>
{/if}
<input
  class={styleClasses.length > 0 ? styleClasses : 'input w-full bg-transparent py-2 border-b border-white focus:outline-none placeholder-gray-300'}
  bind:value
  on:input={onInput}
  {name}
  {...$$restProps} />
