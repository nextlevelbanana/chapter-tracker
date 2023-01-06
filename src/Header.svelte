<!-- svelte-ignore a11y-click-events-have-key-events -->
<header on:click|self={closeAllDropdowns}>
    <MediaQuery query={MONITOR} let:matches>
        {#if matches}
            <h1>Chunk A Book</h1>
            <button class="dropdown-trigger" on:click={toggleView}>view</button>
            <button class="dropdown-trigger" on:click={downloadJson}>save data</button>
            <div class="dropdown-container">
                <button class="dropdown-trigger" on:click={loadFromJson}>load from JSON</button>
                {#if showUploadDialog}
                    <UploadDialog mq="monitor" bind:showUploadDialog />
                {/if}
            </div>
            <button class="dropdown-trigger" on:click={clearAllData}>nuke data</button>
            <button class="dropdown-trigger" on:click={() => showStats = !showStats}>stats</button>
            <button class="dropdown-trigger" on:click={() => showFAQ = !showFAQ}>FAQ</button>
        {#if showStats}
            <StatsPane mq="monitor"/>
        {/if}
    {/if}
    </MediaQuery>

    <MediaQuery query={TABLET} let:matches>
        {#if matches}
            <h1 class="tablet">Chunk A Book</h1>
            <button class="dropdown-trigger" on:click={toggleView}>view</button>
            <button class="dropdown-trigger" on:click={downloadJson}>save</button>
            <div class="dropdown-container">
                <button class="dropdown-trigger" on:click={loadFromJson}>load</button>
                {#if showUploadDialog}
                    <UploadDialog mq="tablet" bind:showUploadDialog />
                {/if}
            </div>
            <button class="dropdown-trigger" on:click={clearAllData}>nuke</button>
            <div>
                <button class="dropdown-trigger" on:click={() => showStats = !showStats}>stats</button>
                {#if showStats}
                    <StatsPane mq="tablet"/>
                {/if}
            </div>
            <button class="dropdown-trigger" on:click={() => showFAQ = !showFAQ}>FAQ</button>

        {/if}
    </MediaQuery>

    <MediaQuery query={PHONE} let:matches>
        {#if matches}
            <button class="phone dropdown-trigger" on:click={() => {showMobileMenu = !showMobileMenu; showStats = false; showUploadDialog = false;}}>🍔</button>
            {#if showMobileMenu}
                <DropdownPane mq="phone">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <ul>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <li on:click={toggleView}>view {showInProgress ? "completed" : "in progress"} books</li>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <li on:click={downloadJson}>save data</li>
                        <li on:click={loadFromJson}>load from JSON</li>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <li on:click={clearAllData}>nuke data</li>
                        <li on:click={toggleStats}>see stats</li>
                        <li on:click={() => showFAQ = !showFAQ}>FAQ</li>

                    </ul>
                </DropdownPane>
            {/if}
            {#if showUploadDialog}
                <UploadDialog mq="phone" bind:showUploadDialog />
            {/if}
            {#if showStats}
                <StatsPane mq="phone"/>
            {/if}
        {/if}
    </MediaQuery>
</header>

<script>
    import MediaQuery from "svelte-media-query";
    import { BOOKS_KEY, COMPLETE_BOOKS_KEY, MONITOR, NOTPHONE, PHONE, TABLET } from './constants.js';
    import DropdownPane from "./DropdownPane.svelte";
    import StatsPane from "./StatsPane.svelte";
    import UploadDialog from "./UploadDialog.svelte";

    export let showInProgress;
    let showStats = false;
    let showUploadDialog = false;
    let showMobileMenu = false;
    export let showFAQ;
    import {books, completedBooks} from "./store.js";

    const toggleStats = () => {
        showStats = !showStats;
        showMobileMenu = false;
    }

    const toggleView = () => {
        if (showFAQ) {
            showFAQ = false;
        } else {
            showInProgress = !showInProgress; 
        }
        window.scrollTo(0,0);
        closeAllDropdowns();
    }

    const clearAllData = () => {
        showMobileMenu = false;
        if (confirm("This will erase all your data. There is no undo. Are you sure you want to?")) {
            localStorage.removeItem(BOOKS_KEY);
            localStorage.removeItem(COMPLETE_BOOKS_KEY);
            books.set([]);
            completedBooks.set([]);
        }
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
        if (showUploadDialog) {
            showUploadDialog = false;
            return;
        }
        if (confirm("This will overwrite your current data. Are you sure?")) {
            showMobileMenu = false;
            showUploadDialog = true;
        }
    }

    const closeAllDropdowns = () => {
        showMobileMenu = false;
        showStats = false;
        showUploadDialog = false;
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

    h1.tablet {
        margin-left: 1rem;
        margin-right: 2rem;
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
        position: relative;
    }

    .dropdown-container {
        position: relative;
    }

    .dropdown-trigger:hover {
        border: 0;
        box-shadow: none;
        filter: brightness(1.5);
        line-height: 3rem;
        margin: 0 2rem 0 0;
    }

    button.phone {
        margin: 0;
    }

    ul {
        list-style: none;
        margin-top: 0;
        padding-left: 1rem;
    }

    li {
        padding: 0.5rem 0;
    }

    li:not(:last-child) {
        border-bottom: 1px solid var(--light);
    }

    @media print {

        header {
            background-color: none;
        }

        h1 {
            display: none;
        }

        .dropdown-trigger {
            display: none;
        }
    }

</style>