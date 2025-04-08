<!-- @component HexGrid

The hexagonal game grid.
-->

<script lang="ts">
  
import HexCell from "./hex-cell.svelte";

interface Props {
  rings: number;
  size?: string;
}

let { rings, size = "5rem" }: Props = $props();

</script>


<div class="hex-layout">
  <div class="hex-grid" style:--size={size}>
    <HexCell />

    {#each { length: rings } as _, i}
      {@const layer = i+1}

      {#each { length: 6 } as _, group}
        {#each { length: layer } as _, index}
          <HexCell {layer} {group} {index} />
        {/each}
      {/each}
    {/each}
  </div>

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
