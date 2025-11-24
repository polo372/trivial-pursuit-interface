<script lang="ts">
  import { statsStore } from '../../stores/statsStore';
  import Card from './Card.svelte';
  import ProgressBar from './ProgressBar.svelte';
  import Badge from './Badge.svelte';
  import { fade, fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  $: stats = $statsStore;
  $: successRate = stats.totalQuestions > 0 
    ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100) 
    : 0;

  const categories = [
    'SAP', 'TOXICOLOGIE', 'INC', 'DETECTION', 
    'CAD', 'CHIMIE', 'PRV-COD', 'PROCEDURES', 
    'PPABE-RTN', 'MATERIELS', 'SR-FDF', 'EPI'
  ];

  function getCategoryStats(cat: string) {
    const s = stats.categories[cat] || { answered: 0, correct: 0 };
    const rate = s.answered > 0 ? Math.round((s.correct / s.answered) * 100) : 0;
    return { ...s, rate };
  }
</script>

<div class="stats-container" in:fade>
  <header class="header">
    <button class="back-btn" on:click={() => dispatch('close')}>← Retour</button>
    <h2 class="text-gradient">Vos Statistiques</h2>
    <div class="spacer"></div>
  </header>

  <div class="overview-grid">
    <Card variant="glass" padding="lg">
      <div class="stat-item">
        <span class="label">Total Questions</span>
        <span class="value">{stats.totalQuestions}</span>
      </div>
    </Card>
    
    <Card variant="glass" padding="lg">
      <div class="stat-item">
        <span class="label">Taux de réussite</span>
        <span class="value {successRate >= 70 ? 'good' : successRate >= 40 ? 'medium' : 'bad'}">
          {successRate}%
        </span>
      </div>
    </Card>

    <Card variant="glass" padding="lg">
      <div class="stat-item">
        <span class="label">Série actuelle</span>
        <span class="value fire">{stats.streak} 🔥</span>
      </div>
    </Card>
  </div>

  {#if stats.achievements.length > 0}
    <div class="achievements-section" in:fly={{ y: 20, delay: 200 }}>
      <h3>Badges débloqués</h3>
      <div class="badges-list">
        {#each stats.achievements as badge}
          <Badge type={badge} />
        {/each}
      </div>
    </div>
  {/if}

  <div class="categories-section" in:fly={{ y: 20, delay: 400 }}>
    <h3>Performance par catégorie</h3>
    <div class="categories-grid">
      {#each categories as cat}
        {@const catStat = getCategoryStats(cat)}
        <div class="category-stat">
          <div class="cat-header">
            <span class="cat-name">{cat}</span>
            <span class="cat-score">{catStat.correct}/{catStat.answered}</span>
          </div>
          <ProgressBar value={catStat.rate} color="var(--color-accent)" />
        </div>
      {/each}
    </div>
  </div>

  <div class="actions">
    <button class="reset-btn" on:click={() => {
      if(confirm('Voulez-vous vraiment réinitialiser toutes vos statistiques ?')) {
        statsStore.resetStats();
      }
    }}>
      Réinitialiser les statistiques
    </button>
  </div>
</div>

<style>
  .stats-container {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--spacing-md);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-xl);
  }

  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .label {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .value {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--color-text-primary);
  }

  .value.good { color: #4ade80; }
  .value.medium { color: #facc15; }
  .value.bad { color: #f87171; }
  .value.fire { color: #fb923c; }

  .achievements-section {
    margin-bottom: var(--spacing-xl);
  }

  .badges-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-lg);
  }

  .category-stat {
    background: rgba(255,255,255,0.05);
    padding: var(--spacing-md);
    border-radius: 12px;
  }

  .cat-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-sm);
    font-size: 0.9rem;
    font-weight: 600;
  }

  .actions {
    margin-top: var(--spacing-xl);
    text-align: center;
  }

  .reset-btn {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.5);
    color: #fca5a5;
  }

  .reset-btn:hover {
    background: rgba(239, 68, 68, 0.3);
  }
</style>
