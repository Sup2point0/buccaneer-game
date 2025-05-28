<script>

import { Items } from "#scripts/items";

import Content from "./items.svx";

</script>


<header>
  <h1> Items </h1>
</header>

<main>
  <Content />

  <blockquote>
    This is a work in progress. A menu for browsing all items will be added soon!
  </blockquote>

  {#each Object.values(Items) as item}
    <div class="item">
      <h2>{item.name}</h2>
      <p><em>
        {item.type}
        {#if item.stand}
          (stand up)
        {/if}
      </em></p>

      <p>{item.desc}</p>

      {#if item.rules}
        <h3> Rulings </h3>
        {#if Array.isArray(item.rules)}
          <ul>
            {#each item.rules as rule}
              <li>{rule}</li>
            {/each}
          </ul>
        {:else}
          <p> {item.rules} </p>
        {/if}
      {/if}

      {#if item.notes}
        <h3> Notes </h3>
        <p> {item.notes} </p>
      {/if}

      {#if item.ex}
        {#if Array.isArray(item.ex)}
          <h3> Examples </h3>
          <ul>
            {#each item.ex as instance}
              <li> {instance} </li>
            {/each}
          </ul>
        {:else}
          <h3> Example </h3>
          <p> {item.ex} </p>
        {/if}
      {/if}
    </div>
  {/each}
</main>
