<!-- @component HexCell

A cell in a `HexGrid`.
-->

<script lang="ts">

import { HexCellState } from "#scripts/types";

interface Props {
  layer: number;
  group: number;
  idx: number;
}

let { layer, group, idx }: Props = $props();


let state: HexCellState = $state(HexCellState.Idle);

</script>



<div class="hex-cell back"
  style:--layer={layer}
  style:--group={group}
  style:--idx={idx}
></div>

<div class="hex-cell front"
  style:--layer={layer}
  style:--group={group}
  style:--idx={idx}
></div>


<style lang="scss">

.hex-cell {
  --dist: calc(var(--size) * var(--layer));
  --t: calc(360deg * var(--group) / 6);
  --tt: calc(var(--t) + 120deg);

  height: var(--size);
  aspect-ratio: cos(30deg);
  position: absolute;
  transform:
    translateX(calc(
      var(--dist) * cos(var(--t)) +
      var(--dist) * cos(var(--tt)) * var(--idx) * 1 / var(--layer)
    ))
    translateY(calc(
      var(--dist) * sin(var(--t)) +
      var(--dist) * sin(var(--tt)) * var(--idx) * 1 / var(--layer)
    ));

  transition: background 0.06s ease-out;
}

.hex-cell.back {
  clip-path: polygon(-50% 50%, 50% 100%, 150% 50%, 50% 0);
  background: none;
}

.hex-cell.front {
  $width: 2.5px;

  clip-path: 
    polygon(50% 0,-50% 50%,50% 100%,150% 50%,50% 0,
    50% $width,
    calc(100% - $width*sin(60deg)) calc(25% + $width*cos(60deg)),
    calc(100% - $width*sin(60deg)) calc(75% - $width*cos(60deg)),
    50% calc(100% - $width),
    calc($width*sin(60deg)) calc(75% - $width*cos(60deg)),
    calc($width*sin(60deg)) calc(25% + $width*cos(60deg)),
    50% $width);
    background: black;
}

.hex-cell:hover {
  &.back {
    background: rgb(black, 3%);
  }
}

.hex-cell:active {
  &.back {
    background: rgb(black, 5%);
  }
}

</style>
