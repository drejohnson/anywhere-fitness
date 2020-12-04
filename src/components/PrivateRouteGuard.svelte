  
<script>
	import { useNavigate, useLocation } from "svelte-navigator";
  import { initAuth } from "../stores/firebase-auth";
  
  const { tokenResult } = initAuth()

	const navigate = useNavigate();
	const location = useLocation();

	$: if (!$tokenResult?.user) {
		navigate("/auth/client/login", {
			state: { from: $location.pathname },
			replace: true,
		});
	}
</script>

{#if $tokenResult?.user}
	<slot />
{/if}