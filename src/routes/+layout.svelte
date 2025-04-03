<script>

import "#styles/essence.scss";

let { children } = $props();

</script>


{#if children}
  {@render children()}
{:else}
  <p class="error"> Ayo, something’s gone really wrong! </p>
{/if}
