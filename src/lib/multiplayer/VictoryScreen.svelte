<script lang="ts">
  import { playerStore } from '../../stores/playerStore';
  import { onMount } from 'svelte';
  import confetti from 'canvas-confetti';
  import Card from '../components/Card.svelte';
  import { fade, scale } from 'svelte/transition';

  $: winner = $playerStore.winner;

  onMount(() => {
    if (winner) {
      const duration = 3000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: [winner.color, '#ffffff']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: [winner.color, '#ffffff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  });
</script>

{#if winner}
  <div class="victory-overlay" in:fade>
    <div class="victory-content" in:scale={{ start: 0.8, duration: 500 }}>
      <h1 class="text-gradient">Victoire !</h1>
      
      <div class="winner-display">
        <div class="avatar-ring" style="border-color: {winner.color}">
          <span class="avatar">{winner.avatar}</span>
        </div>
        <h2 style="color: {winner.color}">{winner.name}</h2>
        <p class="score-final">Score final : {winner.score} points</p>
      </div>

      <div class="actions">
        <button class="restart-btn" on:click={() => playerStore.resetGame()}>
          Nouvelle partie
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .victory-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(8px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .victory-content {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    padding: var(--spacing-2xl);
    border-radius: 24px;
    text-align: center;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    max-width: 500px;
    width: 90%;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: var(--spacing-xl);
  }

  .winner-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
  }

  .avatar-ring {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 6px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.1);
    box-shadow: 0 0 30px rgba(0,0,0,0.3);
  }

  .avatar {
    font-size: 4rem;
  }

  h2 {
    font-size: 2rem;
    margin: 0;
  }

  .score-final {
    font-size: 1.2rem;
    color: var(--color-text-secondary);
  }

  .restart-btn {
    background: var(--color-accent);
    color: #0f172a;
    font-size: 1.2rem;
    padding: 1em 2em;
    border: none;
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .restart-btn:hover {
    transform: scale(1.05);
  }
</style>
