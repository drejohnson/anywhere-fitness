<script lang="ts">
  import { navigate } from "svelte-navigator";
  import type { SubmitEvent } from "../../types";
  import { initAuth } from "../../stores/firebase-auth";
  import Form from "../Form/Form.svelte";
  import Input from "../Form/Input.svelte";

  const {
    createUserWithEmailAndPassword
  } = initAuth();

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
			await createUserWithEmailAndPassword(input.email, input.password);
      navigate("/user/profile", { replace: true });
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
  <h1>Create an account</h1>
  <h4>
    Have an account?
    <button on:click={toggleShowLogin} class="underline">
      Sign in
    </button>
  </h4>
</header>
<Form on:submit={onSubmit} name="Create Account" let:store>
  <Input {store} type="email" name="email" placeholder="Email" />
  <Input {store} type="password" name="password" placeholder="Password" />
</Form>