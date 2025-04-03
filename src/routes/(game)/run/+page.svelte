<script>

import HexGrid from "#parts/hex-grid.svelte";

</script>


<div class="layout">
  <div id="hex-grid">
    <HexGrid />
  </div>
</div>


<style lang="scss">

.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

#hex-grid {
  height: 80vh;
  width: 80vh;
  background: lightgrey;
}

</style>
