<!-- @component NavPane

The side navigation for rules pages.
-->

<script lang="ts">

import { page } from "$app/state";
import { base } from "$app/paths";

</script>


{#snippet link(intern: string, text: string)}
  <a
    class:live={page.url.pathname === `/docs${intern}`}
    href="{base}/docs{intern}"
  >
    {text}
  </a>
{/snippet}

<nav class="block">
  {@render link("", "Overview")}
  {@render link("/reqs", "Requirements")}
  {@render link("/setup", "Setup")}
  {@render link("/rules", "Rules")}
  {@render link("/items", "Items")}
</nav>


<style lang="scss">

nav {
  width: max-content;
  padding-top: 20vh;
  display: flex;
  flex-flow: column nowrap;
}

nav a {
  width: 100%;
  padding: 0.25em 0.5em;

  @include font-body;
  font-size: 150%;
  color: $col-text-prot;
  text-decoration: none;
  transition: background 0.16s ease-out;

  &:hover {
    background: rgb(black, 5%);
  }

  &:active {
    background: rgb(black, 10%);
  }

  &.live {
    color: $col-blue;
  }
}

</style>
