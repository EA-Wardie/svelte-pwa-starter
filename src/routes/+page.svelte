<script lang="ts">
	import '@khmyznikov/pwa-install';
	import type { PWAInstallElement } from '@khmyznikov/pwa-install';
	import { onMount } from 'svelte';

	let count: number = $state(0);
	let notificationPermission: NotificationPermission = $state('default');
	let networkStatus: 'online' | 'offline' = $state('online');
	let pwaInstallComponent: PWAInstallElement;

	const promptForNotificationPermissions = async () => {
		notificationPermission = await Notification.requestPermission();
	};

	onMount(async () => {
		await promptForNotificationPermissions();

		addEventListener('online', () => {
			networkStatus = 'online';
		});

		addEventListener('offline', () => {
			networkStatus = 'offline';
		});

		if (pwaInstallComponent && typeof pwaInstallComponent.showDialog === 'function') {
      		pwaInstallComponent.showDialog(true);
		}
	});

	const sendTestPushNotificationMessage = async (): Promise<void> => {
		if ('serviceWorker' in navigator) {
			const registration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;

			await registration.showNotification('PWA Starter', {
				body: 'This is a test push notification.',
				badge: '/icons/pwa-192x192.png',
				icon: '/icons/pwa-192x192.png',
				requireInteraction: true,
			});
		}
	};
</script>

<section>
	<h1>{count}</h1>
	<button onclick={() => count++}>Add Count</button>
	<h3>
		<span>Network Status:</span>
		<span style="color: {networkStatus === 'online' ? 'green' : 'orange'}">{networkStatus}</span>
	</h3>
	<h3>
		<span>Notification permissions are:</span>
		<span style="color: {notificationPermission === 'granted' ? 'green' : 'orange'}">{notificationPermission}</span>
	</h3>
	<button
		disabled="{notificationPermission !== 'granted'}"
		onclick={sendTestPushNotificationMessage}>
		Send Test Push Notification
	</button>
</section>

<pwa-install bind:this={pwaInstallComponent}></pwa-install>

<style>

</style>
