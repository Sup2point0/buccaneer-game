<!-- @component HexCell

A cell in a `HexGrid`.
-->

<script lang="ts">

import katex from "katex";

import { game } from "#scripts/stores";
import { HexCell, type Cords } from "#scripts/types";

import { getContext } from "svelte";

interface Props {
  layer?: number;
  group?: number;
  index?: number;
}

let { layer = 0, group = 0, index = 0 }: Props = $props();

const cell: HexCell | null = $game.grid.get_cell(
  calculate_cords(layer, group, index)
);
let timeout: number | null = null;


let hover_data: any = getContext("hex-grid.hover-data");


/** Calculates the L/R cords of the cell, given its (layer, group, index). */
function calculate_cords(layer: number, group: number, index: number): Cords
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

  let L = $game.grid.l_cords[l];
  let R = $game.grid.r_cords[r];
  return [L, R];
}

function bump_hover()
{
  if (hover_data.timeout) {
    clearTimeout(hover_data.timeout);
  }

  if (hover_data.hoverlock) {
    hover_data.hovering = true;
    hover_data.axis.cord = null;
    return;
  }

  timeout = setTimeout(() => {
    hover_data.hovering = true;
    hover_data.axis.cord = null;
  }, 500);
}

function bump_unhover()
{
  if (timeout) {
    clearTimeout(timeout);
  }
  if (hover_data.timeout) {
    clearTimeout(hover_data.timeout);
  }

  if (!hover_data.hoverlock) {
    hover_data.timeout = setTimeout(() => {
      hover_data.hovering = false;
      hover_data.timeout = null;
    }, 600);
  }
}

</script>


<div class="hex-cell-root layer-{layer} group-{group} index-{index}"
  class:highlight-left={
    hover_data.axis.side === "left"
    && (hover_data.axis.cord === cell?.l || hover_data.axis.cord === cell?.r)
  }
  class:highlight-right={
    hover_data.axis.side === "right"
    && (hover_data.axis.cord === cell?.l || hover_data.axis.cord === cell?.r)
  }

  style="
    --layer: {layer};
    --group: {group};
    --index: {index};"
>
  <!-- svelte-ignore a11y_consider_explicit_label -->
  <button class="hex-cell back"
    class:used={cell?.used}
    class:live={$game.selected_l === cell?.l && $game.selected_r === cell?.r}
    
    onmouseover={bump_hover} onfocus={bump_hover}
    onmouseleave={bump_unhover} onfocusout={bump_unhover}
    onclick={() => {
      try {
        if (!cell) throw new Error();
        $game.select_cell(cell.cords);
      } catch {
        alert("Cell is undefined!");
      }
    }}
  ></button>

  <div class="hex-cell front"
    class:used={cell?.used}
    class:live={$game.selected_l === cell?.l && $game.selected_r === cell?.r}
  >
  </div>

  <div class="hex-cell cords" class:hovering={hover_data.hovering}>
    {@html katex.renderToString(cell?.l ?? "?")}
    <span class="separator">/</span>
    {@html katex.renderToString(cell?.r ?? "?")}
  </div>
</div>

<!-- <div class="hex-cell" style="
  --layer: {layer};
  --group: {group};
  --index: {index};
  left: 1.25rem;
  top: 1.5rem;
  font-size: 150%;"
>
  {layer}-{group}-{index}
</div> -->


<style lang="scss">

@use 'sass:color';


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
      var(--dist) * cos(var(--tt)) * var(--index) / var(--layer)
    ))
    translateY(calc(
      var(--dist) * sin(var(--t)) +
      var(--dist) * sin(var(--tt)) * var(--index) / var(--layer)
    ));

  transition: background 0.1s ease-out;
}

