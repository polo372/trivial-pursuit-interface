<script lang="ts">
  export let variant: 'glass' | 'solid' = 'glass';
  export let padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  export let hover: boolean = false;
  export let className: string = '';
</script>

<div 
  class="card {variant} padding-{padding} {className}"
  class:hover-effect={hover}
>
  <slot />
</div>

<style>
  .card {
    border-radius: 16px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .glass {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-backdrop);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
  }

  .solid {
    background: var(--color-bg-card);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .padding-none { padding: 0; }
  .padding-sm { padding: var(--spacing-sm); }
  .padding-md { padding: var(--spacing-md); }
  .padding-lg { padding: var(--spacing-lg); }

  .hover-effect:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .hover-effect::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.05),
      transparent
    );
    transition: 0.5s;
  }

  .hover-effect:hover::after {
    left: 100%;
  }
</style>
