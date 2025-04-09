<!-- @component Notes

A block that can be typed into
-->

<script lang="ts">

interface Props {
  text?: string;
  multi?: boolean;
}

let { text = "", multi = true }: Props = $props();

</script>


<textarea placeholder={text} class:multi
  onkeydown={e => {
    if (e.key === "Enter" && !multi) {
      e.preventDefault();
    }
  }}
>
</textarea>


<style lang="scss">

textarea {
  resize: none;
  width: 100%;
  height: 3.5em;
  padding: 1em 1.5em;
  background: $col-back;

  @include font-body;
  font-size: 125%;
  border: none;
  outline: none;

  &.multi {
    min-height: 8em;
  }
}

</style>
