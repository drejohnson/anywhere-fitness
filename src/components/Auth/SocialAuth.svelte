<script lang="ts">
  import SocialButton from './SocialButton.svelte'
  export let type = "login"
</script>

<style lang="postcss">
  
</style>

<div class="mt-4">
  <h4 class="text-white mb-2">Or {type} with your social account</h4>
  <SocialButton provider={"google"} />
  <SocialButton provider={"facebook"} />
</div>