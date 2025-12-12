<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import '@khmyznikov/pwa-install';
	import type { PWAInstallElement } from '@khmyznikov/pwa-install';
	import { onMount } from 'svelte';

	let { children } = $props();
	let pwaInstallComponent: PWAInstallElement;

	onMount(() => {
		if (
			pwaInstallComponent &&
			typeof pwaInstallComponent.showDialog === 'function'
		) {
			pwaInstallComponent.showDialog(true);
		}
	});

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
</script>

<main>
	{@render children()}
</main>

<pwa-install bind:this={pwaInstallComponent}></pwa-install>

<style>
</style>
