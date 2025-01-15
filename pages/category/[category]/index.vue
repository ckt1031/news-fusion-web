<script setup lang="ts">
import { allowedCategories } from "~/lib/config";
import { loadImmersiveTranslate } from "~/lib/immersive-translate";

const route = useRoute();
const category = route.params.category as string;

if (!allowedCategories.map((c) => c.value).includes(category.toLowerCase())) {
	throw createError({
		statusCode: 404,
		statusMessage: "Page Not Found",
	});
}

loadImmersiveTranslate();
</script>

<template>
  <FeedPage />
</template>

<style scoped>

</style>