<script lang="ts">
  import Study from "./lib/Study.svelte";
  import Trivial from "./lib/Trivial.svelte";

  let selectedChoice: undefined | "game" | "study";

  const handleReload = () => {
    selectedChoice = undefined;
  };
</script>

<main>
  {#if selectedChoice === "study"}
    <Study on:reload={handleReload} />
  {:else if selectedChoice === "game"}
    <Trivial on:reload={handleReload} />
  {:else}
    <button on:click={() => (selectedChoice = "game")}>Jouer</button>
    <button on:click={() => (selectedChoice = "study")}>Réviser</button>
  {/if}
</main>

<style>
</style>
