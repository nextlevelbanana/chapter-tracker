<DropdownPane mq={mq}>
    <input
        accept="application/json"
        id="newData"
        name="newData"
        type="file"
        bind:files
    />
    <div>
        <button class="upload-button" on:click={() => {files = null; showUploadDialog = false;}}>cancel</button>
        {#if files}
            <button class="upload-button" on:click={load}>load</button>
        {/if}
    </div>
</DropdownPane>

<script>
    import { createEventDispatcher } from 'svelte';
    import {books, completedBooks} from "./store.js";
    import DropdownPane from "./DropdownPane.svelte";
    export let mq;
    export let showUploadDialog;
    let files;

    const dispatch = createEventDispatcher(); 

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
</script>

<style>
    .upload-button {
        display: inline-block;
        margin: 1rem 1rem 0;   
        padding: 0.5rem;
        text-align: center;
    }
</style>