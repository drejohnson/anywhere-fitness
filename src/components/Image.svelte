<script lang="ts">
  export let src: string;
  export let alt: string;
  export let styles: string = '';
</script>

<style lang="postcss">
</style>

<img
  class="w-full h-full md:h-400px object-cover object-center ${styles}"
  {src}
  {alt} />
