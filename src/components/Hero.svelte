<script lang="ts">
  import lazyload from '@actions/lazyload';

  export let height = 'min-h-screen';
  export let image: string;
  export const image_placeholder: string = '';
  export let styles: string = '';
  export let gradient = 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))';
</script>

<style lang="postcss">
</style>

<section
  use:lazyload
  class="grid grid-cols-1 gap-x-4 {height} bg-cover bg-center items-center justify-items-center relative {styles}"
  style="background-image: {gradient}, url({image})"
  {...$$restProps}>
  <slot />
</section>
