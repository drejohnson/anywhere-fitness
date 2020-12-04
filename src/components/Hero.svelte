<script lang="ts">
  export let image: string;
  export let styles: string = "";
  export let gradient = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))"
</script>

<style lang="postcss">
</style>

<section 
  class="grid md:auto-cols-fr gap-x-4 min-h-screen bg-cover bg-center items-center justify-items-center relative {styles}"
  style="background-image: {gradient}, url({image})"
  {...$$restProps}>
  <slot></slot>
</section>