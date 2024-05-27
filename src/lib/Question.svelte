<script lang="ts">
    import { getQuestionByCategory } from './question'
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    export let category: string;
    let question = getQuestionByCategory(category);
    let showAnswer = false;

    const getMewQuestion = () => {
        dispatch('newQuestion');
    }
</script>

<h3 class={category}>{category}</h3>
{#if question && !showAnswer}
    <div class="question">
        <h3>Question</h3>
        <p>{question.question}</p>
        <button on:click={() => showAnswer = true}>Afficher la réponse</button>
    </div>
{:else if question && showAnswer}
    <div class="answer">
        <h3>{question.question}</h3>
        <p>{question.answer}</p>
        <button on:click={() => getMewQuestion()}>Nouvelle question</button>
    </div>
{:else}
    <p>Plus de question pour cette catégorie</p>
    <button on:click={() => getMewQuestion()}>Nouvelle question</button>
{/if}
