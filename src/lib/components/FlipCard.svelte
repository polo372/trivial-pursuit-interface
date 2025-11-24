<script lang="ts">
  export let flipped = false;
</script>

<div class="flip-container" class:flipped>
  <div class="flipper">
    <div class="front glass-card">
      <slot name="front" />
    </div>
    <div class="back glass-card">
      <slot name="back" />
    </div>
  </div>
</div>

<style>
  .flip-container {
    perspective: 1000px;
    width: 100%;
    /* Remove fixed height constraints to allow growth */
  }

  .flipper {
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
    width: 100%;
    /* Use grid to stack faces while allowing content to dictate height */
    display: grid;
    grid-template-areas: "card";
  }

  .flipped .flipper {
    transform: rotateY(180deg);
  }

  .front, .back {
    grid-area: card; /* Stack them on top of each other */
    backface-visibility: hidden;
    /* position: relative;  <-- Default for grid items, allows height to grow */
    width: 100%;
    min-height: 300px; /* Minimum height for consistency */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: var(--spacing-xl);
    box-sizing: border-box;
  }

  .front {
    z-index: 2;
    transform: rotateY(0deg);
  }

  .back {
    transform: rotateY(180deg);
    background: rgba(30, 41, 59, 0.9); /* Slightly darker for answer side */
  }
</style>
