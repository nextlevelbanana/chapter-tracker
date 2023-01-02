<DropdownPane mq={mq}>
    <div><strong>Books in Progress: </strong> {inProgress}</div>
    <div><strong>Chapters Remaining: </strong> {chaptersNotRead}</div>
    <div><strong>Total Chapters Read: </strong>{chaptersRead}</div>
    <div><strong>Books Completed: </strong>{$completedBooks.length}</div>   
</DropdownPane>

<script>
    import DropdownPane from "./DropdownPane.svelte";
    import {books, completedBooks} from "./store.js";

    export let mq;

    $: inProgress = $books.length;
    $: chaptersRead = getNumberRead($books) + getNumberRead($completedBooks);
    $: chaptersNotRead = getNumberUnread($books);

    const getNumberRead = arr => {
        const sub = arr.reduce((total, book) => {
            if (!book.chapters) return;
            return total + book?.chapters.filter(c => c.complete).length;
        }, 0);
        return sub;
    }

    const getNumberUnread = books => {
        return books.reduce((total, book) => {
            if (!book.chapters) return;
            return total + book?.chapters.filter(c => !c.complete).length;
        }, 0);
    }
</script>