<script lang="typescript">
  import type firebase from 'firebase/app';
  export let user: Partial<firebase.User> | undefined;
</script>

<style lang="postcss">
</style>

<div class="text-white">
  {#if user}
    <p>Your id is {user.uid}</p>
    <p>Your email is {user.email}</p>
  {/if}
</div>
