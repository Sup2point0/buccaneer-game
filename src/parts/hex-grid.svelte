<!-- @component HexGrid

The hexagonal game grid.
-->

<script lang="ts">

import { game } from "#scripts/stores";

import HexCell from "#parts/hex-cell.svelte";
import HexLabel from "#parts/hex-axis-label.svelte";

import { setContext } from "svelte";
import { onMount } from "svelte";

interface Props {
  rings: number;
  size?: string;
}

let { rings, size = "5rem" }: Props = $props();


let hover_data = $state({
  hoverlock: false,
  hovering: false,
  timeout: null,
  axis: {
    cord: null,
    side: "right",
  },
});

setContext("hex-grid.hover-data", hover_data);


onMount(() => {
  window.addEventListener("keydown", e => {
    if (e.ctrlKey) {
      hover_data.hoverlock = true;
    }
  })
  window.addEventListener("keyup", e => {
    if (e.key === "Control") {
      hover_data.hoverlock = false;
    }
  })
});

</script>


<div class="hex-layout">
  {#key $game.shard}

  <div class="hex-grid" style:--size={size}>
    <!-- centre cell -->
    <HexCell />

    <!-- cells -->
    {#each { length: rings } as _, i}
      {@const layer = i+1}

      {#each { length: 6 } as _, group}
        {#each { length: layer } as _, index}
          <HexCell {layer} {group} {index} />
        {/each}
      {/each}
    {/each}

    <!-- labels -->
    {#each { length: 2*rings +1 } as _, index}
      <HexLabel side="left"
        cord={$game.grid.l_cords[index]}
        layer={rings +1}
        group={2}
        index={index +1}
      />
    {/each}

    {#each { length: 2*rings +1 } as _, index}
      <HexLabel side="right"
        cord={$game.grid.r_cords[index]}
        layer={rings +1}
        group={4}
        index={index +1}
      />
    {/each}
  </div>

  {/key}
</div>


<style lang="scss">

.hex-layout {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hex-grid {
  height: var(--size);
  aspect-ratio: cos(30deg);
  position: relative;
}

</style>
