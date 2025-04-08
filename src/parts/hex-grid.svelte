<!-- @component HexGrid

The hexagonal game grid.
-->

<script lang="ts">
  
import HexCell from "./hex-cell.svelte";

interface Props {
  rings?: number;
  size?: string;
}

let { rings = 3, size = "5rem" }: Props = $props();

</script>


<div class="hex-layout">
  <div class="hex-grid" style:--size={size}>
    <HexCell layer={0} group={0} idx={0} />

    {#each { length: rings } as _, i}
      {@const layer = i+1}
      {#each { length: 6 } as _, group}
        {#each { length: layer } as _, idx}
          <HexCell {layer} {group} {idx} />
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

.hex-cell {
  position: absolute;
  --dist: calc(var(--size) * var(--layer));
  --t: calc(360deg * var(--group) / 6);
  --th: calc(var(--t) + 120deg);
  transform:
    translateX(calc(
      var(--dist) * cos(var(--t)) +
      var(--dist) * cos(var(--th)) * var(--idx) * 1 / var(--layer)
    ))
    translateY(calc(
      var(--dist) * sin(var(--t)) +
      var(--dist) * sin(var(--th)) * var(--idx) * 1 / var(--layer)
    ));

  --b: 2px;
  height: var(--size);
  aspect-ratio: cos(30deg);
  // clip-path: 
  //   polygon(50% 0,-50% 50%,50% 100%,150% 50%,50% 0,
  //   50% var(--b),
  //   calc(100% - var(--b)*sin(60deg)) calc(25% + var(--b)*cos(60deg)),
  //   calc(100% - var(--b)*sin(60deg)) calc(75% - var(--b)*cos(60deg)),
  //   50% calc(100% - var(--b)),
  //   calc(var(--b)*sin(60deg)) calc(75% - var(--b)*cos(60deg)),
  //   calc(var(--b)*sin(60deg)) calc(25% + var(--b)*cos(60deg)),
  //   50% var(--b));
  clip-path: polygon(-50% 50%, 50% 100%, 150% 50%, 50% 0);
  background: #3B8686;
  // border: 1px solid red;
  transition: background 0.5s ease-out;

  &:hover {
    background: red;
  }
}

</style>
