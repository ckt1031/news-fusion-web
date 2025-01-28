<script setup lang="ts">
import { allowedCategories } from "~/lib/config";

const route = useRoute();
const category = route.params.category as string | null; // Get the category from the route

const selectedCategory = ref<string | null>(
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	category ?? allowedCategories[0]!.value,
); // Set the first category as the selected category

const router = useRouter();

const onChange = (value: string | number | boolean | null) => {
	if (typeof value !== "string") return;

	selectedCategory.value = value;
	router.push({ path: `/category/${value}` });
};
</script>

<style scoped>
</style>

<template>
  <div class="flex flex-row items-center gap-2">
    <USelect
        v-if="allowedCategories && selectedCategory"
        v-model="selectedCategory"
        :items="allowedCategories"
        @update:modelValue="onChange"
        title="Select a category"
        class="w-48"
        color="primary"
        variant="subtle"
        highlight
    />
  </div>
</template>

