<script lang="ts">
  import { operationStore, query } from '@urql/svelte';
  import { send } from '../../auth';
  import Button from '../Button.svelte';

  // const logout_query = `
  //   mutation logoutUser {
  //     logoutUser
  //   }
  // `;

  // const logoutStore = operationStore(logout_query);
  // query(logoutStore);

  let handleLogout = () => {
    // $logoutStore;
    // auth.set({ status: Status.NOT_AUTHENTICATED });
    send('LOGOUT');
  };
</script>

<style lang="postcss">
</style>

<Button text={'Log out'} on:click={handleLogout} />
