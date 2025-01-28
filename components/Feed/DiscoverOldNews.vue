<script setup lang="ts">
import type { OldNewsDiscoveryResponse } from "~/server/api/feed/old-news-discovery";

const { date, category } = defineProps<{
	date?: string;
	category: string;
}>();

const { data, status, error } = useLazyFetch<OldNewsDiscoveryResponse>(
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
@reference "tailwindcss";

.row {
  @apply flex flex-row items-center justify-center gap-2;
}
.nav-link {
  @apply text-blue-500 dark:text-blue-400 flex flex-row gap-0.5 items-center
}
</style>

<template>
  <UCard class="text-center">
    <template #header>
      <h3 class="text-md font-semibold">
        Previous News
      </h3>
    </template>

    <div v-if="status === 'pending'">
      <div class="row">
        <UIcon name="i-hugeicons-reload" class="w-5 h-5 animate-spin"/>
        Checking previous dates
      </div>
    </div>
    <div v-else-if="!data">
      Error fetching previous news
    </div>
    <div v-else-if="error">
      {{ error.message }}
    </div>
    <div v-else-if="data.hasNews">
      <NuxtLink :to="{ params: { date: data.date } }" class="nav-link" @click="replaceURL(data.date)">
        <UIcon name="i-hugeicons-arrow-right-double" class="w-5 h-5"/>
        {{ data.date }}
        <UIcon name="i-hugeicons-arrow-left-double" class="w-5 h-5"/>
      </NuxtLink>
    </div>
  </UCard>
</template>