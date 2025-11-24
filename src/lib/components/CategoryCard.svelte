<script lang="ts">
  import Card from './Card.svelte';
  
  export let category: string;
  export let count: number | undefined = undefined;
  export let onClick: () => void;

  // Map categories to icons (using emojis for now, could be SVG later)
  const getIcon = (cat: string) => {
    if (cat.includes('SAP') || cat.includes('TOXICOLOGIE')) return '🚑';
    if (cat.includes('INC') || cat.includes('DETECTION')) return '🔥';
    if (cat.includes('CAD') || cat.includes('CHIMIE')) return '📚';
    if (cat.includes('PRV') || cat.includes('PROCEDURES')) return '📋';
    if (cat.includes('MATERIELS')) return '🚒';
    if (cat.includes('SR') || cat.includes('EPI')) return '🚧';
    return '🎲';
  };

  const icon = getIcon(category);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="category-card-wrapper" on:click={onClick}>
  <Card variant="glass" hover={true} padding="lg" className="category-card {category}">
    <div class="content">
      <div class="icon">{icon}</div>
      <h3 class="title">{category}</h3>
      {#if count !== undefined}
        <div class="count">{count} questions</div>
      {/if}
    </div>
  </Card>
</div>

<style>
  .category-card-wrapper {
    cursor: pointer;
    height: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
    text-align: center;
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: var(--spacing-xs);
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }

  .title {
    margin: 0;
    font-size: var(--font-size-lg);
    font-weight: 700;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    color: white;
  }

  .count {
    font-size: var(--font-size-sm);
    opacity: 0.9;
    color: white;
    background: rgba(0,0,0,0.2);
    padding: 2px 8px;
    border-radius: 10px;
  }

  /* Specific category styles override */
  :global(.category-card.SAP), :global(.category-card.TOXICOLOGIE) { background: var(--gradient-sap) !important; }
  :global(.category-card.INC), :global(.category-card.DETECTION) { background: var(--gradient-inc) !important; }
  :global(.category-card.CAD), :global(.category-card.CHIMIE) { background: var(--gradient-cad) !important; }
  :global(.category-card.PRV-COD), :global(.category-card.PROCEDURES) { background: var(--gradient-prv) !important; }
  :global(.category-card.PPABE-RTN), :global(.category-card.MATERIELS) { background: var(--gradient-mat) !important; }
  :global(.category-card.SR-FDF), :global(.category-card.EPI) { background: var(--gradient-sr) !important; }
  
  /* Text color adjustments for light backgrounds */
  :global(.category-card.PRV-COD .title), :global(.category-card.PROCEDURES .title),
  :global(.category-card.PRV-COD .count), :global(.category-card.PROCEDURES .count) { 
    color: #1a1a1a; 
  }
</style>
