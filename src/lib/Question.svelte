<script lang="ts">
  import { getQuestionByCategory, reloadQuestionsByCategory } from "./question";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let category: string;
  export let continueAfterAnswer = false;
  let question = getQuestionByCategory(category);
  let showAnswer = false;

  export const getMewQuestion = () => {
    dispatch("newQuestion");
    if (continueAfterAnswer) {
      showAnswer = false;
      question = getQuestionByCategory(category);
      if (!question) {
        reloadQuestionsByCategory(category);
        question = getQuestionByCategory(category);
      }
    }
  };

  export const changeCategory = () => {
    dispatch("changeCategory");
  };
</script>

{#if !!continueAfterAnswer}
  <button on:click={changeCategory}>Changer de catégorie</button>
{/if}
<h3 class="title {category}">{category}</h3>
{#if question}
  <a
    href="mailto:plbd@laposte.net?subject=Retour question {question.id}&body=J'ai une suggestion de modification sur la question  > {question.question} :"
    >Suggestion d'évolution de la question</a
  >
  <div class="question">
    <h3>Question #{question.id}</h3>
    <p>{@html question.question}</p>
    {#if showAnswer}
      <h4>Réponse</h4>
      <p>{@html question.answer}</p>
      <button on:click={() => getMewQuestion()}>Nouvelle question</button>
    {:else}
      <button on:click={() => (showAnswer = true)}>Afficher la réponse</button>
    {/if}
  </div>
{:else}
  <p>Plus de question pour cette catégorie</p>
  <button on:click={() => getMewQuestion()}>Nouvelle question</button>
{/if}

<style>
  h3.title {
    border-radius: 5px;
  }

  a {
    font-size: 10px;
  }
</style>
