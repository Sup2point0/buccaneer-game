<script lang="ts">

import Content from "./overview.svx";
import { current, update } from "#src/version.json" assert { type: "json" };

</script>


<header>
  <h1> Buccaneer Game </h1>
  <p class="caption"> version {current} </p>
  <p class="caption"> last updated {update} </p>
</header>

<main>
  <Content />
</main>
