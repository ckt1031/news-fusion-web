import removeConsole from "vite-plugin-remove-console";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	modules: [
		"@nuxt/ui",
		"@nuxt/fonts",
		"@nuxtjs/mdc",
		"@nuxt/scripts",
		"nuxt-easy-lightbox",
		"nuxt-security",
	],
	devtools: { enabled: true },
	fonts: {
		provider: "google",
	},
	ui: {
		global: true,
	},
	experimental: {
		inlineRouteRules: true,
	},

	// Vite plugin options
	vite: {
		// Options for Vite plugin
		plugins: [removeConsole()],
	},

	scripts: {
		defaultScriptOptions: {
			bundle: true,
		},
	},

	// https://nuxt-security.vercel.app/getting-started/configuration
	security: {
		nonce: true,
		ssg: {
			meta: true, // Enables CSP as a meta tag in SSG mode
			hashScripts: true, // Enables CSP hash support for scripts in SSG mode
			hashStyles: false, // Disables CSP hash support for styles in SSG mode (recommended)
		},
		csrf: true,
		strict: true,
		headers: {
			xXSSProtection: "1; mode=block",
			contentSecurityPolicy: {
				// Image allow all
				"img-src": ["self", "data:", "https://*"],
				"object-src": ["self", "data:", "https://*"],
				"style-src": ["'self'", "'unsafe-inline'"],
				"script-src": [
					"'self'",
					"'nonce-{{nonce}}'",
					"'strict-dynamic'",
					"'unsafe-inline'",
					"https://static.cloudflareinsights.com/beacon.min.js",
					"https://download.immersivetranslate.com/immersive-translate-sdk-latest.js",
				],
				"connect-src": ["'self'", "https://*"],
			},
		},
	},
});
