<script lang="ts">
  export let type: string;
  
  const badges: Record<string, { icon: string, label: string, color: string }> = {
    'ON_FIRE': { icon: '🔥', label: 'En Feu !', color: '#f59e0b' },
    'VETERAN': { icon: '🎓', label: 'Vétéran', color: '#3b82f6' },
    'MASTER': { icon: '👑', label: 'Maître', color: '#eab308' },
    'SPEEDSTER': { icon: '⚡', label: 'Rapide', color: '#ef4444' }
  };

  $: badge = badges[type] || { icon: '🏆', label: 'Badge', color: '#64748b' };
</script>

<div class="badge" style="border-color: {badge.color}; color: {badge.color}">
  <span class="icon">{badge.icon}</span>
  <span class="label">{badge.label}</span>
</div>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    border: 1px solid;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;
    background: rgba(0,0,0,0.2);
    backdrop-filter: blur(4px);
  }

  .icon {
    font-size: 1.1em;
  }
</style>
