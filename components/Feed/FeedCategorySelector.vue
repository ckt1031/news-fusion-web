<script setup lang="ts">
import { allowedCategories } from "~/lib/config";

const route = useRoute();
const category = route.params.category as string | null; // Get the category from the route

const selectedCategory = ref<string | null>(
	category ?? allowedCategories[0].value,
); // Set the first category as the selected category

const router = useRouter();

const onChange = (value: string) => {
	selectedCategory.value = value;
	router.push({ path: `/category/${value}` });
};
</script>

<style scoped>
</style>

<template>
  <div class="flex flex-row items-center gap-2">
    <p>Category:</p>
    <USelect
        v-if="allowedCategories && selectedCategory"
        v-model="selectedCategory"
        option-attribute="name"
        :options="allowedCategories"
        @change="onChange"
        title="Select a category"
    />
  </div>
</template>

