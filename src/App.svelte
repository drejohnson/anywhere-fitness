<script lang="ts">
	import { Router, Route } from "svelte-navigator";
	import firebase from "firebase/app";
	import { createClient, setClient } from "@urql/svelte";
	import { initAuth } from "./stores/firebase-auth";
	import TailwindCss from "./components/TailwindCss.svelte";
	import InlineSvg from "@components/InlineSvg.svelte";
	import Header from "./components/Header.svelte";
	import Home from "./routes/Home.svelte";
	import Profile from "./routes/Profile.svelte";
	import Auth from "./routes/Auth.svelte";
	import Explore from "./routes/Explore.svelte";
	import PrivateRoute from "@components/PrivateRoute.svelte";

	let token: string

	const {
		SNOWPACK_FAUNADB_SERVER_SECRET,
	} = import.meta.env;

	const firebaseConfig = {
		apiKey: "AIzaSyCkoGKmHSi8cGEPrGy3gg-LBPEMuRG30bY",
		authDomain: "anywhere-fitness-296903.firebaseapp.com",
		databaseURL: "https://anywhere-fitness-296903.firebaseio.com",
		projectId: "anywhere-fitness-296903",
		storageBucket: "anywhere-fitness-296903.appspot.com",
		messagingSenderId: "815294550864",
		appId: "1:815294550864:web:8ddee6ee5b9b8840b91255",
		measurementId: "G-S59WEXY9K2",
	};

	if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

	const { tokenResult } = initAuth();

	tokenResult.subscribe(async data => {
		token = data?.token as string
	})

	const endpoint = 'https://graphql.fauna.com/graphql';

	const client = createClient({
		url: endpoint,
		fetchOptions: () => {
			return {
				headers: { authorization: token ? `Bearer ${token}` : "" },
			};
		},
	});

	setClient(client);
</script>

<style lang="postcss">
</style>

<TailwindCss />
<InlineSvg />

<Router>
	<Header />
	<main>
		<Route path="/">
			<Home />
		</Route>
		<Route path="/explore">
			<Explore />
		</Route>
		<PrivateRoute path="user/profile" let:location>
			<Profile />
		</PrivateRoute>
		<Route path="/auth/*">
			<Route path="/client/*">
				<Route path="/login">
					<Auth />
				</Route>
			</Route>
		</Route>
		<Route>
			<h3>Oops...</h3>
			<p>No Route could be matched.</p>
		</Route>
	</main>
</Router>
<!-- <div class="wrapper">
	{#if $tokenResult}
		<div class="w-full max-w-xs">
			<div class="text-center">
				<h2>My email: {$tokenResult?.user.email}</h2>
				<button type="button" class="mt-3" on:click={logout}>Logout</button>
			</div>
		</div>
	{:else}
		<div class="w-full max-w-xs">
			<form
				on:submit|preventDefault={loginHandler}
				class="px-8 pt-6 pb-8 bg-white shadow-md">
				<div class="mb-4">
					<label for="email">Email</label>
					<input
						class="input-field"
						id="email"
						type="email"
						placeholder="name@acme.com"
						bind:value={input.email} />
				</div>
				<div class="mb-6">
					<label for="password">Password</label>
					<input
						class="input-field"
						id="password"
						type="password"
						placeholder="******************"
						bind:value={input.password} />
				</div>
				{#if error}
					<div transition:fade class="p-2 mb-6 bg-red-300">{error.message}</div>
				{/if}
				<div><button type="submit">Sign In</button></div>
				<div class="mt-3">
					<button type="button" on:click|preventDefault={loginWithGoogle}>
						Sign In with Google
					</button>
				</div>
			</form>
		</div>
	{/if}
</div> -->
