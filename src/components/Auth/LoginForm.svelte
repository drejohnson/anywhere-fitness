<script lang="ts">
  import type { SubmitEvent } from '../../types';
  import { send } from '../../auth';
  import Form from '@components/Form/Form.svelte';
  import Input from '@components/Form/Input.svelte';
  import SubmitButton from '@components/Form/SubmitButton.svelte';

  export let toggleShowLogin: () => boolean;

  let input = { email: '', password: '' };

  const onSubmit = async (event: SubmitEvent) => {
    try {
      const { store } = event.detail;

      store.subscribe((v) => {
        input['email'] = v['email'];
        input['password'] = v['password'];
      });

      // error = null;
      send('LOGIN', {
        provider: 'email',
        email: input.email,
        password: input.password,
      });
      // await loginWithEmailPassword(input.email, input.password);
      input = { email: '', password: '' };
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
</script>

<style lang="postcss">
</style>

<header class="text-sm md:text-xl">
  <h1>Sign in</h1>
  <h4>
    New user?
    <button on:click={toggleShowLogin} class="underline">
      Create an account
    </button>
  </h4>
</header>

<div class="w-full">
  <Form on:submit={onSubmit} name="Sign in" let:store>
    <Input {store} type="email" name="email" placeholder="Email" />
    <Input {store} type="password" name="password" placeholder="Password" />
    <SubmitButton name="Sign In" />
  </Form>
</div>
