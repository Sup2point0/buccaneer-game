<!-- @component Clicky

A button.
-->

<script lang="ts">

interface Props {
  text: string;
  kind?: "prot" | "deut";
  action: () => void;
}

let { text, kind = "prot", action }: Props = $props();

</script>


<button class={kind} onclick={action}>
  {text}
</button>


<style lang="scss">

@use 'sass:color';


button {
  appearance: none;
  padding: 0.25em 0.75em;
  @include font-ui;
  font-size: 125%;
  color: white;
  border: none;
  border-radius: 0.4em;
  outline: none;
  box-shadow: 0 2px 6px rgb(black, 20%);
  transform: none;
  transition: all 0.12s ease-out;

  &:hover, &:focus-visible {
    box-shadow: 0 1px 4px rgb(black, 25%);
    transform: scale(105%);
  }

  &:hover {
    cursor: pointer;
  }
}

button.prot {
  background: $col-blue;

  &:hover, &:focus-visible {
    background: $col-red;
  }

  &:active {
    background: color.adjust($col-red, $lightness: -10%);
  }
}

button.deut {
  background: #65696b;

  &:hover, &:focus-visible {
    background: color.adjust(#65696b, $lightness: -10%);
  }

  &:active {
    background: color.adjust(#65696b, $lightness: -25%);
  }
}

</style>
