<script lang="typescript">
  import type { FirebaseUser } from '../types'
  export let user: FirebaseUser | undefined;
</script>

<style lang="postcss">
</style>

<div class="text-white">
  {#if user}
    <p>Your id is {user.uid}</p>
    <p>Your email is {user.email}</p>
  {/if}
</div>
