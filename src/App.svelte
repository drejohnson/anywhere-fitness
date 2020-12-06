<script lang="ts">
	import { Router, Route } from "svelte-navigator";
	import firebase from "firebase/app";
	import { createClient, setClient } from "@urql/svelte";
	import { authStore } from "@stores/auth";;
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

	let token: string

	// const {
	// 	SNOWPACK_FAUNADB_SERVER_SECRET,
	// } = import.meta.env;

	const firebaseConfig = {
		apiKey: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_API_KEY,
		authDomain: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_AUTH_DOMAIN,
		databaseURL: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_DATABASE_URL,
		projectId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		appId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_APP_ID,
		measurementId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_MEASUREMENT_ID,
	}

	if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

	authStore.subscribe(async user => {
		token = user?.token as string
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
