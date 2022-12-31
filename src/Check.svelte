<label>
    <span class="name">{getDisplayNumber()}</span>
    <input 
        type="checkbox" 
        bind:checked={chapter.complete}
        title={chapter.date ? chapter.date : "incomplete"}
        on:change={updateDate}
    />
</label>

<script>
    export let chapter;
    export let number;
    import { createEventDispatcher } from 'svelte';

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

    const updateDate = e => {
        if (e.target.checked) {
            chapter.date = new Date().toLocaleDateString();
            checkIfComplete();
        } else {
            chapter.date = null;
        }
        tellAppToSave();
    }

</script>

<style>
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
        opacity: 0.6;
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
    }

    input[type="checkbox"]:checked::before {
        transform: scale(1);
    }

</style>