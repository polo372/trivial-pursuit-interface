<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let deferredPrompt: any;
  let showInstallButton = false;

  onMount(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      showInstallButton = true;
    });

    window.addEventListener('appinstalled', () => {
      showInstallButton = false;
      deferredPrompt = null;
    });
  });

  async function installPWA() {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    deferredPrompt = null;
    showInstallButton = false;
  }
</script>

{#if showInstallButton}
  <button class="install-btn" on:click={installPWA} in:fade>
    📲 Installer l'application
  </button>
{/if}

<style>
  .install-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    background: var(--color-accent);
    color: #0f172a;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    border: none;
    font-weight: bold;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-10px);}
    60% {transform: translateY(-5px);}
  }
</style>
