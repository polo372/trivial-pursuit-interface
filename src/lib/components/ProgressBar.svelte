<script lang="ts">
  export let value: number; // 0 to 100
  export let color: string = 'var(--color-accent)';
  export let height: string = '8px';
</script>

<div class="progress-container" style="height: {height}">
  <div 
    class="progress-bar" 
    style="width: {value}%; background: {color}"
  ></div>
</div>

<style>
  .progress-container {
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    border-radius: 999px;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
  }
</style>
