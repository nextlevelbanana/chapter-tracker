<header>
    <h1>Chapter Tracker</h1>
    <button class="dropdown-trigger" on:click={() => {showInProgress = !showInProgress; window.scrollTo(0,0) }}>view</button>
    <button class="dropdown-trigger" on:click={downloadJson}>save data</button>
    <button class="dropdown-trigger" on:click={loadFromJson}>load from JSON</button>
    <button class="dropdown-trigger" on:click={() => showStats = !showStats}>stats</button>

    {#if showStats}
    <div transition:slide="{{duration: 600}}" class="dropdown-pane">
        <div><strong>In Progress: </strong> {inProgress}</div>
        <div><strong>Total Chapters Read: </strong>{chaptersRead}</div>
        <div><strong>Books Completed: </strong>{$completedBooks.length}</div>   
    </div>
    {/if}

    {#if showUploadDialog}
    <div transition:slide="{{duration: 600}}" class="dropdown-pane">
        <input
            accept="application/json"
            id="newData"
            name="newData"
            type="file"
            bind:files
        />
        {#if files}
        <button on:click={load}>load it already</button>
        {/if}
    </div>
    {/if}
</header>

<script>
    import { createEventDispatcher } from 'svelte';

    export let showInProgress;
    let showStats = false;
    let showUploadDialog = false;
    let files;
    import {books, completedBooks} from "./store.js";
    const dispatch = createEventDispatcher();

    const getNumberRead = arr => {
        const sub = arr.reduce((total, book) => {
            if (!book.chapters) return;
            return total + book?.chapters.filter(c => c.complete).length;
        }, 0);
        return sub;
    }

    $: inProgress = $books.length;
    $: chaptersRead = getNumberRead($books) + getNumberRead($completedBooks);

    const load = () => {
        try {
            files[0].text().then(data => {
                let json = JSON.parse(data);
                books.set(json.books);
                completedBooks.set(json.completedBooks);
                showUploadDialog = false;
                dispatch("load");
            })
        } catch (err) {
            console.log(err)
        }
    }

    function slide(node, { duration }) {
		return {
			duration,
			css: t => {
				const step = `${8*t}rem`;

				return `
					height: ${step};
                    padding: ${t}rem 1rem;
                    overflow: hidden;
                    `
			}
		};
    }

    const downloadJson = () => {
        const data = {
            books: [...$books],
            completedBooks: [...$completedBooks]
        };

        let hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:attachment/text,' + encodeURI(JSON.stringify(data));
        hiddenElement.target = '_blank';
        hiddenElement.download = 'chapterTrackerData.json';
        hiddenElement.click();
    }

    const loadFromJson = () => {
        if (confirm("This will overwrite your current data. Are you sure?")) {
            showUploadDialog = true;
        }
    }
</script>

<style>
    header {
        background-color: var(--dark);
        border-bottom: 1px solid var(--white);
        display: flex;
        justify-content: space-between;
        height: 3rem;
        position: fixed;
        top: 0;
        width: 100vw;
        z-index: 3;
    }

    h1 {
        font-size: 2rem;
        line-height: 3rem;
        margin: 0 0 0 3rem;
    }

    .dropdown-trigger {
        background-color: var(--dark);
        border-radius: 0;
        box-shadow: none;
        border: 0;
        color: white;
        display: unset;
        font-weight: 400;
        height: calc(3rem - 2px);
        line-height: 3rem;
        padding: 0 1rem;
        margin: 0 2rem 0 0;
        width: unset;
    }

    .dropdown-trigger:hover {
        border: 0;
        box-shadow: none;
        filter: brightness(1.5);
        line-height: 3rem;
        margin: 0 2rem 0 0;
    }

    .dropdown-pane {
        position: absolute;
        top: calc(3rem + 1px);
        right: 2rem;
        height: 8rem;
        min-width: 18rem;

        background-color: var(--dark);
        color: var(--light);
        border: 2px solid var(--blue);
        border-radius: 0 0 0.5rem 0.5rem;
        box-shadow: 6px 6px var(--black);
        padding: 1rem;
    }
</style>