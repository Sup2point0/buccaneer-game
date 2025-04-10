<script>

import { base } from "$app/paths";

</script>


<main>

  <header class="block">
    <h1> Buccaneer Game </h1>
    <p class="caption"> by Sup#2.0 </p>
  </header>

  <nav class="block">
    <a href="{base}/docs"> How to Play </a>
    <a href="{base}/run"> Run a Game </a>
    <a href="{base}/play"> Play a Game </a>
    <a href="{base}/changelog"> Changelog </a>
    <a href="{base}/credits"> Credits </a>
  </nav>

</main>


<style lang="scss">

main {
  height: 100vh;
  padding: 5vw;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: oklch(0.92 0.0271 60.88);
}

.block {
  max-width: 50rem;
  padding: 1rem;
}

header {
  h1 {
    padding: 0 0 0.25em;
    @include font-head;
    font-size: 300%;
    font-weight: normal;
  }

  p.caption {
    @include font-head;
    color: $col-text-prot;
    float: right;
  }
}

nav {
  width: max-content;
  display: flex;
  flex-flow: column nowrap;
}

nav a {
  width: 100%;
  padding: 0.25em 0.5em;

  @include font-body;
  font-size: 200%;
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
