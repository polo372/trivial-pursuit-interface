<script lang="ts">
  import Question from "./Question.svelte";
  import { initQuestions, getCategories } from "./question";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  // Initialise les questions
  initQuestions();
  // Initialise les catégories
  const categoriesPromise = getCategories();

  // Selection d'une catégorie de question
  let categorySelected: string | null = null;
</script>

{#await categoriesPromise then categories}
  {#if !!categorySelected}
    <Question
      category={categorySelected}
      continueAfterAnswer={true}
      on:changeCategory={() => (categorySelected = null)}
    />
  {:else}
    <div class="setting">
      <button
        ><a target="_blank" href="https://forms.gle/enz8CB7Qdb87GL377"
          >Aidez-nous à nous améliorer</a
        ></button
      >
      <button on:click={() => dispatch("reload")}>Retour</button>
    </div>
    <h1>Choisissez une catégorie</h1>
    <ul>
      {#each categories as category}
        <li>
          <button
            class={category}
            on:click={() => (categorySelected = category)}>{category}</button
          >
        </li>
      {/each}
    </ul>
  {/if}
{/await}

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    & > li {
      margin: 16px;
    }
  }
  div.setting {
    display: flex;
    flex-direction: column;

    & button > a {
      color: white;
      text-decoration: none;
    }
  }
</style>
