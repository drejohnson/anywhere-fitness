<script lang="ts">
	import { Router, Route } from "svelte-navigator";
	import { createClient, setClient } from "@urql/svelte";
	import { state } from './auth'
	import TailwindCss from "@components/TailwindCss.svelte";
	import InlineSvg from "@components/InlineSvg.svelte";
	import Header from "@components/Header.svelte";
	import PrivateRoute from "@components/PrivateRoute.svelte";
	import LazyRoute from "@components/LazyRoute.svelte";
	import Loading from '@components/Loading.svelte';

	const Home = () => import("@routes/Home.svelte");
	const Profile = () => import("@routes/Profile.svelte");
	const Explore = () => import("@routes/Explore.svelte");
	const Auth = () => import("@routes/Auth.svelte");

	let userSecret: string

	$: userSecret = $state.context.user?.["https://fauna.com/user_metadata"].secret

	const {
		SNOWPACK_FAUNADB_SERVER_SECRET,
	} = import.meta.env;

	const endpoint = 'https://graphql.fauna.com/graphql';

	$: {
		console.log('userSecret', userSecret)
		const client = createClient({
			url: endpoint,
			fetchOptions: () => {
				const token = userSecret || SNOWPACK_FAUNADB_SERVER_SECRET
				return {
					headers: { authorization: `Bearer ${token}` },
				};
			},
		});

		setClient(client);
	}
</script>

<style lang="postcss">
</style>

<TailwindCss />
<InlineSvg />

<Router>
	<Header />
	<main>
		<LazyRoute path="/" component={Home}>
			<Loading />
		</LazyRoute>
		<LazyRoute path="/explore" component={Explore}>
			<Loading />
		</LazyRoute>
		<PrivateRoute path="user/profile" let:location>
			<LazyRoute path="/" component={Profile}>
				<Loading />
			</LazyRoute>
		</PrivateRoute>
		<Route path="/auth/*">
			<Route path="/client/*">
				<LazyRoute path="/login" component={Auth}>
					<Loading />
				</LazyRoute>
			</Route>
		</Route>
		<Route>
			<h3>Oops...</h3>
			<p>No Route could be matched.</p>
		</Route>
	</main>
</Router>
