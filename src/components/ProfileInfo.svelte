<script lang="typescript">
  import type { UserClaims, UserMapped } from '../auth/types';

  import type { FirebaseUser } from '../types'
  export let user: UserClaims | undefined;

  console.log('user', user)
</script>

<style lang="postcss">
</style>

<div class="flex justify-center items-center text-white mb-8">
  {#if user}
    <img src={user.picture} alt="User Avatar" class="rounded-full">
    <div class="info ml-4">
      <p>Your id is {user.user_id}</p>
      <p>Your email is {user.email}</p>
    </div>
  {/if}
</div>
