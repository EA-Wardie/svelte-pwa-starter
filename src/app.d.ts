import { Subscriber, Unsubscriber } from 'svelte/store';
import { Subscription } from 'dexie';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module 'dexie' {
	interface Observable<T> {
		subscribe(run: Subscriber<T>): Unsubscriber | Subscription;
	}
}

export {};
