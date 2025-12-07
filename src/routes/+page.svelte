<script lang="ts">
	import { onMount } from 'svelte';

	let count: number = $state(0);
	let notificationPermission: NotificationPermission = $state('default');

	const promptForNotificationPermissions = async () => {
		notificationPermission = await Notification.requestPermission();
	};

	onMount(async () => {
		await promptForNotificationPermissions();
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

<section style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
	<h1>{count}</h1>
	<button onclick={() => count++}>Add Count</button>
	<h3>Notifications are: {notificationPermission}</h3>
	<button disabled="{notificationPermission !== 'granted'}" onclick={sendTestPushNotificationMessage}>
		Send Test Push Notification
	</button>
</section>
