<script lang="ts">
	import { Navigation } from '$lib/utils/Navigation.svelte';
	import { Network } from '$lib/utils/Network.svelte';
	import { Push } from '$lib/utils/Push.svelte';
	import { onMount } from 'svelte';
	import { toast, Toaster } from 'svelte-sonner';

	let { children } = $props();

	Navigation.init();
	Network.init();

	const push = Push.init();

	const promptForPushNotifications = (): void => {
		if (!Push.isDefault()) {
			return;
		}

		toast.info('Push Notifications', {
			description: 'Would you like to enable push notifications?',
			duration: Infinity,
			action: {
				label: 'Enable',
				onClick: () => {
					push.prompt();
				},
			},
		});
	};

	onMount(() => {
		promptForPushNotifications();
	});
</script>

<Toaster richColors closeButton expand />

<main>
	{@render children()}
</main>

<style>
</style>
