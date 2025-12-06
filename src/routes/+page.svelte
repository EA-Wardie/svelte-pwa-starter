<script lang="ts">
	let count: number = $state(0);
	let notificationPermission: NotificationPermission = $state('default');
	let testPushNotificationHandled: boolean = $state(false);

	const addCount = (): void => {
		count++;
	};

	const promptForNotificationPermissions = (
		callback: (permission: NotificationPermission) => void,
	) => {
		Notification.requestPermission()
			.then((permission: NotificationPermission) => {
				callback(permission);
			})
			.catch((error: Error) => {
				console.error(error);
			});
	};

	promptForNotificationPermissions((permission: NotificationPermission) => {
		notificationPermission = permission;
	});

	const sendTestPushNotificationMessage = (): void => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.ready.then(
				(registration: ServiceWorkerRegistration) => {
					registration.active?.postMessage({
						type: 'SEND_TEST_PUSH_NOTIFICATION',
					});
				},
			);
		}
	};

	const listenForServiceWorkerMessages = (): void => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.addEventListener(
				'message',
				(event: MessageEvent) => {
					const type: string | null = event.data.type || null;

					testPushNotificationHandled =
						type === 'TEST_PUSH_NOTIFICATION_HANDLED';
				},
			);
		}
	};

	listenForServiceWorkerMessages();
</script>

<section
	style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;"
>
	<h1>
		{count}
	</h1>
	<button onclick={addCount}>Add Count</button>
	<h3>Notifications are: {notificationPermission}</h3>
	{#if notificationPermission === 'granted'}
		<button onclick={sendTestPushNotificationMessage}
		>Send Test Push Notification
		</button
		>
	{/if}
	{#if testPushNotificationHandled}
		<h3>Test push notification was handled!</h3>
	{/if}
</section>
