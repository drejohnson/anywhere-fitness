<script lang="typescript">
  import { auth, Status } from "../stores/auth";
  import Profile from "../components/Profile.svelte";
  import Logout from "../components/Logout.svelte";
</script>

<style>
  /* your styles go here */
</style>

{#if $auth.status === Status.AUTHENTICATED}
  <Profile user={$auth.user} />
  <Logout />
{:else}
  <h3>Try logging in</h3>
{/if}
