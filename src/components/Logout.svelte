<script lang="typescript">
  import { navigate } from "svelte-navigator";
  import { request, gql } from "../graphql/request";
  import { auth, Status } from "../stores/auth";

  const query = gql`
    mutation logoutUser {
      logoutUser
    }
  `;

  let handleLogout = async () => {
    await request(query);
    auth.set({ status: Status.NOT_AUTHENTICATED });
    // navigate('/', {replace: true})
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
