<script>

import NavPane from "./nav-pane.svelte";

let { children } = $props();

</script>


<NavPane />

<article>
  {@render children?.()}
</article>
