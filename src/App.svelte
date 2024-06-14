<script lang="ts">
  import Dice from './lib/Dice.svelte';
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
    <div class="setting">
      <button on:click={() => reloadGame()}>Recharger le jeu</button>
    </div>
    <div class="regle">télécharge le plateau de jeu <a href="/home/codespace/trivial-pursuit-interface/public/Trivial-Pursuit-plateau-couleurs.png" download="Trivial-Pursuit-plateau-couleurs.png">ICI</a> !
    <br>retrouve les règles <a href="/mnt/data/Trivial Pursuit pédagogique.pdf" download="Trivial_Pursuit_pédagogique.pdf">ici</a></div>
    <div>
      <Dice />
    </div>
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

    & > li {
      margin: 16px;
    }
  }

  div.setting {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
