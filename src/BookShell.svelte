<div class="book" transition:fly="{{y: -100, duration: 600}}">
    <div class="border">
        <slot name="content"/>
    </div>
    <div class="buttons">
        <slot name="buttons"/>
    </div>
</div>

<script>
    import {fly} from "svelte/transition";
</script>

<style>

    .border {
        background: indigo;
        border: 3px solid white;
        border-radius: 1rem;
        box-shadow: 10px 10px black;
        margin-bottom: 3rem;
        padding: 3rem;
        width: 80%;
    }

    .book {
        display:flex;
        justify-content: space-between;
    }

</style>