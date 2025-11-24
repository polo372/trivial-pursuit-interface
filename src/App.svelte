<script lang="ts">
  import Study from "./lib/Study.svelte";
  import Trivial from "./lib/Trivial.svelte";
  import MultiplayerGame from "./lib/multiplayer/MultiplayerGame.svelte";
  import Card from "./lib/components/Card.svelte";
  import InstallPrompt from "./lib/components/InstallPrompt.svelte";
  import { fade, fly } from 'svelte/transition';

  let selectedChoice: undefined | "game" | "study" | "multiplayer";

  const handleReload = () => {
    selectedChoice = undefined;
  };
</script>

<InstallPrompt />

<main class="container">
  {#if selectedChoice === "study"}
    <div in:fade={{ duration: 300 }}>
      <Study on:reload={handleReload} />
    </div>
  {:else if selectedChoice === "game"}
    <div in:fade={{ duration: 300 }}>
      <Trivial on:reload={handleReload} />
    </div>
  {:else if selectedChoice === "multiplayer"}
    <div in:fade={{ duration: 300 }}>
      <MultiplayerGame on:reload={handleReload} />
    </div>
  {:else}
    <div class="hero" in:fly={{ y: 20, duration: 500 }}>
      <h1 class="title text-gradient">Trivial Pursuit</h1>
      <p class="subtitle">Formation Sapeurs-Pompiers</p>
      
      <div class="cards-grid">
        <div 
          class="card-wrapper" 
          on:click={() => (selectedChoice = "game")}
          on:keydown={(e) => e.key === 'Enter' && (selectedChoice = "game")}
          role="button"
          tabindex="0"
        >
          <Card variant="glass" hover={true} padding="lg" className="menu-card">
            <div class="card-content">
              <span class="icon">🎲</span>
              <h2>Solo</h2>
              <p>Partie classique avec dé et plateau virtuel</p>
            </div>
          </Card>
        </div>

        <div 
          class="card-wrapper" 
          on:click={() => (selectedChoice = "multiplayer")}
          on:keydown={(e) => e.key === 'Enter' && (selectedChoice = "multiplayer")}
          role="button"
          tabindex="0"
        >
          <Card variant="glass" hover={true} padding="lg" className="menu-card">
            <div class="card-content">
              <span class="icon">👥</span>
              <h2>Multijoueur</h2>
              <p>Jouez à plusieurs sur le même appareil</p>
            </div>
          </Card>
        </div>

        <div 
          class="card-wrapper" 
          on:click={() => (selectedChoice = "study")}
          on:keydown={(e) => e.key === 'Enter' && (selectedChoice = "study")}
          role="button"
          tabindex="0"
        >
          <Card variant="glass" hover={true} padding="lg" className="menu-card">
            <div class="card-content">
              <span class="icon">📚</span>
              <h2>Réviser</h2>
              <p>Entraînez-vous sur des catégories spécifiques</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-md);
  }

  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    gap: var(--spacing-xl);
  }

  .title {
    font-size: 4rem;
    font-weight: 800;
    margin: 0;
    text-align: center;
    letter-spacing: -0.05em;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  }

  .subtitle {
    font-size: 1.5rem;
    color: var(--color-text-secondary);
    margin-top: -1rem;
    font-weight: 300;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-xl);
    width: 100%;
    max-width: 1000px;
  }

  .card-wrapper {
    cursor: pointer;
    height: 100%;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--spacing-md);
  }

  .icon {
    font-size: 4rem;
    margin-bottom: var(--spacing-sm);
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
  }

  h2 {
    margin: 0;
    font-size: 2rem;
    color: var(--color-text-primary);
  }

  p {
    margin: 0;
    color: var(--color-text-secondary);
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .title {
      font-size: 3rem;
    }
    
    .cards-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
