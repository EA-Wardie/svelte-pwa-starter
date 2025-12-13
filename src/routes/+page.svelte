<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { DB, type Todo } from '$lib/utils/DB';
	import { Network } from '$lib/utils/Network.svelte';
	import { Push } from '$lib/utils/Push.svelte';
	import { liveQuery } from 'dexie';

	let todos = liveQuery<Todo[]>(async () => await DB.todos.toArray());
	let todo: string = $state('');

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

	const addTodo = (): void => {
		DB.todos.add({ name: todo });

		todo = '';
	};

	const removeTodo = (id: number): void => {
		DB.todos.delete(id);
	};
</script>

<section>
	<h1>Main Page</h1>
	<br />
	<h2>Network</h2>
	<h3>
		<span>Network status is:</span>
		<span style="color: {Network.isOnline() ? 'green' : 'orange'}">
			{Network.getStatus()}
		</span>
	</h3>
	<hr />
	<h2>Push notifications</h2>
	<h3>
		<span>Notification permissions are:</span>
		<span style="color: {Push.isGranted() ? 'green' : 'orange'}">
			{Push.getPermission()}
		</span>
	</h3>
	<button
		disabled={Push.isDefault()}
		onclick={sendTestPushNotificationMessage}
	>
		Send Test Push Notification
	</button>
	<hr />
	<h2>Persisted Storage</h2>
	<input
		type="text"
		name="todo"
		placeholder="Enter a todo"
		bind:value={todo}
	/>
	<button disabled={!todo} onclick={addTodo}> Add Todo </button>
	{#if $todos?.length}
		<ul>
			{#each $todos as todo, index (todo.id)}
				<li>
					{index + 1}: {todo.name}
					<button onclick={() => removeTodo(todo.id)}>Remove</button>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No todos</p>
	{/if}

	<hr />
	<h2>Page Transitions</h2>
	<button onclick={() => goto(resolve('/child'))}> Go To Child Page </button>
</section>

<style>
</style>
