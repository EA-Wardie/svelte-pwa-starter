/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />
/// <reference types="../.svelte-kit/ambient.d.ts" />

import { build, files, version } from '$service-worker';

const self = globalThis.self as unknown as ServiceWorkerGlobalScope;
const CACHE: string = `cache-${version}`;
const ASSETS: string[] = [...build, ...files];
const EXTERNSION_PROTOCOLS: string[] = [
	'chrome-extension:',
	'moz-extension:',
	'safari-extension:',
	'ms-browser-extension:',
];

self.addEventListener('install', (event: ExtendableEvent): void => {
	async function addFilesToCache(): Promise<void> {
		const cache: Cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event: FetchEvent): void => {
	if (event.request.method !== 'GET') {
		return;
	}

	if (EXTERNSION_PROTOCOLS.includes(new URL(event.request.url).protocol)) {
		return;
	}

	async function respond(): Promise<Response> {
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

			if (!(response instanceof Response)) {
				throw new Error('Invalid response from fetch.');
			}

			if (response.status === 200) {
				cache.put(event.request, response.clone());
			}

			return response;
		} catch (err) {
			const response: Response | null =
				(await cache.match(event.request)) || null;

			if (response) {
				return response;
			}

			throw err;
		}
	}

	event.respondWith(respond());
});
