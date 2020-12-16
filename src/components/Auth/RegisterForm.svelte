<script lang="ts">
  import { navigate } from 'svelte-navigator';
  import type { SubmitEvent } from '../../types';
  import { send } from '../../auth';
  import Form from '@components/Form/Form.svelte';
  import Input from '@components/Form/Input.svelte';
  import SubmitButton from '@components/Form/SubmitButton.svelte';

  export let toggleShowLogin: () => boolean;

  let input = { email: '', password: '' };

  const onSubmit = (event: SubmitEvent) => {
    try {
      const { store } = event.detail;

      store.subscribe((v) => {
        input['email'] = v['email'];
        input['password'] = v['password'];
      });

      // error = null;
      send('REGISTER', {
        email: input.email,
        password: input.password,
      });
      // navigate("/user/profile", { replace: true });
      input = { email: '', password: '' };
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
</script>

<style lang="postcss">
</style>

<header class="text-sm md:text-xl">
  <h1>Create an account</h1>
  <h4>
    Have an account?
    <button on:click={toggleShowLogin} class="underline"> Sign in </button>
  </h4>
</header>
<Form on:submit={onSubmit} name="Create Account" let:store>
  <Input {store} type="email" name="email" placeholder="Email" />
  <Input {store} type="password" name="password" placeholder="Password" />
  <SubmitButton name="Create Account" />
</Form>
