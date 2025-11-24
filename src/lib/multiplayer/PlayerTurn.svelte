<script lang="ts">
  import { playerStore } from '../../stores/playerStore';
  import Card from '../components/Card.svelte';
  import { fly } from 'svelte/transition';

  $: currentPlayer = $playerStore.players[$playerStore.currentPlayerIndex];
</script>

{#if currentPlayer}
  {#key currentPlayer.id}
    <div class="turn-indicator" in:fly={{ y: -20, duration: 300 }}>
      <Card variant="glass" padding="md" className="turn-card">
        <div class="content">
          <div class="label">C'est au tour de</div>
          <div class="player-display">
            <div class="avatar-wrapper" style="border-color: {currentPlayer.color}">
              <span class="avatar">{currentPlayer.avatar}</span>
            </div>
            <div class="info">
              <h2 style="color: {currentPlayer.color}">{currentPlayer.name}</h2>
              <span class="score">Score: {currentPlayer.score} pts</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  {/key}
{/if}

<style>
  .turn-indicator {
    margin-bottom: var(--spacing-lg);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .label {
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 2px;
    color: var(--color-text-secondary);
  }

  .player-display {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .avatar-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.05);
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
  }

  .avatar {
    font-size: 2rem;
  }

  .info {
    display: flex;
    flex-direction: column;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  .score {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
  }
</style>
