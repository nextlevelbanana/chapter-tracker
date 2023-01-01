import { writable } from 'svelte/store';

export const books = writable(JSON.parse(localStorage.getItem("nlb-chapter-tracker-books")) ?? []);
export const completedBooks = writable(JSON.parse(localStorage.getItem("nlb-chapter-tracker-books-complete")) ?? []);