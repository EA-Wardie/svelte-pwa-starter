import { onNavigate } from '$app/navigation';
import { createContext } from 'svelte';

export const [getNavigationContext, setNavigationContext] =
	createContext<Navigation>();

export class Navigation {
	constructor() {
		onNavigate((navigation) => {
			if (!document.startViewTransition) {
				return;
			}

			return new Promise((resolve) => {
				document.startViewTransition(async () => {
					resolve();

					await navigation.complete;
				});
			});
		});
	}

	public static init() {
		setNavigationContext(new Navigation());
	}
}
