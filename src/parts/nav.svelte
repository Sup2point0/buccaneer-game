<!-- @component Nav

The global navigation bar.
-->

<script lang="ts">

import { base } from "$app/paths";

</script>


<nav>
  <a href="{base}/docs">
    <span class="more"> How to Play </span>
    <span class="less"> Rules </span>
  </a>
  <a href="{base}/run">
    <span class="more"> Run a Game </span>
    <span class="less"> Run </span>
  </a>
  <a href="{base}/play">
    <span class="more"> Play a Game </span>
    <span class="less"> Play </span>
  </a>
  <a href="{base}/changelog">
    <span class="more"> Changelog </span>
    <span class="less"> Changelog </span>
  </a>
  <a href="{base}/credits">
    <span class="more"> Credits </span>
    <span class="less"> Credits </span>
  </a>
</nav>


<style lang="scss">

nav {
  width: 100%;
  padding: 0.25rem 0;
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  column-gap: 0.5rem;
  background: $col-prot;

  a {
    padding: 0.25em 0.5em;

    @include font-ui;
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

    .less {
      display: none;
    }
  }
}

@media screen and (max-width: 60rem) {
  nav a .more {
    display: none;
  }
  nav a .less {
    display: inline;
  }
}

</style>
