<script lang="ts">
  import { navigate } from "svelte-navigator";
  import { operationStore, query } from "@urql/svelte";
  import { initAuth } from "../../stores/firebase-auth";
  import Button from '../Button.svelte'

  const { logout } = initAuth()

  const logout_query = `
    mutation logoutUser {
      logoutUser
    }
  `;

  const logoutStore = operationStore(logout_query);
  query(logoutStore);

  let handleLogout = () => {
    // $logoutStore;
    // auth.set({ status: Status.NOT_AUTHENTICATED });
    logout()
    navigate("/", { replace: true });
  };
</script>

<style lang="postcss">
</style>

<Button text={"Log out"} on:click={handleLogout} />
