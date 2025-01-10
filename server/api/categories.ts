export const allowedCategories = [
    {
        name: 'World',
        value: 'world'
    },
    {
        name: 'Technology',
        value: 'technology'
    },
    {
        name: 'AI',
        value: 'ai'
    },
    {
        name: 'Finance',
        value: 'finance'
    },
    {
        name: 'Investing',
        value: 'investing'
    },
    {
        name: 'Dev',
        value: 'dev'
    },
]

export default defineEventHandler((event) => {
    return allowedCategories
})