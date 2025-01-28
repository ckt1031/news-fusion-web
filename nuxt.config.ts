// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	future: {
		compatibilityVersion: 4,
	},
	components: [
		"~/components",
		"~/components/Feed",
		"~/components/Feed/Item",
		"~/components/Layout",
		"~/components/NuxtUI",
	],
	modules: [
		"@nuxt/ui",
		"@nuxtjs/mdc",
		"@nuxt/scripts",
		"@nuxtjs/robots",
		"@nuxtjs/sitemap",
		"@nuxt/icon",
		"nuxt-shiki",
		"nuxt-easy-lightbox",
	],
	devtools: { enabled: true },
	css: ["~/assets/css/main.css"],
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
	nitro: {
		prerender: {
			autoSubfolderIndex: false,
		},
	},
	site: {
		indexable: false,
		url: "https://news.tsun1031.xyz",
		name: "News Fusion",
	},
	robots: {
		blockNonSeoBots: true,
		blockAiBots: true,
		disallow: ["/"],
	},
	icon: {
		serverBundle: {
			collections: ["heroicons", "hugeicons", "tabler"],
		},
	},
});
