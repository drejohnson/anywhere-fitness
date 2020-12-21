<script lang="ts">
  import { navigate } from 'svelte-navigator';
  import AuthLayout from '../components/Auth/AuthLayout.svelte';
  import RegisterForm from '../components/Auth/RegisterForm.svelte';
  import LoginForm from '../components/Auth/LoginForm.svelte';
  import SocialAuth from '../components/Auth/SocialAuth.svelte';
  import { state } from '../auth';
  import Loading from '@components/Loading.svelte';

  let showLogin = true;

  const toggleShowLogin = () => (showLogin = !showLogin);
  $: signedIn = $state.matches('loggedIn');
  $: if (signedIn) navigate('/user/profile', { replace: true });
  $: authenticating = $state.matches('authenticating');
  $: loading = $state.matches('loading');
</script>

<style lang="postcss">
</style>

{#if authenticating || loading}
  <Loading />
{:else}
  <AuthLayout>
    <h4 slot="subTitle" class="text-white md:text-2xl hidden md:block">
      Sign up to to experience fitness classes reimagined!
    </h4>
    <div
      slot="form"
      class="form-container grid items-center justify-center md:justify-items-center w-full h-full text-white">
      <div class="w-full">
        {#if showLogin}
          <LoginForm {toggleShowLogin} />
        {:else}
          <RegisterForm {toggleShowLogin} />
        {/if}
      </div>
      <SocialAuth />
    </div>
  </AuthLayout>
{/if}
