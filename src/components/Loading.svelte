<script lang="ts">
  
</script>

<style lang="postcss">
  .loader-container {
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .loader {
    --border-width: 1px;
    --loader-size: 100px;
    
    animation: spin 1.2s ease-in-out infinite;
    border: var(--border-width) solid transparent;
    border-top-color: #537d8b;
    border-radius: 100%;
    filter: drop-shadow(0 0 var(--border-width) blue);
    height: var(--loader-size);
    margin: 0 auto;
    position: relative;
    width: var(--loader-size);
    
    & div {
      animation: spin 1s ease-in-out infinite;
      border: var(--border-width) solid transparent;
      border-radius: 100%;
      bottom: -var(--border-width);
      left: -var(--border-width);
      position: absolute;
      right: -var(--border-width);
      top: -var(--border-width);

      &:first-child {
        border-top-color: #a74040;
        transform: rotate(120deg);
      }

      &:last-child {
        animation-duration: 2s;
        border-top-color: #40a744;
        transform: rotate(240deg);
      }
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    
    50% {
      box-shadow: 0 -2px 4px rgba(#fff, .2);
      opacity: .7;
    }
    
    100% {
      transform: rotate(360deg);
    }
  }
  
</style>

<div class="loader-container">
  <div class="loader">
    <div></div>
    <div></div>
  </div>
</div>

