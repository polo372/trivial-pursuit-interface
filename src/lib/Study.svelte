<script lang="ts">
  import Question from "./Question.svelte";
  import { initQuestions, getCategories } from "./question";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  // Initialise les questions
  initQuestions();
  // Initialise les catégories
  const categories = getCategories();

  // Selection d'une catégorie de question
  let categorySelected: string | null = null;
</script>

{#if !!categorySelected}
  <Question
    category={categorySelected}
    continueAfterAnswer={true}
    on:changeCategory={() => (categorySelected = null)}
  />
{:else}
  <button on:click={() => dispatch("reload")}>Retour</button>
  <h1>Choisissez une catégorie</h1>
  <ul>
    {#each categories as category}
      <li>
        <button class={category} on:click={() => (categorySelected = category)}
          >{category}</button
        >
      </li>
    {/each}
  </ul>
{/if}

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    & > li {
      margin: 16px;
    }
  }
</style>
