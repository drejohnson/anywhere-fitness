<script lang="typescript">
  import { navigate } from "svelte-navigator";
  import { operationStore, mutation } from "@urql/svelte";
  import type { LoginPayload, AuthInputs } from "../types";
  import type { User } from "../stores/auth";
  import { auth, Status } from "../stores/auth";

  interface Data {
    loginUser: {
      user: User;
      token: string;
    };
  }

  const login_query = `
    mutation loginUser($email: String!, $password: String!) {
      loginUser(input: { email: $email, password: $password }) {
        token
        user {
          _id
          firstName
          lastName
          email
          role
        }
      }
    }
  `;

  let input = { email: "", password: "" };

  const loginUserStore = operationStore<LoginPayload, AuthInputs>(login_query);
  const loginUserMutation = mutation(loginUserStore);

  let onSubmit = async () => {
    auth.set({ status: Status.AUTHENTICATING });
    try {
      let result = await loginUserMutation({
        email: input.email,
        password: input.password,
      });

      if (result.error) console.error("Oh no!", result.error);
      if (result.data) console.error("Data", result.error);
      let token = result.data?.loginUser.token as string;
      let user = result.data?.loginUser.user as User;

      auth.set({ status: Status.AUTHENTICATED, token, user });
      input = { email: "", password: "" };
      navigate("/user/profile", { replace: true });
    } catch (error) {
      console.log(error.response.data.message);
      auth.set({ status: Status.NOT_AUTHENTICATED });
    }
  };
</script>

<style lang="postcss">
  .bg-image {
    background-image: url("https://res.cloudinary.com/phreshr-media/image/upload/c_scale,q_80,w_2560/v1606049146/anywhere-fitness/pier-workout.webp");
    @apply h-screen bg-cover bg-center;
  }
  .bg-image:before {
    content: "";
    background-image: linear-gradient(-90deg, black 18%, transparent 100%);
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100%;
    position: absolute;
  }
</style>

<div class="lg:flex">
  <div class="w-full">
    <section class="bg-image">
      <div class="grid grid-cols-2 content-center h-full">
        <div
          class="flex flex-col justify-center items-center my-10 mx-24  z-10">
          <h2 class="font-display text-5xl text-white">Not a member yet?</h2>
          <p class="mb-6 text-white text-2xl">
            Sign up to to experience fitness classes reimagined!
          </p>
          <button
            class="text-2xl text-white hover:text-black font-display border-2 border-solid border-white py-2 px-16 focus:outline-none hover:bg-white rounded-full"
            on:click={() => navigate('/auth/client/signup')}>Sign Up</button>
        </div>
        <div class="mt-32 px-16 col-start-2 z-10">
          <h2
            class="text-center text-4xl text-white font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">
            Log in
          </h2>
          <div class="mt-8">
            {#if $auth.status === Status.HAS_ERRORS}
              <p>Oops something went wrong!</p>
              <p>{$loginUserStore.error?.message}</p>
            {/if}
            <form action="" on:submit|preventDefault={onSubmit}>
              <div class="input-goup">
                <label
                  class="text-sm font-bold text-white tracking-wide"
                  for="email">Email</label>
                <input
                  class="w-full text-lg bg-transparent py-2 border-b border-white focus:outline-none placeholder-gray-300"
                  bind:value={input.email}
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required />
              </div>

              <div class="input-group mt-8">
                <div class="flex justify-between items-center">
                  <label
                    class="text-sm font-bold text-white tracking-wide"
                    for="password">Password</label>
                  <div>
                    <a
                      href="/#"
                      class="text-xs font-display text-white hover:underline cursor-pointer">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <input
                  class="w-full text-lg bg-transparent py-2 border-b border-white focus:outline-none placeholder-gray-300"
                  bind:value={input.password}
                  name="password"
                  type="password"
                  placeholder="super secret secure password"
                  required />
              </div>
              <div class="mt-10">
                <button
                  class="text-2xl text-white hover:text-black font-display border-2 border-solid border-white py-2 px-16 focus:outline-none hover:bg-white rounded-full"
                  disabled={$auth.status === Status.AUTHENTICATING}>
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
