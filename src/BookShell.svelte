<div class="book">
    <div class="border">
        <slot name="content"/>
    </div>
    <div class="buttons">
        <slot name="buttons"/>
    </div>
</div>

<style>

    .border {
        background: indigo;
        border: 3px solid white;
        border-radius: 1rem;
        box-shadow: 10px 10px black;
        margin-top: 3rem;
        padding: 3rem;
        width: 80%;
    }

    .book {
        align-items: end;
        display:flex;
        justify-content: space-between;
    }

</style>