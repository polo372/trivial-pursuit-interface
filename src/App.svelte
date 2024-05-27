<script lang="ts">
  import Question from './lib/Question.svelte'
  import { initQuestions, reloadGame, getCategories } from './lib/question'
  // Initialise les questions
  initQuestions()
  // Initialise les catégories
  const categories = getCategories()

  // Selection d'une catégorie de question
  let categorySelected: string | null = null;
</script>

<main>
  {#if !!categorySelected}
    <Question category={categorySelected} on:newQuestion={() => categorySelected = null}/>
  {:else}
    <button on:click={() => reloadGame()}>Recharger le jeu</button>
    <h1>Choisissez une catégorie</h1>
    <ul>
      {#each categories as category}
        <li>
          <button class={category} on:click={() => categorySelected = category}>{category}</button>
        </li>
      {/each}
    </ul>
  {/if}
</main>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>
