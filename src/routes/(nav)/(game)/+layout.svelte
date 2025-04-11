<script>
  
import { onMount } from 'svelte';

let { children } = $props();


onMount(() => {
  addEventListener("beforeunload", e => {
    e.preventDefault();
  });
});

</script>


{@render children?.()}
