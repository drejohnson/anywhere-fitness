<script lang="typescript">
  import { Link } from 'svelte-navigator';

  interface Props {
    location?: unknown;
    href: string;
    isPartiallyCurrent: boolean;
    isCurrent: boolean;
  }

  export let to = '';
  export let styles = '';

  // eslint-disable-next-line no-unused-vars
  function getProps({ href, isPartiallyCurrent, isCurrent }: Props) {
    const isActive = href === '/' ? isCurrent : isPartiallyCurrent || isCurrent;

    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { class: `${styles} active` };
    }
    return { class: styles };
  }
</script>

<Link {to} {getProps}>
  <slot />
</Link>
