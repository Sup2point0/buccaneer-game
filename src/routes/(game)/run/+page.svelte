<script>

import katex from "katex";

import { game } from "#scripts/stores";

import HexGrid from "#parts/hex-grid.svelte";
import Notes from "#parts/notes.svelte";

import { slide } from "svelte/transition";
import { expoOut } from "svelte/easing";
import { onMount } from "svelte";




onMount(() => {
  setInterval(() => {
    if (!$game.start_time) return;
    $game.time = Date.now() - $game.start_time;
  }, 1000);
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
        {#key $game.turn}
          <p transition:slide={{ duration: 1000, easing: expoOut }}> {$game.turn} </p>
        {/key}
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

        <div class="content">
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
        </div>
      </section>

      <section id="cell-history">
        <h2> HISTORY </h2>

        <div class="content">
          {#each $game.cell_history as [l, r] (l+r)}
            <p transition:slide={{ duration: 1000, easing: expoOut }}>
              {@html katex.renderToString(l, { throwOnError: false })}
              <span class="separator">/</span>
              {@html katex.renderToString(r, { throwOnError: false })}
            </p>
          {/each}
        </div>
      </section>
    </div>

    <div class="col right">
      <section id="pick-next">
        <h2> PICKING NEXT CELL </h2>
        <Notes text="Player names" />
      </section>

      <section id="complex-plane">
        <h2> COMPLEX PLANE </h2>
        <Notes text="Player in the complex plane" multi={false} />
      </section>

      <section id="notes">
        <h2> NOTES </h2>
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
    gap: 2rem;
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
  gap: 2rem;

  h2 {
    padding-bottom: 0.5em;
  }

  .content {
    padding: 1em 1.5em;
    background: $col-back;
  }
}

#current-cell {
  p {
    font-size: 200%;
  }
}

#cell-history {
  height: 25em;
  overflow-y: auto;

  p {
    padding: 0.5em 0.5em;
    margin: 0.25em -0.5em;
    border-radius: 0.4em;
    transition: background 0.1s ease-out;

    &:hover {
      background: $col-back;
    }
  }
}

h2 {
  @include font-body;
  font-size: 120%;
}


@media screen and (max-width: 60rem) {
  .layout {
    flex-flow: column nowrap;
    gap: 4rem;
  }
}

</style>
