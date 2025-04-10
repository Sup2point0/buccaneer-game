<script lang="ts">

import { current } from "#src/version.json" assert { type: "json" };

import Content from "./credits.svx";

</script>

<article>
  <header>
    <h1> Buccaneer Game </h1>
    <p class="caption"> version {current} </p>
  </header>

  <main>
    <Content />
  </main>
</article>


<style>

main {
  text-align: center;
}

</style>
