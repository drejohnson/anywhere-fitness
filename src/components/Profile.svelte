<script lang="typescript">
  import type { User } from "../stores/auth";
  export let user: User | undefined;
</script>

<div>
  {#if user}
    <h3>Hi {user.firstName} {user.lastName}</h3>

    <p>Your id is {user._id}</p>
    <p>Your email is {user.email}</p>
    <p>Your role is {user.role}</p>
  {/if}
</div>
