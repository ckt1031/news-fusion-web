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

	mdc: {
		rehypePlugins: {
			"rehype-external-links": {
				// rel and target as options, make it open in new tab

				// @ts-ignore
				target: ["_blank"],
				rel: ["noopener", " noreferrer"],
			},
		},
	},
	routeRules: {
		"/": { isr: 120, swr: 120 },
		"/category/**": { isr: 120, swr: 120 },
		"/about": { prerender: true },
		"/immersive-translate": { prerender: true },
	},
});
