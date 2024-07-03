<script lang="ts">
  import Dice from "./lib/Dice.svelte";
  import Question from "./lib/Question.svelte";
  import { initQuestions, reloadGame, getCategories } from "./lib/question";
  // Initialise les questions
  initQuestions();
  // Initialise les catégories
  const categories = getCategories();

  // Selection d'une catégorie de question
  let categorySelected: string | null = null;

  function print(url: string): void {
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
</script>

<main>
  {#if !!categorySelected}
    <Question
      category={categorySelected}
      on:newQuestion={() => (categorySelected = null)}
    />
  {:else}
    <div class="setting">
      <button on:click={() => print("./plateau.png")}
        >Télécharger le plateau</button
      >
      <button on:click={() => print("./pions.jpg")}
        >Télécharger les pions</button
      >
      <button
        ><a href="./regle.jpg" target="_blank">Consulter les règles</a></button
      >
      <button on:click={() => reloadGame()}>Recharger le jeu</button>
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
</main>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    & > li {
      margin: 16px;
    }
  }

  @media screen and (width > 700px) {
    div.setting {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  @media screen and (width <= 700px) {
    div.setting {
      margin-bottom: 1em;
    }
  }

  div.setting {
    display: flex;
    flex-direction: column;

    & button > a {
      color: black;
      text-decoration: none;
    }
  }
</style>
