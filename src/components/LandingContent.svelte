<script lang="ts">
</script>

<style lang="postcss">
</style>

<section class="grid {$$slots.image ? "grid-rows-2 md:grid-rows-1 md:grid-cols-2 bg-gray-200" : "md:grid-cols-1"} gap-x-4">
  {#if $$slots.image}
     <slot name="image"></slot>
  {/if}
  
  <div class="flex flex-col justify-center items-center my-10 {!$$slots.image ? "md:px-24" : ""} px-4">
    <slot name="heading"></slot>
    <slot name="text"></slot> 
    <slot name="cta"></slot>
  </div>
</section>

