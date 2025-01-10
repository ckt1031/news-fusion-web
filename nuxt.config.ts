// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    modules: ['@nuxt/ui', '@nuxt/fonts', 'nuxt-markdown-render'],
    devtools: {enabled: true},
    fonts: {
        provider: 'google',
    },
    ui: {
        global: true
    },
    routeRules: {
        '/': {
            swr: 60
        },
        '/[category]': {
            swr: 60
        }
    }
})