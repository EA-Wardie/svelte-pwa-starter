<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		NetworkStatus,
		getNetworkStatus,
		onNetworkStatusChanged,
	} from '$lib/network';
	import {
		NotificationPermissionStatus,
		promptForNotificationPermissions,
	} from '$lib/notifications';
	import { onMount } from 'svelte';

	let count: number = $state(0);
	let notificationPermission: NotificationPermissionStatus = $state(
		NotificationPermissionStatus.Default,
	);
	let networkStatus: NetworkStatus = $state(getNetworkStatus());

	onMount(async () => {
		promptForNotificationPermissions((permission) => {
			notificationPermission = permission;
		});

		onNetworkStatusChanged((status) => {
			networkStatus = status;
		});
	});

	const sendTestPushNotificationMessage = async (): Promise<void> => {
		if ('serviceWorker' in navigator) {
			const registration: ServiceWorkerRegistration =
				await navigator.serviceWorker.ready;

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
	<h1>Main Page</h1>
	<h2>
		<span>Network Status:</span>
		<span
			style="color: {networkStatus === NetworkStatus.Online
				? 'green'
				: 'orange'}">{networkStatus}</span
		>
	</h2>
	<h2>
		<span>Notification permissions are:</span>
		<span
			style="color: {notificationPermission ===
			NotificationPermissionStatus.Grandted
				? 'green'
				: 'orange'}">{notificationPermission}</span
		>
	</h2>
	<button onclick={() => count++}>Count {count}</button>
	<br />
	<br />
	<button
		disabled={notificationPermission !==
			NotificationPermissionStatus.Grandted}
		onclick={sendTestPushNotificationMessage}
	>
		Send Test Push Notification
	</button>
	<br />
	<br />
	<button onclick={() => goto('/child')}> Go To Child Page </button>
</section>

<style>
</style>
