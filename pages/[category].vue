<script setup lang="ts">
import FeedDatePicker from "~/components/FeedDatePicker.vue";
import { allowedCategories } from "~/lib/config";

const route = useRoute();
const category = route.params.category as string; // Get the category from the route

if (!allowedCategories.map((c) => c.value).includes(category.toLowerCase())) {
	throw createError({
		statusCode: 404,
		statusMessage: "Page Not Found",
	});
}
</script>

<template>
  <div class="border-b border-gray-300 dark:border-gray-700">
    <div class="py-3 flex flex-col sm:flex-row gap-3">
      <CategorySelector/>
      <div class="flex flex-row items-center">
        <FeedDatePicker/>
      </div>
    </div>
  </div>
  <Feed/>
</template>

<style scoped>

</style>