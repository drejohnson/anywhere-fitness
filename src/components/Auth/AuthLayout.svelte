<script lang="ts">
  import { link, navigate } from "svelte-navigator";
  import Hero from '../Hero.svelte'
</script>

<style lang="postcss">
</style>

<Hero
  styles={"z-50"}
  image="{import.meta.env.SNOWPACK_PUBLIC_CLOUDINARY_URL}/v1607099917/anywhere-fitness/outdoor-push-ups-optimized.webp"
  gradient={"linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,1))"}>
  <div class="grid md:grid-cols-2 p-8">
    <div class="intro text-white mb-4">
      <a href="/" use:link>
        <img class="logo w-150px md:w-200px" src="/logo.svg" alt="Anywhere Fitness Logo" />
      </a>
      <slot name="subTitle"></slot>
    </div>
    <slot name="form"></slot> 
  </div>
  <button on:click="{() => navigate(-1)}" class="text-white absolute top-0 left-0 py-2 px-6">
    <svg class="icon icon-arrow-left stroke-current fill-current stroke-0 w-6 h-6">
      <use xlink:href="#icon-arrow-left"></use>
    </svg>
  </button>
</Hero>