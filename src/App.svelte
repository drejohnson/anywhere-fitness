<script lang="ts">
	import { Router, Route } from "svelte-navigator";
	import firebase from "firebase/app";
	import { createClient, setClient } from "@urql/svelte";
	import { initAuth } from "@stores/firebase-auth";;
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

	tokenResult.subscribe(async user => {
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
		<LazyRoute path="/" component={Home} delayMs={100}>
			<Loading />
		</LazyRoute>
		<LazyRoute path="/explore" component={Explore} delayMs={100}>
			<Loading />
		</LazyRoute>
		<PrivateRoute path="user/*" let:location>
			<LazyRoute path="/profile" component={Profile} delayMs={100}>
				<Loading />
			</LazyRoute>
		</PrivateRoute>
		<Route path="/auth/*">
			<Route path="/client/*">
				<LazyRoute path="/login" component={Auth} delayMs={100}>
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
