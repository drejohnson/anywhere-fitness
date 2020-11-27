<script lang="typescript">
  import { count } from "../stores/count";
</script>

<style lang="postcss">
  /* your styles go here */
  .bg-image {
    @apply h-screen bg-cover bg-bottom;
  }
</style>

<div class="lg:flex">
  <div class="w-full">
    <section class="bg-image bg-black flex justify-center items-center">
      <div class="w-full pt-24 px-64 z-10 text-white">
        <h1>The count is {$count}</h1>

        <button on:click={count.increment}>+</button>
        <button on:click={count.decrement}>-</button>
        <button on:click={count.reset}>reset</button>
      </div>
    </section>
  </div>
</div>
