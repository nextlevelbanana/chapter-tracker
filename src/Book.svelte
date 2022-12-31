<script>
    export let data;
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

</script>

<BookShell>
    <div slot="content">
        <div class="header">
            {#if !isEditing}
                <div class="title">{data?.title}</div>
                <div class="author">{data?.author}</div>
            {:else}
                <label class:error-text={hasTitleError} on:focus={() => hasTitleError = false}> Title* 
                    <input class:shake={hasTitleError} bind:value={newTitle}/>
                </label>
                <label> Author
                    <input bind:value={newAuthor}/>
                </label>
            {/if}
        </div>
        <div class="chapter-section">
            {#each data?.chapters as chapter, index}
                <Check chapter={chapter} number={index + 1} on:message/>
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
        font-weight: bolder;
        margin-top: 0;
        margin-bottom: 0.5rem;
    }
    
    .author {
        font-style: italic;
        font-weight: lighter;
    }

    .header {
       margin-bottom: 2rem;
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

</style>

