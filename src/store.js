import { writable } from 'svelte/store';
import { BOOKS_KEY, COMPLETE_BOOKS_KEY } from './constants';

export const books = writable(JSON.parse(localStorage.getItem(BOOKS_KEY)) ?? []);
export const completedBooks = writable(JSON.parse(localStorage.getItem(COMPLETE_BOOKS_KEY)) ?? []);