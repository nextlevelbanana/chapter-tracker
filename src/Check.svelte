<label>
    <span class="name">{getDisplayNumber()}</span>
    <input 
        type="checkbox" 
        bind:checked={chapter.complete}
        
        on:change={(e) => {
            if (chapter.complete) {
                chapter.date = new Date().toISOString().split("T")[0];
                showEditPane = true;
            }
        }}
        on:mouseenter={() => {
            if (chapter.complete) {
                showEditPane = true;
            }
        }} 
        on:mouseleave={() => {
            setTimeout(() => {if (!editDateHasFocus) showEditPane = false}, 2000)
            }}     
    />
    {#if showEditPane}
<div class="edit-date">
    <input type="text" placeholder="yyyy-mm-dd" bind:value={chapter.date} on:mouseenter={() => editDateHasFocus = true} bind:this={dateInputElement} on:blur={loseFocus} on:mouseleave={loseFocus}/>
    {#if showDateError}
        enter date as YYYY-MM-DD
    {/if}

</div>
{/if}
</label>


<script>
    export let chapter;
    export let number;
    let dateInputElement;
    let editDateHasFocus = false;
    let showDateError = false;
    import { createEventDispatcher } from 'svelte';
    let showEditPane = false;

    $: {
        if (!editDateHasFocus) {
            setTimeout(() => {
                showEditPane = false;
            }, 1000)
        }
    }

    $: {
        if (!showEditPane) {
            checkIfComplete();
            tellAppToSave();
        }
    }

    const loseFocus = () => {
        if (dateInputElement != document.activeElement) {
            editDateHasFocus = false;
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

    const updateDate = (e, date) => {
        if (e.target.checked) {
            chapter.date = date || new Date().toISOString().split("T")[0];
            checkIfComplete();
        } else {
            chapter.date = null;
        }
        tellAppToSave();
    }

</script>

<style>
    input[type="text"] {
        position:absolute;
        top: -3rem;
        left: -2.25rem;
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
        width: max(3rem,12.5%);
        height: 4.5rem;
        position: relative;
    }

    input[type="checkbox"]:checked::before {
        transform: scale(1);
    }

</style>