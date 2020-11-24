<script lang="typescript">
  import { navigate } from "svelte-navigator";
  import { operationStore, mutation } from "@urql/svelte";
  import type { SignupPayload, SignupInputs } from "../types";
  import type { User } from "../stores/auth";
  import { auth, Status } from "../stores/auth";

  export let role: string;

  const signup_query = `
    mutation SignupClientUser(
      $firstName: String!
      $lastName: String!
      $email: String!
      $password: String!
    ) {
      createUser(
        input: {
          firstName: $firstName
          lastName: $lastName
          email: $email
          password: $password
          role: ${role}
        }
      ) {
        token
        user {
          firstName
          lastName
          email
          role
        }
        error {
          status
          message
        }
      }
    }
  `;

  let input = { firstName: "", lastName: "", email: "", password: "" };

  const signupUserStore = operationStore<SignupPayload, SignupInputs>(
    signup_query
  );
  const signupUserMutation = mutation(signupUserStore);

  let onSubmit = async () => {
    auth.set({ status: Status.AUTHENTICATING });
    try {
      let result = await signupUserMutation({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
        role,
      });

      if (result.error) console.error("Oh no!", result.error);

      let token = result.data?.createUser.token as string;
      let user = result.data?.createUser.user as User;
      let userExistError = result.data?.createUser.error;
      let graphqlError = result.error;

      if (userExistError?.status === "UserExists")
        console.log("userExistError message", userExistError?.status);
      console.log("graphql error", graphqlError);
      console.log("user exists error", userExistError);

      auth.set({ status: Status.AUTHENTICATED, token, user });
      input = { firstName: "", lastName: "", email: "", password: "" };

      navigate("/user/profile", { replace: true });
    } catch (error) {
      console.log(error.response.data.message);
      auth.set({ status: Status.NOT_AUTHENTICATED });
    }
  };
</script>

<style lang="postcss">
  .bg-image {
    background-image: url("https://res.cloudinary.com/phreshr-media/image/upload/c_scale,q_80,w_2560/v1606122086/anywhere-fitness/mountain-yoga.webp");
    @apply h-screen bg-cover bg-bottom;
  }
  .bg-image:before {
    content: "";
    background-image: linear-gradient(90deg, black 18%, transparent 100%);
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100%;
    position: absolute;
  }
</style>

<div class="lg:flex">
  <div class="w-full">
    <section class="bg-image flex justify-center items-center">
      <div class="w-full pt-24 px-64 z-10">
        <h2
          class="text-4xl text-white font-display font-semiboldxl:text-5xl xl:text-bold">
          Sign up
        </h2>
        <div class="mt-8">
          <form on:submit|preventDefault={onSubmit}>
            <div
              class="grid grid-cols-2 gap-x-8 gap-y-12 content-center h-full">
              <div class="input-group">
                <label class="input-label" for="firstName">First Name</label>
                <input
                  bind:value={input.firstName}
                  class="input focus:outline-none placeholder-gray-300"
                  type="text"
                  name="firstName"
                  placeholder="enter your first name"
                  required />
              </div>
              <div class="input-group">
                <label class="input-label" for="lastName">Last Name</label>
                <input
                  bind:value={input.lastName}
                  class="input focus:outline-none placeholder-gray-300"
                  type="text"
                  name="lastName"
                  placeholder="enter your last name"
                  required />
              </div>
              <div class="input-group">
                <label class="input-label" for="email">Email</label>
                <input
                  bind:value={input.email}
                  class="input focus:outline-none placeholder-gray-300"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required />
                {#if $signupUserStore?.data?.createUser.error?.status === 'UserExists'}
                  <div class="error text-red-600 text-sm">
                    {$signupUserStore?.data?.createUser.error?.message}
                  </div>
                {/if}
              </div>
              <div class="input-group">
                <label class="input-label" for="password">Password</label>
                <input
                  bind:value={input.password}
                  class="input focus:outline-none placeholder-gray-300"
                  type="password"
                  name="password"
                  placeholder="super secret secure password"
                  required />
              </div>
              <button
                class="text-2xl text-white hover:text-black font-display border-2 border-solid border-white py-2 px-16 focus:outline-none hover:bg-white rounded-full"
                disabled={$auth.status === Status.AUTHENTICATING}>
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</div>

<!-- <div class="lg:flex">
  <div class="w-full">
    <section class="bg-image">
      <div class="grid grid-cols-2 content-center h-full">
        <div class="left-col mt-32 px-16 z-10">
          <h2
            class="text-center text-4xl text-white font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">
            Sign up
          </h2>
          <div class="mt-8">
            {#if $auth.status === Status.HAS_ERRORS}
              <p>Oops something went wrong!</p>
              <p>{error}</p>
            {/if}
            <form on:submit|preventDefault={onSubmit}>
              <div class="input-group">
                <label class="input-label" for="firstName">First Name</label>
                <input
                  bind:value={input.firstName}
                  class="input focus:outline-none placeholder-gray-300"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required />
              </div>

              <div class="input-group mt-8">
                <label class="input-label" for="lastName">Last Name</label>
                <input
                  bind:value={input.lastName}
                  class="input focus:outline-none placeholder-gray-300"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required />
              </div>

              <div class="input-group mt-8">
                <label class="input-label" for="email">Email</label>
                <input
                  bind:value={input.email}
                  class="input focus:outline-none placeholder-gray-300"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required />
              </div>

              <div class="input-group mt-8">
                <label class="input-label" for="password">Password</label>
                <input
                  bind:value={input.password}
                  class="input focus:outline-none placeholder-gray-300"
                  type="password"
                  name="password"
                  placeholder="Password"
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
        <div
          class="right-col flex flex-col justify-center items-center my-10 mx-24  z-10">
          <h2 class="font-display text-5xl text-white">Not a member yet?</h2>
          <p class="mb-6 text-white text-2xl">
            Sign up to to experience fitness classes reimagined!
          </p>
          <button
            class="text-2xl text-white hover:text-black font-display border-2 border-solid border-white py-2 px-16 focus:outline-none hover:bg-white rounded-full"
            on:click={() => navigate('/auth/client/signup')}>Sign Up</button>
        </div>
      </div>
    </section>
  </div>
</div> -->
