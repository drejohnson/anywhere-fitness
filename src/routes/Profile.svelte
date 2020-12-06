<script lang="ts">
  import { authStore } from "../stores/auth";
  import ProfileInfo from '../components/ProfileInfo.svelte'
  import Logout from '../components/Auth/Logout.svelte'

</script>

<style lang="postcss">
  
</style>

<section class="profile bg-black flex flex-col justify-center items-center w-full min-h-screen px-4">

  {#if $authStore}
     <ProfileInfo user={$authStore?.user} />
     <Logout />
  {/if}
</section>