import removeConsole from "vite-plugin-remove-console";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	modules: ["@nuxt/ui", "@nuxt/fonts", "@nuxtjs/mdc", "nuxt-security"],
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

	security: {
		sri: true,
		hidePoweredBy: false,
		headers: {
			contentSecurityPolicy: {
				// Images
				"img-src": [
					"'self'",
					"https://www.google.com",
					"data:",
					"https://*.gstatic.com",
				],
				// Styles
				"style-src": [
					"'self'",
					"'unsafe-inline'",
					"https://fonts.googleapis.com",
				],
				// Scripts
				"script-src": [
					"'self'",
					"'unsafe-inline'",
					"https://static.cloudflareinsights.com",
				],
			},
		},
	},
});
