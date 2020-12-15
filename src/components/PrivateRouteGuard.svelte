<script lang="ts">
  import { useNavigate, useLocation } from 'svelte-navigator';
  import { state } from '../auth';

  const navigate = useNavigate();
  const location = useLocation();

  $: authenticated = $state.matches('loggedIn');
  $: console.log('authenticated', authenticated);
  $: console.log('private guard', $state);

  $: if (!authenticated) {
    navigate('/auth/client/login', {
      state: { from: $location.pathname },
      replace: true,
    });
  }
</script>

{#if authenticated}
  <slot />
{/if}
