export const allowedCategories = ["world", "technology", "ai", "finance", "investing", "dev", "free-games", "hong-kong"]

export default defineEventHandler((event) => {
    return allowedCategories
})