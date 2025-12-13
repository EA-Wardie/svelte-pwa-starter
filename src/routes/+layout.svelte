<script lang="ts">
	import { Navigation } from '$lib/utils/Navigation.svelte';
	import { Network } from '$lib/utils/Network.svelte';
	import { Push } from '$lib/utils/Push.svelte';
	import { Toaster } from 'svelte-sonner';

	let { children } = $props();

	Navigation.init();
	Network.init();
	Push.init();
</script>

<Toaster richColors expand />

<main>
	{@render children()}
</main>

<style>
</style>
