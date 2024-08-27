<script lang="ts">
  import Dice from "./Dice.svelte";
  import Question from "./Question.svelte";
  import { initQuestions, reloadGame, getCategories } from "./question";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  // Initialise les questions
  initQuestions();
  // Initialise les catégories
  const categoriesPromise = getCategories();

  // Sélection d'une catégorie de question
  let categorySelected: string | null = null;

  function download(url: string, filename: string): void {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  /* function print(url: string): void {
    let fenetreImpression = window.open(url);
    if (fenetreImpression) {
      fenetreImpression.onload = function () {
        fenetreImpression.print();
        // Ferme l'onglet après un délai pour donner le temps à l'impression de se lancer
        setTimeout(() => {
          fenetreImpression.close();
        }, 1000);
      };
    }
  }
*/
</script>

{#await categoriesPromise}
  Chargement en cours
{:then categories}
  {#if categorySelected}
    <Question
      category={categorySelected}
      on:newQuestion={() => (categorySelected = null)}
    />
  {:else}
    <div class="setting">
      <button on:click={() => dispatch("reload")}>Retour</button>
      <button on:click={() => download("./plateau.png", "plateau.png")}
        >Télécharger le plateau</button
      >
      <button on:click={() => download("./pions.jpg", "pions.jpg")}
        >Télécharger les pions</button
      >
      <button
        ><a href="./regle.jpg" target="_blank">Consulter les règles</a></button
      >
      <button on:click={() => reloadGame()}>Recharger le jeu</button>
      <button>
        <a target="_blank" href="https://forms.gle/enz8CB7Qdb87GL377"
          >Aidez-nous à nous améliorer</a
        >
      </button>
    </div>
    <div>
      <Dice />
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

  @media screen and (min-width: 700px) {
    .setting {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  @media screen and (max-width: 700px) {
    .setting {
      margin-bottom: 1em;
    }
  }

  .setting {
    display: flex;
    flex-direction: column;
  }

  .setting button > a {
    color: white;
    text-decoration: none;
  }

  .setting button,
  .setting a {
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    transition:
      background 0.3s,
      transform 0.2s;
  }

  .setting button:hover,
  .setting a:hover {
    transform: scale(1.05);
  }
</style>
