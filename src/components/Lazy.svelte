<script>
  import { onMount, SvelteComponent } from 'svelte';

  export let component: () => Promise<Partial<typeof import('*.svelte')>>;
  export let delayMs: number | null = null;

  let loadedComponent: Partial<SvelteComponent> | undefined = undefined;
  let timeout: NodeJS.Timeout;
  let showFallback = !delayMs;

  let props: { [key: string]: unknown };
  $: {
    // eslint-disable-next-line no-shadow
    const { component, delayMs, ...restProps } = $$props;
    props = restProps;
  }

  onMount(() => {
    if (delayMs) {
      timeout = setTimeout(() => {
        showFallback = true;
      }, delayMs);
    }
    component().then((module) => {
      loadedComponent = module.default;
    });
    return () => clearTimeout(timeout);
  });
</script>

{#if loadedComponent}
  <svelte:component this={loadedComponent} {...props} />
{:else if showFallback}
  <slot />
{/if}
