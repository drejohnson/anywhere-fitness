<script>
  import type { SvelteComponent } from 'svelte'
	import { Route } from "svelte-navigator";
  import Lazy from "./Lazy.svelte";

	export let component: () => Promise<Partial<typeof import("*.svelte")>>;
	export let delayMs: number | null = null;

	let props: {[key:string]: unknown};
	$: {
		// eslint-disable-next-line no-shadow
		const { component, ...restProps } = $$props;
		props = restProps;
	}
</script>

<Route {...props}>
	<Lazy {component} {delayMs}>
		<slot />
	</Lazy>
</Route>