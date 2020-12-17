<script lang="ts">
  import Query from '@components/Query.svelte';
  import { query } from '@app/stores/query';

  let q = query('q');
</script>

<style lang="postcss">
</style>

<div
  class="wrapper min-h-screen px-4 pt-40"
  style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,-1.5))">
  <h1>Search</h1>

  <Query name={$q} />
</div>
