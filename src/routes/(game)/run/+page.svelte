<script>

import { game } from "#scripts/stores";

import HexGrid from "#parts/hex-grid.svelte";

</script>


<div class="layout">
  <div id="hex-grid">
    <HexGrid rings={3} size="5rem" />
  </div>

  <div id="game-ui">
    <section id="current-cell">
      <h2> Current Cell </h2>
      <p> {$game.current_cell} </p>
    </section>

    <section id="History">
      
    </section>
  </div>
</div>


<style lang="scss">

.layout {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;

  height: 90vh;
  width: 100vw;
}

#hex-grid {
  height: 80vh;
  width: 80vh;
}

</style>
