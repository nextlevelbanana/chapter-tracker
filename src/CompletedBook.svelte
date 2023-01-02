<BookShell>
    <div slot="content">
      <h2><span class="title">{book?.title}</span> <span class="author">{book.author}</span></h2>
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

    .title {
        color: var(--white);
        font-size: 3rem;
        font-weight: 900;
        margin-top: 0;
        margin-bottom: 0.5rem;
    }
    
    .author {
        color: var(--white);
        font-style: italic;
        font-weight: 400;
    }

    h2 {
        margin-top: 0;
    }

    @media print {
        h2 {
            margin-top: 1.5rem;
        }
    }
  </style>