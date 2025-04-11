<!-- @component NewGame

An overlay for starting a new game.
-->

<script lang="ts">
  
import { game, type GameOptions } from "#src/scripts/stores";

import { slide } from "svelte/transition";
import { expoOut, expoIn } from "svelte/easing";

import Clicky from "#src/parts/clicky.svelte";


interface Props {
  open: boolean;
}

let { open = $bindable() }: Props = $props();


let config: GameOptions = {
  rings: 3,
};

function exit()
{
  open = false;
}

function go()
{
  $game.create_new(config);
  exit();
}

</script>


<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<aside onclick={exit}
  in:slide={{ duration: 800, easing: expoOut }}
  out:slide={{ duration: 600, easing: expoIn }}
>
  <div class="window">
    <section>
      <h1> New Game </h1>
    </section>
    <section id="final-utils">
      <Clicky text="CANCEL" kind="deut" action={exit} />
      <Clicky text="GO" action={go} />
    </section>
  </div>
</aside>


<style lang="scss">

aside {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 3rem;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;

  background: rgb(black, 10%);
  backdrop-filter: blur(8px);
}

.window {
  width: min(80%, 60rem);
  height: 80%;
  overflow-y: auto;
  padding: 2rem 4rem;
  margin-bottom: 3rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  background: white;
}

section {
  // width: 100%;
}

h1 {
  @include font-ui;
  font-size: 4rem;
}

#final-utils {
  display: flex;
  flex-flow: row nowrap;
  justify-content: end;
  gap: 1rem;
}

</style>
