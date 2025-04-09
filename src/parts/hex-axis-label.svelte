<!-- @component HexLabel

An interactive label for an axis of the hexagonal grid.
-->

<script lang="ts">

import katex from "katex";

import type { LCord, RCord } from "#scripts/types";

import { getContext } from "svelte";

interface Props {
  side: "left" | "right";
  cord: LCord | RCord;
  layer: number;
  group: number;
  index: number;
}

let { side, cord, layer, group, index }: Props = $props();

let timeout: number | null = null;


let hover_data: any = getContext("hex-grid.hover-data");


function bump_hover()
{
  if (hover_data.timeout) {
    clearTimeout(hover_data.timeout);
  }

  if (hover_data.hovering || hover_data.hoverlock) {
    hover_data.axis.cord = cord;
    hover_data.axis.side = side;
    return;
  }

  timeout = setTimeout(() => {
    hover_data.hovering = true;
    hover_data.axis.cord = cord;
    hover_data.axis.side = side;
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
  
  hover_data.timeout = null;
  hover_data.axis.cord = null;

  if (!hover_data.hoverlock) {
    hover_data.timeout = setTimeout(() => {
      hover_data.hovering = false;
    }, 600);
  }
}

</script>


<button class="axis-label {side}"
  style:--layer={layer}
  style:--group={Math.floor(index / layer) + group}
  style:--index={index % layer}
  onmouseover={bump_hover}
  onfocus={bump_hover}
  onmouseleave={bump_unhover}
  onfocusout={bump_unhover}
>
  {@html katex.renderToString(cord ?? "?", { throwOnError: false })}
</button>


<style lang="scss">

.axis-label {
  --dist: calc(var(--size) * var(--layer));
  --t: calc(30deg + 360deg * var(--group) / 6);
  --tt: calc(var(--t) + 120deg);

  width: calc(var(--size) * 1);
  padding: 0.8em 0.5em 0;
  aspect-ratio: 1/cos(30deg);

  /* hexagonal shape for consistency in expected area of interaction */
  clip-path: polygon(50% -50%,100% 50%,50% 150%,0 50%);
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
  
  transition: font-size 0.12s ease-out;
  
  &.left { text-align: right; }
  &.right { text-align: left; }

  &:hover {
    font-size: 150%;

    &.left { color: $col-blue; }
    &.right { color: $col-red; }
  }
}

button {
  appearance: none;
  background: none;
  font-size: 120%;
  border: none;
  outline: none;
}

</style>
