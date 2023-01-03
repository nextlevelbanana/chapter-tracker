<script>
    export let data;
    export let confetti;
    import Check from "./Check.svelte";
    import { createEventDispatcher } from 'svelte';
    import BookShell from "./BookShell.svelte";

    let isEditing = false;

    const dispatch = createEventDispatcher();

    const deleteBook = () => dispatch('deleteBook', {
        id: data.id
    });

    let newTitle = data?.title;
    let newAuthor = data?.author;
    let hasTitleError = false;

    const save = () => {
        if (!newTitle.trim()) {
            hasTitleError = true;
            return;
        }
        dispatch('saveBook', {
            id: data.id,
            title: newTitle,
            author: newAuthor
        });
        isEditing = false;
    }

    const cancel = () => {
        isEditing = false;
        hasTitleError = false;
        newTitle = data.title;
        newAuthor = data.author;
    }

    const checkIfComplete = () => {
        const isComplete = !data?.chapters.some(ch => !ch.complete);
        if (isComplete) {
            confetti.addConfetti({
                confettiNumber: 600
            }).then(dispatch('completeBook', {
                id: data.id
            }));
        }
    }

</script>

<BookShell>
    <div slot="content">
        <div class="header">
            {#if !isEditing}
                <div class="title">{data?.title}</div>
                <div class="author">{data?.author}</div>
            {:else}
                <label class="editing" class:error-text={hasTitleError} on:focus={() => hasTitleError = false}> Title* 
                    <input class:shake={hasTitleError} bind:value={newTitle}/>
                </label>
                <label class="editing"> Author
                    <input bind:value={newAuthor}/>
                </label>
            {/if}
        </div>
        <div class="chapter-section">
            {#each data?.chapters as chapter, index}
                <Check chapter={chapter} bind:isEditing={isEditing} number={index + 1} on:message on:chapterFinished={checkIfComplete}/>
            {/each}
        </div>
    </div>
    <div slot="buttons">
        {#if !isEditing}
            <button on:click={() => isEditing = true}>edit</button>
            <button on:click={deleteBook}>delete</button>
        {:else}
            <button on:click={save}>save</button>
            <button on:click={cancel}>cancel</button>
        {/if}
    </div>  
</BookShell>


<style>
    .title {
        font-size: 3rem;
        font-weight: 900;
        margin-top: 0;
        margin-bottom: 0.5rem;
        word-break: break-word;
    }
    
    .author {
        font-style: italic;
        font-weight: 400;
        word-break: break-word;
    }

    .header {
       margin-bottom: 2.5rem;
    }

    .chapter-section {
        display: inline-flex;
        flex-wrap: wrap;
        margin-left: 2.5rem;
        width: 100%;
    }

    label {
        margin-right: 1.5rem;
    }

    @media print {
        .title, .author {
            display: inline;
        }

        .header {
            margin-top: 1rem;
            margin-bottom: 0.5rem;
        }

        .chapter-section {
            margin-left: 0;
        }
    }

    @media (min-width: 481px) and (max-width: 1280px) {
        .editing {
            display: inline-block;
            max-width: 45%;
        }

        .editing input {
            max-width: 100%;
        }
    }

</style>

