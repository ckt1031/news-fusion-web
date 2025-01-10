// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	modules: ["@nuxt/ui", "@nuxt/fonts", "nuxt-markdown-render", "@nuxt/image"],
	devtools: { enabled: true },
	fonts: {
		provider: "google",
	},
	ui: {
		global: true,
	},
	routeRules: {
		"/": { isr: 60 },
		"/about": { prerender: true },
		"/[category]": { isr: 60 },
	},
});
