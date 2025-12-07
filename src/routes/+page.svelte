<script lang="ts">
	import { onMount } from 'svelte';

	let count: number = $state(0);
	let notificationPermission: NotificationPermission = $state('default');
	let networkStatus: 'online' | 'offline' = $state('online');

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

<section class="container">
	<h1>{count}</h1>
	<button onclick={() => count++}>Add Count</button>
	<h3 style="margin-bottom: 0;">
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

<style>
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
