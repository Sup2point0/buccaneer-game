<script>

import "#styles/essence.scss";
import "#styles/article.scss";

let { children } = $props();

</script>


{#if children}
  {@render children()}
{:else}
  <p class="error"> Ayo, something’s gone really wrong! </p>
{/if}
