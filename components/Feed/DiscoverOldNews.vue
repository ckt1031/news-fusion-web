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
</script>

<style scoped>
.box {
  @apply border-2 border-indigo-500 dark:border-indigo-400 p-4 rounded-lg
}
.nav-link {
  @apply underline text-blue-300 dark:text-blue-400 flex flex-row gap-0.5 items-center
}
</style>

<template>
    <div v-if="status === 'pending'" class="box">
      <UIcon name="i-hugeicons-reload" class="w-5 h-5 animate-spin"/>
      Checking previous dates
    </div>
    <div v-else-if="data?.hasNews" class="box flex flex-col sm:flex-row gap-2">
      View old news:
      <NuxtLink :to="{ params: { date: data.date } }" class="nav-link">
        {{ data.date }}
        <UIcon name="i-hugeicons-arrow-right-double" class="w-5 h-5"/>
      </NuxtLink>
    </div>
</template>