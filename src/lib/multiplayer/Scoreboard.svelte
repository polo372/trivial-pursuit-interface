<script lang="ts">
  import { playerStore } from '../../stores/playerStore';
  import Card from '../components/Card.svelte';
  import { flip } from 'svelte/animate';

  $: players = [...$playerStore.players].sort((a, b) => b.score - a.score);
</script>

<div class="scoreboard">
  <h3>Classement</h3>
  <div class="list">
    {#each players as player (player.id)}
      <div animate:flip={{ duration: 300 }}>
        <Card variant="glass" padding="sm" className="score-card {player.id === $playerStore.players[$playerStore.currentPlayerIndex].id ? 'active' : ''}">
          <div class="player-row">
            <div class="rank">
              <span class="avatar" style="background: {player.color}20">{player.avatar}</span>
            </div>
            <div class="details">
              <span class="name">{player.name}</span>
              <div class="categories-won">
                {#each player.categoriesWon as cat}
                  <span class="cat-dot {cat}" title={cat}></span>
                {/each}
              </div>
            </div>
            <div class="score">
              {player.score}
            </div>
          </div>
        </Card>
      </div>
    {/each}
  </div>
</div>

<style>
  .scoreboard {
    width: 100%;
  }

  h3 {
    margin-top: 0;
    margin-bottom: var(--spacing-md);
    font-size: 1.2rem;
    color: var(--color-text-secondary);
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .player-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }

  .details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .name {
    font-weight: 600;
    font-size: 0.9rem;
  }

  .categories-won {
    display: flex;
    gap: 4px;
    height: 6px;
  }

  .cat-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .score {
    font-weight: 800;
    font-size: 1.2rem;
    color: var(--color-accent);
  }

  :global(.score-card.active) {
    border-color: var(--color-accent);
    background: rgba(56, 189, 248, 0.1);
  }
</style>
