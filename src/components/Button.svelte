<script lang="ts">
  export let text: string;
  export let textColor = 'text-white';
  export let textHover = 'text-black';
  export let borderColor = 'border-white';
  export let bgHover = 'bg-white';
</script>

<style lang="postcss">
</style>

<button
  class={`text-base ${textColor} hover:${textHover} font-display border-2 border-solid ${borderColor} py-2 px-16 focus:outline-none hover:${bgHover} rounded-full`}
  on:click>{text}
</button>
