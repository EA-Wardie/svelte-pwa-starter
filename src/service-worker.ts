/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />
/// <reference types="../.svelte-kit/ambient.d.ts" />

import { build, files, version } from '$service-worker';

const self = globalThis.self as unknown as ServiceWorkerGlobalScope;
const CACHE: string = `cache-${version}`;
const ASSETS: string[] = [...build, ...files];
const EXTENSION_PROTOCOLS: string[] = [
	'chrome-extension:',
	'moz-extension:',
	'safari-extension:',
	'ms-browser-extension:',
];

self.addEventListener('install', (event: ExtendableEvent): void => {
	const addFilesToCache = async (): Promise<void> => {
		const cache: Cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	};

	event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event): void => {
	const deleteOldCaches = async (): Promise<void> => {
		for (const key of await caches.keys()) {
			if (key !== CACHE) {
				await caches.delete(key);
			}
		}
	};

	event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event: FetchEvent): void => {
	if (event.request.method !== 'GET') {
		return;
	}

	if (EXTENSION_PROTOCOLS.includes(new URL(event.request.url).protocol)) {
		return;
	}

	const respond = async (): Promise<Response> => {
		const url: URL = new URL(event.request.url);
		const cache: Cache = await caches.open(CACHE);

		if (ASSETS.includes(url.pathname)) {
			const response: Response | null =
				(await cache.match(url.pathname)) || null;

			if (response) {
				return response;
			}
		}

		try {
			const response: Response = await fetch(event.request);

			if (response.status === 200) {
				await cache.put(event.request, response.clone());
			}

			return response;
		} catch (error) {
			const response: Response | null =
				(await cache.match(event.request)) || null;

			if (response) {
				return response;
			}

			throw error;
		}
	};

	event.respondWith(respond());
});

self.addEventListener('push', (event: PushEvent) => {
	const data: string | null = event.data?.text() || null;

	const showNotification = async (): Promise<void> => {
		await self.registration.showNotification('PWA Starter', {
			body: data || '[NO BODY]',
		});
	};

	event.waitUntil(showNotification());
});

self.addEventListener('message', (event: ExtendableMessageEvent) => {
	const type: string | null = event.data.type || null;

	const showNotification = (callback: () => void): void => {
		self.registration
			.showNotification('PWA Starter', {
				body: 'This is a test push notification.',
			})
			.finally(() => {
				callback();
			});
	};

	if (type === 'SEND_TEST_PUSH_NOTIFICATION') {
		showNotification(() => {
			event.source?.postMessage({
				type: 'TEST_PUSH_NOTIFICATION_HANDLED',
			});
		});
	}
});

self.addEventListener('notificationclick', (event) => {
	event.notification.close();

	const focusOrOpenClientWindow = async (): Promise<void> => {
		const clientList: readonly WindowClient[] = await self.clients.matchAll(
			{
				type: 'window',
				includeUncontrolled: true,
			},
		);

		if (clientList.length) {
			const client: WindowClient | null = clientList.at(0) || null;

			if (client && 'focus' in client) {
				await client.focus();
			} else if ('openWindow' in self.clients) {
				await self.clients.openWindow('/');
			}
		}
	};

	event.waitUntil(focusOrOpenClientWindow());
});
