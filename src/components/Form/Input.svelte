<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Writable } from "svelte/store";
  import type { JsonString } from "../../types";

  export let store: Writable<JsonString>;

  export let name: string;

  const dispatch = createEventDispatcher();

  let value: string;

  store.subscribe((v) => (value = v[name]));

  const onInput = (e: Event) => {
    store.update(v => {
      v[name] = value;
      return v;
    });
    dispatch("input", e);
  };
</script>

<div>
  <label 
    class="text-xs font-bold text-white tracking-wide invisible" 
    for={$$restProps.name}>{$$restProps.placeholder}</label>
  <input 
    class="w-full bg-transparent py-2 border-b border-white focus:outline-none placeholder-gray-300" 
    bind:value 
    on:input={onInput} {name} {...$$restProps} />
</div>