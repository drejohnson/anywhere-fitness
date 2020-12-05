<script lang="typescript">
  import { link } from "svelte-navigator";
  import { initAuth } from "../stores/firebase-auth";
  import NavLink from "./NavLink.svelte";

  const {
    tokenResult
  } = initAuth()
  
</script>

<style lang="postcss">
  .navlink {
    @apply font-display text-2xl ml-5 text-white;
  }
</style>

<header
  class="absolute w-full flex flex-wrap p-5 flex-col md:flex-row items-center z-50">
  <a href="/" use:link class="logo w-150px md:w-200px">
    <img src="/logo.svg" alt="Anywhere Fitness Logo" />
  </a>

  <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
    <NavLink to="browse"><span class="navlink">Browse</span></NavLink>
    <NavLink to="about"><span class="navlink">About</span></NavLink>
    <NavLink to={$tokenResult?.user ? "user/profile" : "auth/client/login"}>
      <span
        class="font-display text-base ml-5 text-white hover:text-black border-2 border-solid border-white hover:bg-white rounded-full py-1 px-6">{$tokenResult?.user ? "Profile" : "Sign in"}</span>
    </NavLink>
  </nav>
</header>
