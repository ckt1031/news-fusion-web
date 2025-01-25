<script setup lang="ts">
import type { OldNewsDiscoveryResponse } from "~/server/api/feed/old-news-discovery";

const { date, category } = defineProps<{
	date?: string;
	category: string;
}>();

const { data, status } = useLazyFetch<OldNewsDiscoveryResponse>(
	"/api/feed/old-news-discovery",
	{
		query: { date, category },
	},
);

const router = useRouter();
const replaceURL = (_date: string) => {
	// If the quote does not end with YYYY-MM-DD, replace browser URL
	if (!/\/\d{4}-\d{2}-\d{2}$/.test(window.location.pathname)) {
		const pathname = `/category/${category}/${_date}`;
		router.replace(pathname);
		// Write to history to enable back button
		history.pushState({}, "", pathname);
	}
};
</script>

<style scoped>
.box {
  @apply border-2 md:border-4 border-indigo-500 dark:border-indigo-400 p-4 rounded-lg 
  bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex flex-col items-center justify-center
}
.nav-link {
  @apply text-blue-500 dark:text-blue-400 flex flex-row gap-0.5 items-center
}
</style>

<template>
    <div v-if="status === 'pending'" class="box">
      <UIcon name="i-hugeicons-reload" class="w-5 h-5 animate-spin"/>
      Checking previous dates
    </div>
    <div v-else-if="data?.hasNews" class="box flex flex-col sm:flex-row gap-2">
      Previous News Found
      <NuxtLink :to="{ params: { date: data.date } }" class="nav-link" @click="replaceURL(data.date)">
        <UIcon name="i-hugeicons-arrow-right-double" class="w-5 h-5"/>
        {{ data.date }}
        <UIcon name="i-hugeicons-arrow-left-double" class="w-5 h-5"/>
      </NuxtLink>
    </div>
</template>