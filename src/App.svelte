<script lang="typescript">
	import { Router, Route } from "svelte-navigator";
	import Tailwind from "./components/Tailwind.svelte";
	import Header from "./components/Header.svelte";
	import Home from "./routes/Home.svelte";
	import About from "./routes/About.svelte";
	import Browse from "./routes/Browse.svelte";
	import Login from "./routes/Login.svelte";
	import Profile from "./routes/Profile.svelte";
	import Signin from "./routes/Signin.svelte";
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
