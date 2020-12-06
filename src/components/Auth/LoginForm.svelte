<script lang="ts">
  import type { SubmitEvent } from "../../types";
  import { loginWithEmailPassword } from "../../stores/auth";
  import Form from "../Form/Form.svelte";
  import Input from "../Form/Input.svelte";

  export let toggleShowLogin: () => boolean

  let input = { email: "", password: "" };

  const onSubmit = async (event: SubmitEvent) => {
		try {
      const { store } = event.detail

      store.subscribe((v) => {
        input["email"] = v["email"]
        input["password"] = v["password"]
      });

			// error = null;
			await loginWithEmailPassword(input.email, input.password);
      input = { email: "", password: "" };
		} catch (err) {
      console.log(err)
			// error = err;
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

<Form on:submit={onSubmit} name="Sign in" let:store>
  <Input {store} type="email" name="email" placeholder="Email" />
  <Input {store} type="password" name="password" placeholder="Password" />
</Form>