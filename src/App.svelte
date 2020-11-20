<script lang="typescript">
	import { Router, Link, Route, link } from "svelte-navigator";
	import NavLink from "./components/NavLink.svelte";
	import Home from "./routes/Home.svelte";
	import About from "./routes/About.svelte";
	import Tailwind from "./components/Tailwind.svelte";
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
	<header
		class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
		<a
			href="/"
			use:link
			class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
				viewBox="0 0 24 24">
				<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
			</svg>
			<span class="ml-3 text-xl">Svelte App</span>
		</a>

		<nav
			class="md:ml-auto flex flex-wrap items-center text-base justify-center">
			<NavLink to="/" styles="ml-5 hover:text-gray-900">Home</NavLink>
			<NavLink to="about" styles="ml-5 hover:text-gray-900">About</NavLink>
		</nav>
	</header>
	<main>
		<Route path="/">
			<Home />
		</Route>
		<Route path="/about">
			<About />
		</Route>
		<Route>
			<h3>Oops...</h3>
			<p>No Route could be matched.</p>
		</Route>
	</main>
</Router>
