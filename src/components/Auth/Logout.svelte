<script lang="ts">
  import { operationStore, query } from "@urql/svelte";
  import { logout } from "../../stores/auth";
  import Button from '../Button.svelte'

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
  };
</script>

<style lang="postcss">
</style>

<Button text={"Log out"} on:click={handleLogout} />
