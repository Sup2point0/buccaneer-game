<!-- @component NavPane

The side navigation for rules pages.
-->

<script lang="ts">

import { base } from "$app/paths";

</script>


<nav class="block">
  <a href="{base}/docs"> Overview </a>
  <a href="{base}/docs/reqs"> Requirements </a>
  <a href="{base}/docs/setup"> Setup </a>
  <a href="{base}/docs/rules"> Rules </a>
  <a href="{base}/docs/items"> Items </a>
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
}

</style>
