<script lang="ts">
  import Question from "./Question.svelte";
  import CategoryCard from "./components/CategoryCard.svelte";
  import { initQuestions, getCategories } from "./question";
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from 'svelte/transition';

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
    <div in:fade={{ duration: 300 }}>
      <Question
        category={categorySelected}
        continueAfterAnswer={true}
        on:changeCategory={() => (categorySelected = null)}
      />
    </div>
  {:else}
    <div class="study-container" in:fade={{ duration: 300 }}>
      <header class="study-header">
        <button class="back-btn" on:click={() => dispatch("reload")}>
          ← Retour
        </button>
        <h1 class="text-gradient">Mode Révision</h1>
        <a href="https://forms.gle/enz8CB7Qdb87GL377" target="_blank" class="feedback-btn">
          💡 Suggestions
        </a>
      </header>

      <p class="instruction">Choisissez une catégorie pour commencer à réviser</p>

      <main class="categories-grid">
        {#each categories as category, i}
          <div in:fly={{ y: 20, delay: i * 50 }}>
            <CategoryCard 
              {category} 
              onClick={() => (categorySelected = category)}
            />
          </div>
        {/each}
      </main>
    </div>
  {/if}
{/await}

<style>
  .study-container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .study-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
    flex-wrap: wrap;
    gap: var(--spacing-md);
  }

  h1 {
    margin: 0;
    font-size: 2.5rem;
  }

  .instruction {
    text-align: center;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xl);
    font-size: 1.2rem;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-lg);
  }

  .feedback-btn {
    padding: 0.8em 1.5em;
    background: rgba(255,255,255,0.1);
    border-radius: 12px;
    color: var(--color-text-primary);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s;
  }

  .feedback-btn:hover {
    background: rgba(255,255,255,0.2);
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    .study-header {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
