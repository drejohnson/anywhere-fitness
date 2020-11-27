<script lang="typescript">
  import { navigate } from "svelte-navigator";
  import { operationStore, query } from "@urql/svelte";
  import { auth, Status } from "../stores/auth";

  const logout_query = `
    mutation logoutUser {
      logoutUser
    }
  `;

  const logoutStore = operationStore(logout_query);
  query(logoutStore);

  let handleLogout = (e: Event) => {
    $logoutStore;
    auth.set({ status: Status.NOT_AUTHENTICATED });
    navigate("/", { replace: true });
  };
</script>

<style>
  /* your styles go here */
</style>

<button
  class="text-2xl text-white hover:text-black font-display border-2 border-solid border-white py-2 px-16 focus:outline-none hover:bg-white rounded-full"
  on:click|preventDefault={handleLogout}>
  Log out
</button>
