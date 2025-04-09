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
      <HexGrid rings={$game.grid.rings} size="4.5rem" />
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

      <section id="cell-count">
        <h2> CELLS </h2>

        <p>
          {$game.grid.used}
          <span class="separator">/</span>
          {$game.grid.cells.size}
        </p>
      </section>
    </div>
  </div>

  <div class="right">
    <div class="col left">
      <section id="current-cell">
        <h2> CURRENT CELL </h2>

        <div class="content">
          {#key `${$game.selected_l}-${$game.selected_r}`}
            <p transition:slide={{ duration: 1000, easing: expoOut }}>

              {#if $game.selected_l && $game.selected_r}
                {@html katex.renderToString($game.selected_l, { throwOnError: false })}
                <span class="separator">/</span>
                {@html katex.renderToString($game.selected_r, { throwOnError: false })}
              {:else}
                none
              {/if}

            </p>
          {/key}
        </div>
      </section>

      <section id="cell-history">
        <h2> HISTORY </h2>

        <div class="content">
          {#if $game.cell_history?.length}
            {#each $game.cell_history as [l, r], i (l+r)}
              <button onclick={() => {
                try {
                  $game.grid.reset_cell([l, r]);
                  $game.cell_history.splice(i, 1);
                } catch {
                  alert("Something went wrong!");
                }
              }}
                transition:slide={{ duration: 1000, easing: expoOut }}
              >
                {@html katex.renderToString(l, { throwOnError: false })}
                <span class="separator">/</span>
                {@html katex.renderToString(r, { throwOnError: false })}

                <span class="cross">×</span>
              </button>
            {/each}
          {:else}
            <p> None to show yet! </p>
          {/if}
        </div>
      </section>
    </div>

    <div class="col right">
      <section id="pick-next">
        <h2> PICKING NEXT CELL </h2>
        <Notes text="Old Pirate Jim" />
      </section>

      <section id="complex-plane">
        <h2> COMPLEX PLANE </h2>
        <Notes text="Rick Astley" multi={false} />
      </section>

      <section id="notes">
        <h2> NOTES </h2>
        <Notes text="Nice for fishing, ain’t it" />
      </section>
    </div>
  </div>
</div>


<style lang="scss">

.layout {
  width: 100vw;
  padding: 1rem 2rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;

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
  gap: 5rem;

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
  overflow-y: hidden;
  
  .content {
    height: 25em;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1em;
  }

  button {
    appearance: none;
    width: 100%;
    padding: 0.4em 0.5em;
    position: relative;
    display: block;

    font-size: 120%;
    text-align: left;
    background: none;
    border-radius: 0.4em;
    border: none;
    outline: none;
    transition: background 0.1s ease-out;

    &:hover {
      background: $col-back;
    }
    &:active {
      background: $col-back-click;
    }

    .cross {
      display: none;
    }

    &:hover .cross {
      display: block;
      position: absolute;
      top: 0.5em;
      right: 0.5em;
    }
  }
}


h2 {
  @include font-body;
  font-size: 120%;
  color: $col-text-prot;
}


@media screen and (max-width: 60rem) {
  .layout {
    flex-flow: column nowrap;
    gap: 4rem;
  }
}

</style>
