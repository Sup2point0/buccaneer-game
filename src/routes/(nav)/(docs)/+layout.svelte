<script>

let { children } = $props();

</script>


<div class="layout">
  <div class="content">
    {@render children?.()}
  </div>
</div>


<style lang="scss">

.layout {
  margin-top: 3rem;
  padding: 1rem 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  max-width: min(100%, 80rem);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: start;
  gap: 2rem;
}

</style>
