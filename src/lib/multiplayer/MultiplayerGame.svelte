<script lang="ts">
  import { playerStore } from '../../stores/playerStore';
  import PlayerSetup from './PlayerSetup.svelte';
  import PlayerTurn from './PlayerTurn.svelte';
  import Scoreboard from './Scoreboard.svelte';
  import VictoryScreen from './VictoryScreen.svelte';
  import Trivial from '../Trivial.svelte';
  import { fade } from 'svelte/transition';

  // We need to modify Trivial to accept an external "mode" or handle multiplayer logic
  // Or we can wrap Trivial and intercept events?
  // Actually, Trivial is the whole game board. 
  // In multiplayer, we want the board, but we also want the sidebar to show multiplayer info.
  // The easiest way is to pass a "multiplayer" prop to Trivial or use a slot.
  // But Trivial is built as a standalone page.
  
  // Let's reimplement a wrapper that uses Trivial components but adds the multiplayer UI.
  // OR, we can just use Trivial and inject the multiplayer UI via slots if we modify Trivial.
  
  // Better approach: Use Trivial as the base, but pass a prop `isMultiplayer={true}`
  // and handle the turn logic there.
  // But here we are in MultiplayerGame.svelte.
  
  // Let's make MultiplayerGame render Trivial, but with a different sidebar content.
  // We'll need to update Trivial.svelte to accept a slot for the sidebar or be more flexible.
  
  // For now, let's assume we can just render Trivial and overlay/inject things.
  // Actually, looking at Trivial.svelte, it has a sidebar.
  // Let's modify Trivial.svelte to accept a `multiplayer` prop.
  
  // Wait, I can't easily modify Trivial to be a child here if Trivial handles its own state too much.
  // But Trivial uses `question.ts` (and now `gameStore`).
  
  // Let's try to make MultiplayerGame use the components of Trivial (Dice, Question, CategoryCard) directly
  // to compose a custom layout for multiplayer.
  
  import Dice from '../Dice.svelte';
  import Question from '../Question.svelte';
  import CategoryCard from '../components/CategoryCard.svelte';
  import Card from '../components/Card.svelte';
  import { initQuestions, getCategories } from '../question';
  import { createEventDispatcher } from 'svelte';
  import { gameStore } from '../../stores/gameStore';

  const dispatch = createEventDispatcher();

  initQuestions();
  const categoriesPromise = getCategories();
  
  let categorySelected: string | null = null;

  function handleQuestionResult(correct: boolean) {
    if (correct) {
      const player = $playerStore.players[$playerStore.currentPlayerIndex];
      if (categorySelected) {
        playerStore.recordScore(player.id, categorySelected, 1);
      }
    }
    // Next turn regardless of result? Or keep turn if correct?
    // Standard rules: keep turn if correct.
    if (!correct) {
      playerStore.nextTurn();
    }
    categorySelected = null;
  }
</script>

<div class="multiplayer-container">
  {#if $playerStore.gameStatus === 'setup'}
    <div class="setup-wrapper">
      <button class="back-btn" on:click={() => dispatch('reload')}>← Retour au menu</button>
      <PlayerSetup />
    </div>
  {:else if $playerStore.gameStatus === 'playing'}
    {#await categoriesPromise then categories}
      {#if categorySelected}
        <div in:fade>
          <!-- We need to intercept the result from Question -->
          <!-- Question component handles its own state and statsStore. 
               We need it to notify us of the result for multiplayer score. -->
          <!-- I'll need to update Question.svelte to dispatch 'answer' event with correctness -->
          <Question
            category={categorySelected}
            on:newQuestion={() => {
              // This event is triggered when "Question suivante" is clicked
              // But we need to know if it was correct BEFORE this to update score.
              // Question.svelte updates statsStore internally.
              // We should probably listen to an event from Question.
              // I will update Question.svelte to dispatch 'result' event.
            }}
            on:result={(e) => handleQuestionResult(e.detail.correct)}
          />
        </div>
      {:else}
        <div class="game-board" in:fade>
          <header class="header">
             <button class="back-btn" on:click={() => {
               if(confirm('Quitter la partie en cours ?')) dispatch('reload');
             }}>← Quitter</button>
             <h1 class="text-gradient">Tour {Math.ceil($playerStore.turnCount / $playerStore.players.length)}</h1>
          </header>

          <div class="layout">
            <aside class="sidebar">
              <PlayerTurn />
              <Card variant="glass" padding="md">
                <div class="dice-container">
                  <h3>Lancez le dé</h3>
                  <Dice />
                </div>
              </Card>
              <Scoreboard />
            </aside>

            <main class="grid">
              {#each categories as category}
                <CategoryCard 
                  {category} 
                  onClick={() => (categorySelected = category)}
                />
              {/each}
            </main>
          </div>
        </div>
      {/if}
    {/await}
    
    <VictoryScreen />
  {/if}
</div>

<style>
  .multiplayer-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--spacing-md);
  }

  .setup-wrapper {
    max-width: 800px;
    margin: 0 auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
  }

  .layout {
    display: grid;
    grid-template-columns: 350px 1fr;
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

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }

  .dice-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 900px) {
    .layout {
      grid-template-columns: 1fr;
    }
    .sidebar {
      position: static;
    }
  }
</style>
