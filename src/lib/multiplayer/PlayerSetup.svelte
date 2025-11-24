<script lang="ts">
  import { playerStore } from '../../stores/playerStore';
  import Card from '../components/Card.svelte';
  import { fade, slide } from 'svelte/transition';

  let newPlayerName = '';
  let selectedAvatar = '👨‍🚒';
  
  const avatars = ['👨‍🚒', '👩‍🚒', '🚒', '🚑', '🐕', '🔥', '🧯', '🚨'];
  const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  const addPlayer = () => {
    if (!newPlayerName.trim()) return;
    
    const color = colors[$playerStore.players.length % colors.length];
    playerStore.addPlayer(newPlayerName, color, selectedAvatar);
    newPlayerName = '';
    selectedAvatar = avatars[($playerStore.players.length) % avatars.length];
  };

  const removePlayer = (id: string) => {
    playerStore.removePlayer(id);
  };

  const startGame = () => {
    if ($playerStore.players.length >= 2) {
      playerStore.startGame();
    }
  };
</script>

<div class="setup-container" in:fade>
  <h2 class="text-gradient">Configuration de la partie</h2>
  
  <Card variant="glass" padding="lg">
    <div class="input-group">
      <div class="avatar-selector">
        {#each avatars as avatar}
          <button 
            class="avatar-btn {selectedAvatar === avatar ? 'selected' : ''}"
            on:click={() => selectedAvatar = avatar}
          >
            {avatar}
          </button>
        {/each}
      </div>
      
      <div class="name-input-row">
        <input 
          type="text" 
          bind:value={newPlayerName} 
          placeholder="Nom du joueur"
          on:keydown={(e) => e.key === 'Enter' && addPlayer()}
        />
        <button class="add-btn" on:click={addPlayer} disabled={!newPlayerName.trim()}>
          Ajouter
        </button>
      </div>
    </div>
  </Card>

  <div class="players-list">
    {#each $playerStore.players as player (player.id)}
      <div class="player-item" transition:slide|local>
        <Card variant="glass" padding="sm" className="player-card">
          <div class="player-info">
            <span class="avatar" style="background: {player.color}20">{player.avatar}</span>
            <span class="name">{player.name}</span>
          </div>
          <button class="remove-btn" on:click={() => removePlayer(player.id)}>×</button>
        </Card>
      </div>
    {/each}
  </div>

  <div class="actions">
    <button 
      class="start-btn" 
      disabled={$playerStore.players.length < 2}
      on:click={startGame}
    >
      Démarrer la partie ({$playerStore.players.length} joueurs)
    </button>
  </div>
</div>

<style>
  .setup-container {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .avatar-selector {
    display: flex;
    gap: var(--spacing-sm);
    overflow-x: auto;
    padding-bottom: var(--spacing-sm);
  }

  .avatar-btn {
    font-size: 1.5rem;
    padding: 0.5rem;
    background: rgba(255,255,255,0.05);
    border-radius: 50%;
    border: 2px solid transparent;
    transition: all 0.2s;
  }

  .avatar-btn.selected {
    background: rgba(255,255,255,0.1);
    border-color: var(--color-accent);
    transform: scale(1.1);
  }

  .name-input-row {
    display: flex;
    gap: var(--spacing-md);
  }

  input {
    flex: 1;
    padding: 0.8em 1.2em;
    border-radius: 12px;
    border: 1px solid var(--glass-border);
    background: rgba(0,0,0,0.2);
    color: white;
    font-size: 1rem;
  }

  input:focus {
    outline: 2px solid var(--color-accent);
    border-color: transparent;
  }

  .add-btn {
    background: var(--color-accent);
    color: #0f172a;
    border: none;
  }

  .add-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .players-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .player-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    width: 100%;
  }

  .avatar {
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .name {
    font-weight: 600;
    font-size: 1.1rem;
  }

  .remove-btn {
    padding: 0.2em 0.6em;
    background: transparent;
    color: #ef4444;
    font-size: 1.5rem;
    line-height: 1;
  }

  .remove-btn:hover {
    background: rgba(239, 68, 68, 0.1);
  }

  .start-btn {
    width: 100%;
    padding: 1em;
    font-size: 1.2rem;
    background: linear-gradient(135deg, var(--color-accent), #3b82f6);
    color: white;
    border: none;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  .start-btn:disabled {
    background: #475569;
    box-shadow: none;
    cursor: not-allowed;
  }
</style>
