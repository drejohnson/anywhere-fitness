<script lang="ts">
  import { state, send } from '../auth';
  import ProfileInfo from '../components/ProfileInfo.svelte';
  import Logout from '../components/Auth/Logout.svelte';

  $: signedIn = $state.matches('loggedIn');
</script>

<style lang="postcss">
</style>

<section
  class="profile bg-black flex flex-col justify-center items-center w-full min-h-screen px-4">
  {#if signedIn}
    <ProfileInfo user={$state.context.user} />
    <Logout />
  {/if}
</section>
