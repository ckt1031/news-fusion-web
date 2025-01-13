import removeConsole from "vite-plugin-remove-console";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	modules: [
		"@nuxt/ui",
		"@nuxt/fonts",
		"@nuxtjs/mdc",
		"@nuxt/scripts",
		"nuxt-shiki",
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

	app: {
		head: {
			htmlAttrs: {
				lang: "en",
			},
			charset: "utf-8",
		},
	},

	shiki: {
		defaultTheme: "github-dark-default",
	},
});
