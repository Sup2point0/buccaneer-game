<!-- @component HexCell

A cell in a `HexGrid`.
-->

<script lang="ts">

import { game } from "#scripts/stores";
import type { Cord } from "#scripts/types";

interface Props {
  layer?: number;
  group?: number;
  index?: number;
}

let { layer = 0, group = 0, index = 0 }: Props = $props();

const cell = $game.grid.get_cell(
  calculate_cords(layer, group, index)
);


/** Calculates the L/R cords of the cell, given its (layer, group, index). */
function calculate_cords(layer: number, group: number, index: number): Cord
{
  let l = Math.floor($game.grid.l_cords.length / 2);
  let r = Math.floor($game.grid.r_cords.length / 2);

  switch (group) {
    case 0:
      r += layer;
      l -= index;
      break;

    case 1:
      r += layer;
      l -= layer;
      r -= index;
      break;

    case 2:
      l -= layer;
      l += index;
      r -= index;
      break;

    case 3:
      r -= layer;
      l += index;
      break;

    case 4:
      l += layer;
      r -= layer;
      r += index;
      break;

    case 5:
      l += layer;
      l -= index;
      r += index;
      break;

  }

  return [
    $game.grid.l_cords[l],
    $game.grid.r_cords[r],
  ];
}


</script>



<div class="hex-cell back"
  style="--layer: {layer}; --group: {group}; --index: {index}"
  onclick={cell.select()}
></div>

<div class="hex-cell front"
  style="--layer: {layer}; --group: {group}; --index: {index}"
>
</div>

<div class="hex-cell"
  style="--layer: {layer}; --group: {group}; --index: {index}"
  style:left="1.5em"
  style:top="2.5em"
  style:font-size="75%"
>
  {cell?.l}-{cell?.r}
  <!-- {layer}-{group}-{index} -->
</div>


<style lang="scss">

.hex-cell {
  --dist: calc(var(--size) * var(--layer));
  --t: calc(30deg + 360deg * var(--group) / 6);
  --tt: calc(var(--t) + 120deg);

  width: var(--size);
  aspect-ratio: 1/cos(30deg);
  position: absolute;
  transform:
    translateX(calc(
      var(--dist) * cos(var(--t)) +
      var(--dist) * cos(var(--tt)) * var(--index) * 1 / var(--layer)
    ))
    translateY(calc(
      var(--dist) * sin(var(--t)) +
      var(--dist) * sin(var(--tt)) * var(--index) * 1 / var(--layer)
    ));

  transition: background 0.06s ease-out;
}

.hex-cell.back {
  clip-path: polygon(50% -50%,100% 50%,50% 150%,0 50%);
  background: none;
}

.hex-cell.front {
  $width: 2.5px;

  clip-path: 
    polygon(0 50%,50% -50%,100% 50%,50% 150%,0 50%,
    $width 50%,
    calc(25% + $width*cos(60deg)) calc(100% - $width*sin(60deg)),
    calc(75% - $width*cos(60deg)) calc(100% - $width*sin(60deg)),
    calc(100% - $width) 50%,
    calc(75% - $width*cos(60deg)) calc($width*sin(60deg)),
    calc(25% + $width*cos(60deg)) calc($width*sin(60deg)),
    $width 50%);
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
