<script lang="ts">
  import { initAuth } from "../../stores/firebase-auth";

  export let provider: string;
  
  const {
		loginWithGoogle
  } = initAuth();
</script>

<style lang="postcss"> 
  .social-button {
    @apply flex justify-start items-center text-xs uppercase leading-none tracking-wide whitespace-normal w-full max-w-xs rounded-full py-2 px-8 mb-4 shadow-sm transition duration-300;

    & .icon {
      @apply w-6 h-6 mr-4;
    }

    & .text {
      @apply px-3;
    }
  }
  .google {
    background-color: white;
    & span {
      color: #737373
    }
  }

  .facebook {
    background-color: #3b5998;
    & span {
      color: white
    }
  }
</style>

<div>
  {#if provider === "google"}
    <button
      onClick={() => loginWithGoogle()}
      class="social-button google">
      <img class="icon" src="/social-icons/google.svg" alt="Google button" />
      <span class="text">Sign in with Google</span>
    </button>
  {:else if provider === "facebook"}
    <button
      onClick={() => loginWithGoogle()}
      class="social-button facebook">
      <img class="icon" src="/social-icons/facebook.svg" alt="Facebook button" />
      <span class="text">Sign in with Facebook</span>
    </button>
  {:else}
     <div>No Provider specified</div>
  {/if}
</div>