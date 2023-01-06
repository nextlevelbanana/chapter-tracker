<label>
    <span class="name">{getDisplayNumber()}</span>
    <input 
        type="checkbox" 
        bind:checked={chapter.complete}
        title={chapter.date}
        disabled={isEditing} 
        on:change={(e) => {
            if (chapter.complete) {
                chapter.date = new Date().toISOString().split("T")[0];
                showOnlyThisEditPane = true;
            } else {
                chapter.date = null;
            }
        }}
    />
    {#if (isEditing || showOnlyThisEditPane) && chapter.complete}
        <div class="edit-date">
            <input 
                on:focus={() => isFocused = true}
                on:focusout={() => isFocused = false}
                class:onTop={isFocused} 
                type="text" 
                placeholder="yyyy-mm-dd" 
                bind:value={chapter.date} 
                bind:this={dateInputElement} 
                />
            {#if showDateError}
                enter date as YYYY-MM-DD
            {/if}
            {#if showOnlyThisEditPane}
            <button class="ok" on:click={() => showOnlyThisEditPane = false}>OK</button>
            {/if}
        </div>
    {/if}
</label>


<script>
    export let chapter;
    export let number;
    export let isEditing;
    let showOnlyThisEditPane = false;
    let dateInputElement;
    let showDateError = false;
    let isFocused = false;
    import { createEventDispatcher } from 'svelte';

    $: {
        if (!isEditing) {
            tellAppToSave();
        }
    }
    
    $: {
        if (!showOnlyThisEditPane) {
            tellAppToSave();
            checkIfComplete();
        }
    }

    const getDisplayNumber = () => {
        if (number !== 1 && number % 5 !== 0) {
            return "";
        } else {
            if (number < 10) {
                return `0${number}`;
            } else {
                return number;
            }
        }
    }
	const dispatch = createEventDispatcher();

	function tellAppToSave() {
		dispatch('message', {
			text: 'this is probably not the best way to do this!'
		});
	}

    const checkIfComplete = () => {
        dispatch('chapterFinished')
    }
</script>

<style>
    input[type="text"] {
        position:absolute;
        top: -3.45rem;
        left: -6.75rem;
        width: 7rem;
    }
    input[type="checkbox"] {
        /* Add if not using autoprefixer */
        -webkit-appearance: none;
        appearance: none;
        /* For iOS < 15 to remove gradient background */
        background-color: rgba(0,0,0,0.6);
        /* Not removed via appearance */
        margin: 0;
        font: inherit;
        color: currentColor;
        width: 2.25rem;
        height: 2.25rem;
        border: 2px solid white;
        border-radius: 0.15em;
        box-shadow: 2px 2px indigo;
        display: grid;
        place-content: center;
        grid-column-start: 1;
        grid-row-start: 1;
        justify-self: center;
    }

    input[type="checkbox"]:checked {
        background-color: var(--blue);
        opacity: 0.8;
    }

    .name {
        grid-column-start: 1;
        grid-row-start: 1;
        justify-self: center;
        font-size: 4.5rem;
        font-family: 'Roboto Slab', serif;
        transform: translate(-1.5rem);
        opacity: 0.5;
    }

    input[type="checkbox"]::before {
        content: "";
        width: 1.25rem;
        height: 1.25rem;
        transform: scale(0);
        transition: 100ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--black);
        transform-origin: bottom left;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }

    label {
        display: grid;
        grid-template-columns: 2.25rem;
        font-size: 3rem;
        justify-items: center;
        width: 2.25rem;
        height: 4.5rem;
        position: relative;
        margin-right: calc(max(3rem,12.5%) - 2.25rem);
    }

    input[type="checkbox"]:checked::before {
        transform: scale(1);
    }

    .ok {
        position: absolute;
        top: -5.5rem;
        left: -0.25rem;
        padding: 1.25rem;
        width: min-content;
        z-index: 10;
        box-shadow: 2px 2px 2px var(--light);
    }

    .onTop {
        z-index: 10;
    }

    @media (max-width: 480px) {
        label {
            margin-right: 3rem;
        }

        .name {
            font-size: 3.5rem;
        }
    }

    @media (min-width: 480px) and (max-width: 1280px) {
        label {
            margin-right: 3.5rem;
        }

        .name {
            font-size: 4rem;
        }
    }

    @media print {
        input[type="checkbox"] {
            width: 1rem;
            height: 1rem;
        }

        label {
            height: 3rem;
            width: max(3rem,10%);
        }

        .name {
            font-size: 1.5rem;
        }
    }
</style>