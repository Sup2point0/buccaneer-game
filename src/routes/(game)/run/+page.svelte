<script>

import katex from "katex";

import { game } from "#scripts/stores";

import HexGrid from "#parts/hex-grid.svelte";
import Notes from "#parts/notes.svelte";

import { fade } from "svelte/transition";
import { slide } from "svelte/transition";
import { expoOut } from "svelte/easing";
import { onMount } from "svelte";


onMount(() => {
  setInterval(() => {
    if (!$game.start_time) return;
    $game.time = Date.now() - $game.start_time;
  }, 500);
});

</script>


<div class="layout">
  <div class="left">
    <div id="hex-grid">
      <HexGrid rings={3} size="4.5rem" />
    </div>

    <div id="game-info">
      <section id="turn-count">
        <h2> TURN </h2>
        <p> {$game.turn} </p>
      </section>

      <section id="game-timer">
        <h2> TIME </h2>
        <p> {$game.time_display} </p>
      </section>
    </div>
  </div>

  <div class="right">
    <div class="col left">
      <section id="current-cell">
        <h2> CURRENT CELL </h2>

        {#key $game.selected_l + $game.selected_r}
          <p transition:slide={{ duration: 1000, easing: expoOut }}>

            {#if $game.selected_l && $game.selected_r}
              {@html katex.renderToString($game.selected_l, { throwOnError: false })}
              <span class="separator">/</span>
              {@html katex.renderToString($game.selected_r, { throwOnError: false })}
            {:else}
              -
            {/if}

          </p>
        {/key}
      </section>

      <section id="cell-history">
        <h2> HISTORY </h2>

        {#each $game.cell_history as [l, r] (l+r)}
          <p transition:slide={{ duration: 1000, easing: expoOut }}>
            {@html katex.renderToString(l, { throwOnError: false })}
            <span class="separator">/</span>
            {@html katex.renderToString(r, { throwOnError: false })}
          </p>
        {/each}
      </section>
    </div>

    <div class="col right">
      <section id="pick-next">
        <Notes text="Players waiting to pick the next cell" />
      </section>

      <section id="complex-plane">
        <Notes text="Player in the complex plane" multi={false} />
      </section>

      <section id="notes">
        <Notes text="Notes" />
      </section>
    </div>
  </div>
</div>


<style lang="scss">

.layout {
  padding: 0 2rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;

  height: 90vh;
  width: 100vw;

  & > .left {
    flex-grow: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: start;
    align-items: center;
    gap: 1rem;
  }

  & > .right {
    flex-grow: 1;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: start;
    gap: 1rem;
  }
}

#hex-grid {
  height: 75vh;
  aspect-ratio: 1;
}

#game-info {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;

  section {
    p {
      @include font-head;
      font-size: 200%;
    }
  }
}

.col {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
  gap: 1rem;
}

.col.left {
  section {
    padding: 1em 1.5em;
    background: $col-back;
  }
}

#current-cell {
  p {
    padding-top: 0.5em;
    font-size: 200%;
  }
}

#cell-history {
  min-height: 10rem;
}

h2 {
  @include font-body;
  font-size: 120%;
}

</style>
