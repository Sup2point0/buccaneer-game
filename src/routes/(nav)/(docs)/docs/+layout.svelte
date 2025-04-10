<script>

import NavPane from "./nav-pane.svelte";

let { children } = $props();

</script>


<NavPane />

<article>
  {#if children}
      {@render children()}
  {:else}
    <p> Oops, something went wrong! </p>
  {/if}
</article>
