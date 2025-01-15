<script setup lang="ts">
import dayjs from "dayjs";
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

// Check if the date is valid and not older than 25 days
const _paramsDate = route.params.date as string;
const djsDate = dayjs(_paramsDate);

// Check if valid using dayjs
if (!djsDate.isValid()) {
	throw createError({
		statusCode: 400,
		statusMessage: "Invalid date",
	});
}

// Not older than 25 days, and not in the future (leave 1 day buffer due to timezone)
if (dayjs().diff(djsDate, "day") > 25 || dayjs().diff(djsDate, "day") < 0) {
	throw createError({
		statusCode: 400,
		statusMessage: "Date is older than 25 days or in the future",
	});
}

loadImmersiveTranslate();
</script>

<template>
  <FeedPage/>
</template>

<style scoped>

</style>