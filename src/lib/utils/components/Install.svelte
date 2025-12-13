<script lang="ts">
	import '@khmyznikov/pwa-install';
	import type { PWAInstallElement } from '@khmyznikov/pwa-install';
	import { onMount } from 'svelte';

	let pwaInstallComponent: PWAInstallElement | null = null;

	onMount(() => {
		if (
			pwaInstallComponent &&
			typeof pwaInstallComponent.showDialog === 'function'
		) {
			pwaInstallComponent.showDialog(true);
		}
	});
</script>

<pwa-install bind:this={pwaInstallComponent}></pwa-install>
