<script lang="typescript">
	import { get } from "svelte/store";
	import { createClient, setClient } from "@urql/svelte";
	import { Router, Route } from "svelte-navigator";
	import { auth } from "./stores/auth";
	import Tailwind from "./components/Tailwind.svelte";
	import Header from "./components/Header.svelte";
	import Home from "./routes/Home.svelte";
	import About from "./routes/About.svelte";
	import Browse from "./routes/Browse.svelte";
	import Login from "./routes/Login.svelte";
	import Profile from "./routes/Profile.svelte";
	import Signin from "./routes/Signin.svelte";
	import Signup from "./routes/Signup.svelte";

	const {
		SNOWPACK_PUBLIC_GRAPHQL_ENDPOINT,
		SNOWPACK_PUBLIC_FAUNADB_SECRET,
	} = import.meta.env;

	const client = createClient({
		url: SNOWPACK_PUBLIC_GRAPHQL_ENDPOINT,
		fetchOptions: () => {
			const token = get(auth).token || SNOWPACK_PUBLIC_FAUNADB_SECRET;
			return {
				headers: { authorization: token ? `Bearer ${token}` : "" },
			};
		},
	});

	setClient(client);
</script>

<style lang="postcss">
	:global(:root) {
		--header-color: indianred;
	}
	:global(body) {
		margin: 0;
		font-family: Arial, Helvetica, sans-serif;
	}
</style>

<Tailwind />
<Router>
	<div class="relative">
		<Header />
		<main>
			<Route path="/">
				<Home />
			</Route>
			<Route path="/browse">
				<Browse />
			</Route>
			<Route path="/about">
				<About />
			</Route>
			<Route path="/auth/client/*">
				<Route path="/login">
					<Signin />
				</Route>
				<Route path="/signup">
					<Signup role="CLIENT" />
				</Route>
			</Route>

			<Route path="/user/*">
				<Route path="/profile">
					<Profile />
				</Route>
			</Route>
			<Route>
				<h3>Oops...</h3>
				<p>No Route could be matched.</p>
			</Route>
		</main>
	</div>
</Router>
