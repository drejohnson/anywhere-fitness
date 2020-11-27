<script lang="typescript">
  import { auth, Status } from "../stores/auth";
  import Profile from "../components/Profile.svelte";
  import Logout from "../components/Logout.svelte";

  console.log($auth.user);
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
      <div class="w-full pt-24 px-64 z-10">
        {#if $auth.status === Status.AUTHENTICATED}
          <Profile user={$auth.user} />
          <!-- <Logout /> -->
        {:else}
          <h3 class="text-white">Try logging in</h3>
        {/if}
      </div>
    </section>
  </div>
</div>
