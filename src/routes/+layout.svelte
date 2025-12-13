<script lang="ts">
	import Install from '$lib/utils/components/Install.svelte';
	import { Navigation } from '$lib/utils/Navigation.svelte';
	import { Network } from '$lib/utils/Network.svelte';
	import { Push } from '$lib/utils/Push.svelte';
	import { onDestroy } from 'svelte';

	let { children } = $props();

	Navigation.init();
	Network.init();
	Push.init();

	onDestroy(() => {
		Network.kill();
	});
</script>

<Install />

<main>
	{@render children()}
</main>

<style>
</style>
