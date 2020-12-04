<script lang="ts">
  export let heading: string;
  export let subHeading: string | null
</script>

<style lang="postcss">
</style>

<div class="flex flex-col items-center px-6 text-center leading-none">
  <h1 class="uppercase text-4xl md:text-6xl font-display text-white mb-2">
    {heading}
  </h1>
  {#if subHeading}
    <h3 class="text-2xl text-white mb-4">
      {subHeading}
    </h3>
  {/if}
  <slot></slot>
</div>