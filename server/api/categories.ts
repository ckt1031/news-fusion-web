export const allowedCategories = ["world", "technology", "ai"]

export default defineEventHandler((event) => {
    return allowedCategories
})