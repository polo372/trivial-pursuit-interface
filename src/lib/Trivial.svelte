<script lang="ts">
  import Dice from "./Dice.svelte";
  import Question from "./Question.svelte";
  import CategoryCard from "./components/CategoryCard.svelte";
  import Card from "./components/Card.svelte";
  import Statistics from "./components/Statistics.svelte";
  import { initQuestions, reloadGame, getCategories } from "./question";
  import { gameStore } from '../stores/gameStore';
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  // Initialise les questions
  initQuestions();
  // Initialise les catégories
  const categoriesPromise = getCategories();

  // Sélection d'une catégorie de question
  let categorySelected: string | null = null;
  let showStats = false;

  function download(url: string, filename: string): void {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
</script>

{#await categoriesPromise then categories}
  {#if showStats}
    <Statistics on:close={() => showStats = false} />
  {:else if categorySelected}
    <div in:fade={{ duration: 300 }}>
      <Question
        category={categorySelected}
        on:newQuestion={() => (categorySelected = null)}
      />
    </div>
  {:else}
    <div class="game-container" in:fade={{ duration: 300 }}>
      <header class="game-header">
        <button class="back-btn" on:click={() => dispatch("reload")}>
          ← Retour
        </button>
        <h1 class="text-gradient">Plateau de Jeu</h1>
        <div class="actions">
          <button on:click={() => showStats = true} class="stats-btn">📊 Statistiques</button>
          <button on:click={() => reloadGame()}>Recharger le jeu</button>
        </div>
      </header>

      <div class="game-layout">
        <aside class="sidebar">
          <Card variant="glass" padding="md">
            <div class="dice-container">
              <h3>Lancez le dé</h3>
              <Dice />
            </div>
          </Card>

          <Card variant="glass" padding="md" className="resources-card">
            <h3>Ressources</h3>
            <div class="resources-list">
              <button on:click={() => download("./plateau.png", "plateau.png")}>
                📥 Plateau
              </button>
              <button on:click={() => download("./pions.jpg", "pions.jpg")}>
                📥 Pions
              </button>
              <a href="./regle.jpg" target="_blank" class="resource-link">
                📜 Règles du jeu
              </a>
              <a href="https://forms.gle/enz8CB7Qdb87GL377" target="_blank" class="resource-link">
                💡 Suggestions
              </a>
            </div>
          </Card>
        </aside>

        <main class="categories-grid">
          {#each categories as category, i}
            <div in:fly={{ y: 20, delay: i * 50 }}>
              <CategoryCard 
                {category} 
                onClick={() => {
                  gameStore.clearCurrentQuestion(); // Force clear to ensure new question fetch
                  categorySelected = category;
                }}
              />
            </div>
          {/each}
        </main>
      </div>
    </div>
  {/if}
{/await}

<style>
  .game-container {
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
  }

  .game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-xl);
    flex-wrap: wrap;
    gap: var(--spacing-md);
  }

  h1 {
    margin: 0;
    font-size: 2.5rem;
  }

  .actions {
    display: flex;
    gap: var(--spacing-sm);
  }

  .stats-btn {
    background: rgba(56, 189, 248, 0.2);
    border-color: rgba(56, 189, 248, 0.5);
    color: #7dd3fc;
  }

  .stats-btn:hover {
    background: rgba(56, 189, 248, 0.3);
  }

  .game-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: var(--spacing-xl);
    align-items: start;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    position: sticky;
    top: 2rem;
  }

  .dice-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
  }

  .resources-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .resources-list button, .resource-link {
    width: 100%;
    text-align: left;
    padding: var(--spacing-sm) var(--spacing-md);
    background: rgba(255,255,255,0.05);
    border-radius: 8px;
    border: 1px solid transparent;
    transition: all 0.2s;
    color: var(--color-text-primary);
    text-decoration: none;
    display: block;
    box-sizing: border-box;
  }

  .resources-list button:hover, .resource-link:hover {
    background: rgba(255,255,255,0.1);
    transform: translateX(5px);
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }

  h3 {
    margin-top: 0;
    color: var(--color-accent);
  }

  @media (max-width: 900px) {
    .game-layout {
      grid-template-columns: 1fr;
    }

    .sidebar {
      position: static;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .sidebar > :global(*) {
      flex: 1;
      min-width: 250px;
    }
  }

  @media (max-width: 600px) {
    .game-header {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