.hex-cell.back {
  clip-path: polygon(50% -50%,100% 50%,50% 150%,0 50%);
  background: rgb(black, 4%);

  &:hover, &:focus-visible {
    background: rgb(black, 8%);
  }
  &:active {
    background: rgb(black, 12%);
    }

  &.used {
    background: #65696b;

    &:hover, &:focus-visible {
      background: color.adjust(#65696b, $lightness: -10%);
    }
  }

  &.live {
    background: rgb(#f5d503, 25%);

    &:hover, &:focus-visible {
      background: rgb(#f5d503, 50%);
    }
  }

  .highlight-left & {
    background: color-mix(in oklch, $col-blue, transparent 80%);
  }
  .highlight-left &.used {
    background: color-mix(in oklch, $col-blue, transparent 20%);
  }
  .highlight-right & {
    background: color-mix(in oklch, $col-red, transparent 80%);
  }
  .highlight-right &.used {
    background: color-mix(in oklch, $col-red, transparent 10%);
  }

  animation: fade-in-back 1s ease-out;
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
    
  background: #cfd3d5;

  &.used {
    background: #383b3d;
  }

  &.live {
    background: #f5d503;
  }

  .highlight-left & {
    background: $col-blue;
  }
  .highlight-right & {
    background: $col-red;
  }

  animation: fade-in-front 1s ease-out;
}

.hex-cell.cords {
  opacity: 0;
  visibility: hidden;

  width: max-content;
  height: max-content;
  aspect-ratio: auto;
  padding: 0.25em 0.5em;
  top: 4.5rem;
  z-index: 3;

  font-size: 120%;
  color: white;
  text-align: center;
  background: rgb(black, 90%);
  border-radius: 0.4em;
  box-shadow: 0 2px 8px rgb(black, 40%);
  transition: all 0.12s ease-out;
  transition-delay: 0;

  .hex-cell:where(:hover, :focus-visible) ~ & {
    opacity: 1;
    visibility: visible;
    transition-delay: 0.5s;
  }
  .hex-cell:where(:hover, :focus-visible) ~ &.hovering {
    transition-duration: 0.06s;
    transition-delay: 0s;
  }

  .separator {
    color: $col-text-prot;
  }
}

button {
  appearance: none;
}


$col-highlight: #f5d503;

@keyframes fade-in-back {
  0%   { background: rgb(black, 4%); }
  25%  { background: $col-blue; }
  30%  { background: $col-blue; }
  40%  { background: $col-red; }
  60%  { background: $col-red; }
  75%  { background: $col-highlight; }
  100% { background: rgb(black, 4%); }
}

@keyframes fade-in-front {
  0%   { background: #cfd3d5; }
  25%  { background: $col-blue; }
  30%  { background: $col-blue; }
  40%  { background: $col-red; }
  60%  { background: $col-red; }
  75%  { background: $col-highlight; }
  100% { background: #cfd3d5; }
}

$delay-base: 0.5s;
$delay-unit: 0.05s;

/* Yes, this is horrific. Alas, this was the only way. */
.layer-3.group-4.index-0 {
  .hex-cell { animation-delay: $delay-base + 1*$delay-unit; }
}
.layer-3.group-3.index-2,
.layer-2.group-4.index-0,
.layer-3.group-4.index-1 {
  .hex-cell { animation-delay: $delay-base + 2*$delay-unit; }
}
.layer-3.group-3.index-1,
.layer-2.group-3.index-1,
.layer-1.group-4.index-0,
.layer-2.group-4.index-1,
.layer-3.group-4.index-2 {
  .hex-cell { animation-delay: $delay-base + 3*$delay-unit; }
}
.layer-3.group-3.index-0,
.layer-2.group-3.index-0,
.layer-1.group-3.index-0,
.layer-0.group-0.index-0,
.layer-1.group-5.index-0,
.layer-2.group-5.index-0,
.layer-3.group-5.index-0 {
  .hex-cell { animation-delay: $delay-base + 4*$delay-unit; }
}
.layer-3.group-2.index-2,
.layer-2.group-2.index-1,
.layer-1.group-2.index-0,
.layer-1.group-1.index-0,
.layer-1.group-0.index-0,
.layer-2.group-5.index-1,
.layer-3.group-5.index-1 {
  .hex-cell { animation-delay: $delay-base + 5*$delay-unit; }
}
.layer-3.group-2.index-1,
.layer-2.group-2.index-0,
.layer-2.group-1.index-1,
.layer-2.group-1.index-0,
.layer-2.group-0.index-1,
.layer-2.group-0.index-0,
.layer-3.group-5.index-2 {
  .hex-cell { animation-delay: $delay-base + 6*$delay-unit; }
}

.layer-3.group-2.index-0,
.layer-3.group-1.index-2,
.layer-3.group-1.index-1,
.layer-3.group-1.index-0,
.layer-3.group-0.index-2,
.layer-3.group-0.index-1,
.layer-3.group-0.index-0 {
  .hex-cell { animation-delay: $delay-base + 7*$delay-unit; }
}

</style>
