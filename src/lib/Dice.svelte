<script>
  let diceValue = 0;
  let rollingDice = "";

  function launchDice() {
    rollingDice = "rolling"; // Add a class to trigger the animation
    setTimeout(() => {
      diceValue = Math.ceil(Math.random() * 6); // Random dice value between 1 and 6
      rollingDice = ""; // Reset rolling animation
    }, 1000); // Simulate rolling time
  }
</script>

<button on:click={launchDice}>Lancer le dé</button>
<button type="button" on:click={launchDice} class={`dice ${rollingDice}`}>
  {#if diceValue !== 0}
    <div class={`face value-${diceValue}`}>
      {#each Array(diceValue).fill(0) as _, i (i)}
        <span class="dot"></span>
      {/each}
    </div>
  {/if}
</button>

<style>
  .dice {
    width: 100px;
    height: 100px;
    margin: 20px auto;
    position: relative;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #000;
    position: absolute;
  }
  .face.value-1 .dot:nth-child(1) {
    top: 40%;
    left: 40%;
  }

  .face.value-2 .dot:nth-child(1) {
    top: 10%;
    left: 10%;
  }
  .face.value-2 .dot:nth-child(2) {
    bottom: 10%;
    right: 10%;
  }

  .face.value-3 .dot:nth-child(1) {
    top: 10%;
    left: 10%;
  }
  .face.value-3 .dot:nth-child(2) {
    top: 40%;
    left: 40%;
  }
  .face.value-3 .dot:nth-child(3) {
    bottom: 10%;
    right: 10%;
  }

  .face.value-4 .dot:nth-child(1) {
    top: 10%;
    left: 10%;
  }
  .face.value-4 .dot:nth-child(2) {
    top: 10%;
    right: 10%;
  }
  .face.value-4 .dot:nth-child(3) {
    bottom: 10%;
    right: 10%;
  }
  .face.value-4 .dot:nth-child(4) {
    bottom: 10%;
    left: 10%;
  }

  .face.value-5 .dot:nth-child(1) {
    top: 10%;
    left: 10%;
  }
  .face.value-5 .dot:nth-child(2) {
    top: 10%;
    right: 10%;
  }
  .face.value-5 .dot:nth-child(3) {
    top: 40%;
    left: 40%;
  }
  .face.value-5 .dot:nth-child(4) {
    bottom: 10%;
    right: 10%;
  }
  .face.value-5 .dot:nth-child(5) {
    bottom: 10%;
    left: 10%;
  }

  .face.value-6 .dot:nth-child(1),
  .face.value-6 .dot:nth-child(2) {
    top: 10%;
  }
  .face.value-6 .dot:nth-child(5),
  .face.value-6 .dot:nth-child(6) {
    bottom: 10%;
  }
  .face.value-6 .dot:nth-child(3),
  .face.value-6 .dot:nth-child(4) {
    top: 40%;
  }
  .face.value-6 .dot:nth-child(odd) {
    left: 10%;
  }
  .face.value-6 .dot:nth-child(even) {
    right: 10%;
  }
</style>
