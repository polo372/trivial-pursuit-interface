<script lang="ts">
  import Study from "./lib/Study.svelte";
  import Trivial from "./lib/Trivial.svelte";

  let selectedChoice: undefined | "game" | "study";
</script>

<main>
  {#if selectedChoice === "study"}
    <Study />
  {:else if selectedChoice === "game"}
    <Trivial />
  {:else}
    <button on:click={() => (selectedChoice = "game")}>Jouer</button>
    <button on:click={() => (selectedChoice = "study")}>Réviser</button>
  {/if}
</main>

<style>
</style>
