<script>

import Nav from "#parts/nav.svelte";

let { children } = $props();

</script>


<Nav />

{@render children?.()}
