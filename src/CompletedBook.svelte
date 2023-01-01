<BookShell>
    <div slot="content">
      <h2>{book?.title}, {book.author}</h2>
      <div class="completed-chapters">
        {#each book.chapters as chapter}
          <div>{chapter.date}</div>
        {/each}
      </div>
    </div>
    <div slot="buttons">
      <button on:click={deleteCompleted}>delete</button>
    </div>
  </BookShell>

  <script>
    export let book;
    import { createEventDispatcher } from 'svelte';
    import BookShell from "./BookShell.svelte";
    const dispatch = createEventDispatcher();

    const deleteCompleted = () => dispatch("deleteCompleted", {
        id: book.id
    });
  </script>

  <style>
    .completed-chapters {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        font-style: italic;
    }
  </style>