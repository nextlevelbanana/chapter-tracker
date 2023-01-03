<script>
    import BookShell from "./BookShell.svelte";

    let title = "";
    let author = "";
    let number = 0;
    let hasTitleError = false;
    let hasNumError = false;

    export let lastID;
    export let newBook;

    const save = () => {
        if (!title.trim()) {
            hasTitleError = true;
        }
        if (number < 1) {
            hasNumError = true;
        }

      if (!hasTitleError && !hasNumError) {
        const chapters = [];
        for (let i = 0; i < number; i++) {
            chapters.push({complete: false, date: null});
        }
        lastID++;
        newBook = {id: lastID, title, author, number, chapters};
        title = "";
        author = "";
        number = 0;
      }
    }

    const clearTitle = () => hasTitleError = false;  
    const clearNum = () => hasNumError = false;  

</script>

<div class="nonprinting">
    <h2>Add New</h2>
    <BookShell>
        <div slot="content">
            <label class:error-text={hasTitleError}> Title*
                {#if hasTitleError}
                (required)
                {/if}
                <input class:shake={hasTitleError} on:focus={clearTitle} type="text" bind:value={title}/>
            
            </label>

            <label>Author
                <input type="text" bind:value={author}/>
            </label>

            
            <label class:error-text={hasNumError}>Number of Sections
                {#if hasNumError}
                (needs at least 1 section)
                {/if}
                <input class:shake={hasNumError} on:focus={clearNum} type="number" min="1" bind:value={number}/>
            </label>
        </div>
        <div slot="buttons">
            <button on:click={save}>add</button>
        </div>
    </BookShell>
</div>  

<style>
    input[type="number"] {
        width: 5rem;
    }

    label {
        font-weight: 400;
        margin-right: 1rem;
        width: 50%;
    }

    @media (max-width: 480px) {
        label {
            display: block;
            width: max(15rem, 80%);
        }

        button {
            margin-left: calc(100% - 4.5rem);
        }
    }

    @media (min-width: 481px) and (max-width: 1280px) {
        label {
            display: block;
            width: 100%;
        }

        input[type="text"] {
            width: 100%;
        }

        input[type="number"] {
            display: block;
        }

    }

</style>