<script lang="ts">
  import type { SubmitEvent } from '../types';
  import Form from '@components/Form/Form.svelte';
  import Input from '@components/Form/Input.svelte';
  import AutoComplete from '@app/components/AutoComplete.svelte';

  export let onSubmit: (event: SubmitEvent) => {};
  let name = 'Search Classes';
</script>

<style lang="postcss">
</style>

<div class="flex justify-center items-center w-full bg-white rounded-md">
  <Form on:submit={onSubmit} name="search classes" let:store>
    <div class="relative text-gray-800 focus-within:text-gray-600 w-full">
      <span class="absolute inset-y-0 left-0 flex items-center pl-2">
        <button
          type="submit"
          class="p-1 focus:outline-none focus:shadow-outline">
          <svg class="icon icon-search w-4 h-4"><use
              xlink:href="#icon-search" /></svg>
        </button>
      </span>
      <Input
        {store}
        type="search"
        name="search"
        showLabel={false}
        styleClasses="py-2 text-sm text-black  bg-white rounded-md pl-10 focus:outline-none focus:bg-white focus:text-black"
        placeholder="Search for classes anywhere" />
    </div>
  </Form>
  <AutoComplete />
</div>
