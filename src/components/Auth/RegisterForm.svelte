<script lang="ts">
  import type { SubmitEvent } from '../../types';
  import { send } from '../../auth';
  import Form from '@components/Form/Form.svelte';
  import Input from '@components/Form/Input.svelte';
  import SubmitButton from '@components/Form/SubmitButton.svelte';

  export let toggleShowLogin: () => boolean;

  let input = { firstName: '', lastName: '', email: '', password: '' };

  const onSubmit = async (event: SubmitEvent) => {
    try {
      const { store } = event.detail;

      store.subscribe((v) => {
        input['firstName'] = v['firstName'];
        input['lastName'] = v['lastName'];
        input['email'] = v['email'];
        input['password'] = v['password'];
      });

      // error = null;
      send('REGISTER', {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
      });
      input = { firstName: '', lastName: '', email: '', password: '' };
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
<div class="w-full">
  <Form on:submit={onSubmit} name="Register" let:store>
    <Input
      {store}
      type="text"
      name="firstName"
      placeholder="First name*"
      required />
    <Input
      {store}
      type="text"
      name="lastName"
      placeholder="Last name*"
      required />
    <Input {store} type="email" name="email" placeholder="Email*" required />
    <Input
      {store}
      type="password"
      name="password"
      placeholder="Password*"
      required />
    <SubmitButton name="Create Account" />
  </Form>
</div>
