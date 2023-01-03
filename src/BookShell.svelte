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
        display: flex;
        justify-content: space-between;
        min-width: 0;
    }

    @media print {
        .border {
            border: none;
            box-shadow: none;
            padding: 0;
            width: 100%;
            margin-bottom: 0.5rem;
        }

    }

    @media (min-width: 481px) and (max-width: 1280px) {

    }

    @media (max-width: 480px) {
        .book {
            flex-direction: column;
            width: calc(100% - 2rem - 10px);
        }
    }


</style>