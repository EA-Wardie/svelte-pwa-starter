# PWA Starter

A Progressive Web App template built with SvelteKit. Features offline support with service worker caching, an
installable app experience and a preconfigured manifest.json out-of-the-box. Perfect for quickly scaffolding modern web
applications that work seamlessly across desktop and mobile devices.

---

## Basic Components

- SvelteKit with SSR disabled
- Service worker
- Manifest file
- Placeholder branding & icons

## Getting Started

1. Clone repo
2. Run `pnpm i`
3. Replace placeholder branding (PWA Starter)
    - `/src/app.html`
    - `/src/service-worker.ts`
    - `/static/manifest.json`
    - `/src/routes/+page.svelte`
4. Replace placeholder icons/images
    - `/static/icons`
    - `/static/splash_screens`
    - `/static/screenshots`
5. Run `pnpm dev`

## Asset Management

PWAs require assets for the best mobile experience. The following tools are my go-to for generating these
assets.

- For app icons: [Favicon Generator](https://favicon.inbrowser.app/tools/favicon-generator)
- For iOS splash
  screens: [PWA Icons & iOS Splash Screen Generator](https://progressier.com/pwa-icons-and-ios-splash-screen-generator)
- Screenshots of you app can be taken using Chrome or Firefox's built-in screenshot tool, or an extension
  like: [GoFullPage](https://chromewebstore.google.com/detail/gofullpage-full-page-scre/fdpohaocaechififmbbbbbknoalclacl)

## Demo

The app offers some simple demo features on the home page sush af your devices network status (a major part of PWA
support) and a simple test push notification button

The service worker includes some sample code for external push notifications which you can test using Chrome's dev
tools. It also includes sample code for receiving messages from the client. These are generally sent with a `type`
attribute.

Of course the service worker can be changed as required.

## Future Integrations

- Firebase Messaging for push notifications.
- DexieJS for local first relational data storage.
- A more opinionated approach to UI using TailwindCSS and DaisyUI.

## Lastly

This project uses Cloudflare for hosting out-of-the-box, but you can easily replace `@sveltejs/adapter-cloudflare` with
any adapter you need for whatever platform you want to host your app on.

---

### Notice for use of LLMs

Although LLMs were used in concept and design strategies, all code used in this project (apart from project generated
code) was written by a human.