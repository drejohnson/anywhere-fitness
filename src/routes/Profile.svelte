<script lang="ts">
  import { initAuth } from "../stores/firebase-auth";
  import ProfileInfo from '../components/ProfileInfo.svelte'
  import Logout from '../components/Auth/Logout.svelte'

  const { tokenResult } = initAuth()
</script>

<style lang="postcss">
  
</style>

<section class="profile bg-black flex flex-col justify-center items-center w-full min-h-screen px-4">

  {#if $tokenResult}
     <ProfileInfo user={$tokenResult?.user} />
     <Logout />
  {/if}
</section>