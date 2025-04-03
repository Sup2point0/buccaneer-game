<!-- @component HexGrid

The hexagonal game grid.
-->

<script lang="ts">

interface Props {
  rings?: number;
}

let { rings = 3 }: Props = $props();

</script>


<div class="hex-layout">
  <div class="hex-grid">
    <div class="hex-cell"
      style:--layer={0}>
    </div>

    {#each { length: rings } as _, i}
      {#each { length: 6 * (i+1) } as _, j}
        <div class="hex-cell layer-{i+1}"
          style:--layer={i+1}
          style:--idx={j}
        ></div>
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
  height: 5rem;
  aspect-ratio: cos(30deg);
  position: relative;
}

.hex-cell {
  position: absolute;
  --dist: calc(5rem * var(--layer));
  --t: calc(360deg * var(--idx) / var(--layer) / 6);
  transform:
    translateX(calc(
      var(--dist) * cos(var(--t))
    ))
    translateY(calc(
      var(--dist) * sin(var(--t))
    ));

  --b: 2px;
  height: 5rem;
  aspect-ratio: cos(30deg);
  clip-path: 
    polygon(50% 0,-50% 50%,50% 100%,150% 50%,50% 0,
    50% var(--b),
    calc(100% - var(--b)*sin(60deg)) calc(25% + var(--b)*cos(60deg)),
    calc(100% - var(--b)*sin(60deg)) calc(75% - var(--b)*cos(60deg)),
    50% calc(100% - var(--b)),
    calc(var(--b)*sin(60deg)) calc(75% - var(--b)*cos(60deg)),
    calc(var(--b)*sin(60deg)) calc(25% + var(--b)*cos(60deg)),
    50% var(--b));
  background: #3B8686;
}

</style>
