<script lang="typescript">
  import lazyload from '../actions/lazyload'
  export let imgSrc: string
  export let dataSrc: string
  export let imgAlt: string
</script>

<img
  use:lazyload
  src={imgSrc}
  data-src={dataSrc}
  alt={imgAlt}
  class="lazy"
/>

<style>
  img {
    width: 300px;
  }
  .lazy {
    filter: blur(1.5rem);
  }
</style>