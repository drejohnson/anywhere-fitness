<script lang="ts">
  import { send } from "../../auth";

  export let provider: string;

  const handleLogin = () => {
    console.log('clicked')
    if (provider === 'google') {
      send('LOGIN', {
        provider: 'google'
      })
    } 
    if (provider === 'facebook') {
      send('LOGIN', {
        provider: 'google'
      })
    }
  }
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
      on:click|preventDefault={() => send('LOGIN', {
        provider: 'google'
      })}
      class="social-button google">
      <img class="icon" src="/social-icons/google.svg" alt="Google button" />
      <span class="text">Sign in with Google</span>
    </button>
  {:else if provider === "facebook"}
    <button
      on:click|preventDefault={() => send('LOGIN', {
        provider: 'google'
      })}
      class="social-button facebook">
      <img class="icon" src="/social-icons/facebook.svg" alt="Facebook button" />
      <span class="text">Sign in with Facebook</span>
    </button>
  {:else}
     <div>No Provider specified</div>
  {/if}
</div>