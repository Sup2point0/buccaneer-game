<!-- @component Nav

The global navigation bar.
-->

<script lang="ts">

import { base } from "$app/paths";

</script>


<nav>
  <a href="{base}/docs"> How to Play </a>
  <a href="{base}/run"> Run a Game </a>
  <a href="{base}/play"> Play a Game </a>
  <a href="{base}/changelog"> Changelog </a>
  <a href="{base}/credits"> Credits </a>
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
  background: oklch(0.85 0.037 60.88);

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
  }
}

</style>
