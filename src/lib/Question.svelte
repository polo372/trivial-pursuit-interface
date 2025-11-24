<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import FlipCard from "./components/FlipCard.svelte";
  import { fade } from 'svelte/transition';
  import confetti from 'canvas-confetti';
  import { gameStore } from '../stores/gameStore';
  import { statsStore } from '../stores/statsStore';

  const dispatch = createEventDispatcher();

  export let category: string;
  export let continueAfterAnswer = false;
  
  let showAnswer = false;
  let answered = false;

  // Subscribe to store to get current question
  $: {
    // Ensure we have a question for this category
    if (!$gameStore.currentQuestion || $gameStore.currentQuestion.category !== category) {
       gameStore.getQuestionByCategory(category);
    }
  }

  $: question = $gameStore.currentQuestion;

  const toggleAnswer = () => {
    showAnswer = !showAnswer;
  };

  const handleResult = (correct: boolean) => {
    if (answered) return;
    answered = true;
    
    statsStore.recordAnswer(category, correct);
    dispatch('result', { correct });

    if (correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Delay before next action or just let user click next
  };

  const nextQuestion = () => {
    showAnswer = false;
    answered = false;
    
    // Delay fetching/dispatching to allow the card to flip back visually
    setTimeout(() => {
      dispatch("newQuestion");
      
      if (continueAfterAnswer) {
        gameStore.getQuestionByCategory(category);
      }
    }, 600); // Match transition duration
  };

  export const changeCategory = () => {
    dispatch("changeCategory");
  };
</script>

<div class="question-container" in:fade>
  <header class="question-header">
    {#if !!continueAfterAnswer}
      <button on:click={changeCategory}>← Changer de catégorie</button>
    {/if}
    <span class="category-badge {category}">{category}</span>
  </header>

  {#if question}
    <div class="card-container">
      <FlipCard flipped={showAnswer}>
        <div slot="front" class="card-face">
          <div class="question-number">Question #{question.id}</div>
          <div class="question-content">
            {@html question.question}
          </div>
          <button class="reveal-btn" on:click={toggleAnswer}>
            Voir la réponse
          </button>
          
          <a
            href="mailto:plbd@laposte.net?subject=Retour question {question.id}&body=J'ai une suggestion de modification sur la question  > {question.question} :"
            class="suggestion-link"
            on:click|stopPropagation
          >
            Signaler une erreur
          </a>
        </div>

        <div slot="back" class="card-face answer-face">
          <div class="answer-label">Réponse</div>
          <div class="answer-content">
            {@html question.answer}
          </div>
          
          {#if !answered}
            <div class="feedback-actions">
              <p class="feedback-prompt">Avez-vous trouvé la bonne réponse ?</p>
              <div class="buttons-row">
                <button class="feedback-btn incorrect" on:click={() => handleResult(false)}>
                  ❌ Non
                </button>
                <button class="feedback-btn correct" on:click={() => handleResult(true)}>
                  ✅ Oui
                </button>
              </div>
            </div>
          {:else}
            <div class="actions" in:fade>
              <button class="action-btn secondary" on:click={() => {
                showAnswer = false;
                answered = false;
              }}>
                Revoir la question
              </button>
              <button class="action-btn primary" on:click={nextQuestion}>
                Question suivante →
              </button>
            </div>
          {/if}
        </div>
      </FlipCard>
    </div>
  {:else}
    <div class="empty-state">
      <p>Chargement ou plus de questions...</p>
      <button on:click={() => gameStore.getQuestionByCategory(category)}>Réessayer</button>
    </div>
  {/if}
</div>

<style>
  .question-container {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--spacing-md);
    width: 100%;
  }

  .question-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-xl);
  }

  .category-badge {
    padding: 0.5em 1em;
    border-radius: 20px;
    font-weight: bold;
    font-size: 0.9rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .card-container {
    margin: 0 auto;
    width: 100%;
  }

  .card-face {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    text-align: center;
    gap: var(--spacing-lg);
  }

  .question-number {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--color-accent);
    opacity: 0.8;
  }

  .question-content {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.4;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .answer-label {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #4ade80;
  }

  .answer-content {
    font-size: 1.25rem;
    line-height: 1.6;
    color: var(--color-text-primary);
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0 var(--spacing-sm);
  }

  .reveal-btn {
    background: var(--color-accent);
    color: #0f172a;
    border: none;
    padding: 1em 2em;
    font-size: 1.1rem;
    font-weight: bold;
    border-radius: 50px;
    box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);
  }

  .reveal-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(56, 189, 248, 0.4);
    background: #7dd3fc;
  }

  .feedback-prompt {
    margin-bottom: var(--spacing-md);
    color: var(--color-text-secondary);
  }

  .buttons-row {
    display: flex;
    gap: var(--spacing-md);
    justify-content: center;
  }

  .feedback-btn {
    padding: 0.8em 2em;
    border-radius: 12px;
    font-size: 1.1rem;
    border: 1px solid transparent;
  }

  .feedback-btn.correct {
    background: rgba(74, 222, 128, 0.2);
    color: #4ade80;
    border-color: rgba(74, 222, 128, 0.5);
  }

  .feedback-btn.incorrect {
    background: rgba(248, 113, 113, 0.2);
    color: #f87171;
    border-color: rgba(248, 113, 113, 0.5);
  }

  .feedback-btn:hover {
    transform: scale(1.05);
  }

  .actions {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
    justify-content: center;
  }

  .action-btn {
    padding: 0.8em 1.5em;
    border-radius: 12px;
    font-weight: 600;
  }

  .action-btn.primary {
    background: var(--color-accent);
    color: #0f172a;
    border: none;
  }

  .action-btn.secondary {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    color: white;
  }

  .suggestion-link {
    font-size: 0.8rem;
    color: var(--color-text-secondary);
    opacity: 0.6;
    margin-top: var(--spacing-sm);
  }

  .suggestion-link:hover {
    opacity: 1;
  }

  .empty-state {
    text-align: center;
    padding: var(--spacing-xl);
    background: var(--glass-bg);
    border-radius: 16px;
  }
</style>
