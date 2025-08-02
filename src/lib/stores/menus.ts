import { writable } from "svelte/store";

export const isCircleMenuOpen = writable(true);

export const toggleCircleMenu = () => {
	isCircleMenuOpen.update((v) => !v);
};

export const closeCircleMenu = () => {
	isCircleMenuOpen.set(false);
};
