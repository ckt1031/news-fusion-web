<script setup lang="ts">
const {data} = await useFetch('/api/categories') // Fetch categories from the API

const route = useRoute()
const category = route.params.category as string | null // Get the category from the route

const selectedCategory = ref<string | null>(category ?? "world") // Set the first category as the selected category

const router = useRouter()

const onChange = (value: string) => {
  selectedCategory.value = value
  router.push({name: 'category', params: {category: value}})
}
</script>

<style scoped>
</style>

<template>
  <div class="flex flex-row items-center gap-2">
    <p>Category:</p>
    <USelect v-if="data && selectedCategory" v-model="selectedCategory" :options="data" @change="onChange"/>
  </div>
</template>

