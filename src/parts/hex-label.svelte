<!-- @component HexLabel

An interactive label for an axis of the hexagonal grid.
-->

<script lang="ts">

import katex from "katex";

import type { LCord, RCord } from "#scripts/types";

import { getContext, setContext } from "svelte";

interface Props {
  side: "left" | "right";
  cord: LCord | RCord;
  layer: number;
  group: number;
  index: number;
}

let { side, cord, layer, group, index }: Props = $props();

let hovered_axis = getContext("hex-grid.hoverered-axis");


function onhover()
{
  hovered_axis.cord = cord;
  hovered_axis.side = side;
}

function onescape()
{
  hovered_axis.cord = null;
}

</script>


<button class="hex-label {side}"
  style:--layer={layer}
  style:--group={Math.floor(index / layer) + group}
  style:--index={index % layer}
  style:--dx={side === "left" ? "-0.7rem" : "0.7rem"}
  style:--dy="0.6rem"
  onmouseover={onhover}
  onfocus={onhover}
  onmouseleave={onescape}
  onfocusout={onescape}
>
  {@html katex.renderToString(cord ?? "?", { throwOnError: false })}
</button>


<style lang="scss">

.hex-label {
  --dist: calc(var(--size) * var(--layer));
  --t: calc(30deg + 360deg * var(--group) / 6);
  --tt: calc(var(--t) + 120deg);

  width: var(--size);
  aspect-ratio: 1/cos(30deg);

  position: absolute;
  transform:
    translateX(calc(
      var(--dist) * cos(var(--t)) +
      var(--dist) * cos(var(--tt)) * var(--index) / var(--layer) +
      var(--dx)
    ))
    translateY(calc(
      var(--dist) * sin(var(--t)) +
      var(--dist) * sin(var(--tt)) * var(--index) / var(--layer) +
      var(--dy)
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
