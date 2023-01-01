<script>
    import Book from './Book.svelte';
    import AddBook from './AddBook.svelte';
    import {books, completedBooks} from "./store.js";
    import JSConfetti from 'js-confetti';
    import Header from './Header.svelte';
    import Footer from './Footer.svelte';
    import CompletedBook from './CompletedBook.svelte';
    import { BOOKS_KEY, COMPLETE_BOOKS_KEY } from './constants';

    const confetti = new JSConfetti()

    let showInProgress = true;
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
      books.set($books);
      let bookString = JSON.stringify($books);
      localStorage.setItem(BOOKS_KEY, bookString);
    }

    const saveAll = () => {
      saveBooks();
      saveCompletedBooks();
    }

    const saveCompletedBooks = () => {
      let bookString = JSON.stringify($completedBooks);
      localStorage.setItem(COMPLETE_BOOKS_KEY, bookString);
    }

    const save = (msg) => {
      const index = $books.findIndex(book => book.id == msg.detail.id);
      const updatedBook = {...$books[index], author: msg.detail.author, title: msg.detail.title};
      $books.splice(index, 1, updatedBook);
      saveBooks();

    }

    const deleteBook = (msg) => {
      const bookToDelete = $books.findIndex(book => book.id == msg.detail.id);
      $books.splice(bookToDelete,1);
      saveBooks();
    }

    const deleteCompleted = (msg) => {
      const bookToDelete = $completedBooks.findIndex(book => book.id == msg.detail.id);
      $completedBooks.splice(bookToDelete,1);
      completedBooks.set($completedBooks);
      saveCompletedBooks();
    }

    const completeBook = (msg) => {
      const completedBookIndex = $books.findIndex(book => book.id == msg.detail.id);
      const lastCompletedBook = $books.splice(completedBookIndex, 1);
      $completedBooks.push(lastCompletedBook);
      completedBooks.set($completedBooks.flat());
      saveBooks();
      saveCompletedBooks();
    }
</script>

<Header bind:showInProgress on:load={saveAll}/>

<main>
  {#if showInProgress}
  <h2>Add New</h2>
    <AddBook bind:newBook bind:lastID/>
    
    <h2>In Progress</h2>
    {#each $books as book}
      <Book data={book} confetti={confetti} on:message={saveBooks} on:deleteBook={deleteBook} on:saveBook={save} on:completeBook={completeBook}/>
    {/each}
  {:else}
  <h2>Completed</h2>
    {#each $completedBooks as book}
      <CompletedBook book={book} on:deleteCompleted={deleteCompleted}/>
    {/each}
  {/if}
</main>

<Footer/>

<style>
  h2 {
    color: var(--dark);
    margin-bottom: 1rem;
    font-weight: 300;
    font-style: italic; 
  }

  main {
    margin-top: 1rem;
  }
</style>