<script lang="ts">
import lazyload from '@actions/lazyload'


  export let image: string;
  export let image_placeholder: string = "";
  export let styles: string = "";
  export let gradient = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))"

</script>

<style lang="postcss">
</style>

<section
  use:lazyload
  class="grid md:auto-cols-fr gap-x-4 min-h-screen bg-cover bg-center items-center justify-items-center relative {styles}"
  style="background-image: {gradient}, url({image})"
  {...$$restProps}>
  <slot></slot>
</section>