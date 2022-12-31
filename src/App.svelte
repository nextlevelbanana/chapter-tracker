<script>
    import Book from './Book.svelte';
    import AddBook from './AddBook.svelte';
    import {books} from "./store.js";

    let newBook;
    let lastID = $books.length;

    $: {
      if (newBook) {
        books.set([newBook, ...$books]);
        saveBooks();
        newBook = null;
      }
    }

    const saveBooks = () => {
      let bookString = JSON.stringify($books);
      localStorage.setItem("nlb-chapter-tracker-books", bookString);
    }

    const save = (msg) => {
      const index = $books.findIndex(book => book.id == msg.detail.id);
      const updatedBook = {...$books[index], author: msg.detail.author, title: msg.detail.title};
      $books.splice(index, 1, updatedBook);
      books.set($books);
      saveBooks();

    }

    const deleteBook = (msg) => {
      const bookToDelete = $books.findIndex(book => book.id == msg.detail.id);
      $books.splice(bookToDelete,1);
      books.set($books);
      saveBooks();
    }
</script>

<main>
  <h1>Chapter Tracker</h1>
  <p>Books in progress: {$books.length}</p>

  <AddBook bind:newBook bind:lastID/>
  
  {#each $books as book}
    <Book data={book} on:message={saveBooks} on:deleteBook={deleteBook} on:saveBook={save}/>
  {/each}
</main>

<style>
  p {
    color: var(--dark);
    font-style: italic;
  }
</style>
