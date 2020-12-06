  
<script>
	import { Status } from "../types";
	import { onMount } from "svelte";
	import { useNavigate, useLocation } from "svelte-navigator";
  import { authStore } from "../stores/auth";

	const navigate = useNavigate();
	const location = useLocation();

	$: authenticated = $authStore.status === Status.AUTHENTICATED;
	
	$: if (!authenticated) {
		navigate("/auth/client/login", {
			state: { from: $location.pathname },
			replace: true
		})
	}
</script>

{#if authenticated}
	<slot />
{/if}