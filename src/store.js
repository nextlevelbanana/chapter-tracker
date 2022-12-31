import { writable } from 'svelte/store';

export const books = writable(JSON.parse(localStorage.getItem("nlb-chapter-tracker-books")) ?? []);