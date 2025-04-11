<!-- @component Notes

A block that can be typed into
-->

<script lang="ts">
  
import { game } from "#src/scripts/stores";

interface Props {
  text?: string;
  multi?: boolean;
}

let { text = "", multi = true }: Props = $props();


</script>


{#key $game.shard}
  <textarea class:multi
    spellcheck="false"
    placeholder={text}
    onkeydown={e => {
      if (e.key === "Enter" && !multi) {
        e.preventDefault();
      }
    }}
  ></textarea>
{/key}


<style lang="scss">

textarea {
  resize: none;
  width: 100%;
  height: 4em;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 1em 1.5em;

  @include font-body;
  font-size: 125%;
  line-height: 175%;
  white-space: nowrap;
  background: $col-back;
  border: none;
  outline: none;
  transition: background 0.1s ease-out;

  &:hover { background: $col-back-hover; }
  &:active { background: $col-back-click; }

  &.multi {
    min-height: 8em;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &::placeholder {
    color: rgb(black, 25%);
  }
}

</style>
