<script setup lang="ts">
import Fuse from "fuse.js";
import type { AtomFeed } from "~/lib/types";

const route = useRoute();
const category = (route.params.category as string) ?? "world";
const date = route.params.date as string | undefined;

const { status, data, refresh } = await useLazyFetch<AtomFeed>(
	`/api/feed/${category}`,
	{ query: { date } },
);

const input = ref("");
const result = computed(() => {
	const entries = (data?.value?.feed?.entry ?? []) as AtomFeed["feed"]["entry"];

	const fuse = new Fuse(entries, {
		threshold: 0.3,
		keys: ["id", "title", "content", "link"],
		includeScore: true,
		includeMatches: true,
	});

	if (toValue(input).length === 0) return entries;

	return fuse.search(toValue(input)).map((i) => i.item);
});
</script>

<style scoped>
.state {
  @apply flex gap-1.5 justify-center items-center h-32
}
</style>

<template>
  <div class="my-3">
    <div v-if="status === 'pending'" class="state">
      <UIcon name="i-hugeicons-reload" class="w-5 h-5 animate-spin"/>
      Loading...
    </div>
    <div v-else-if="status === 'error'" class="state">
      <UIcon name="i-hugeicons-bug-01" class="w-5 h-5"/>
      Error fetching data
    </div>
    <div v-else-if="data && data.error" class="state">
      <UIcon name="i-hugeicons-bug-01" class="w-5 h-5"/>
      {{ data.error }}
    </div>
    <div
        v-else-if="data != null && data.feed != null && data.feed.entry.length > 0"
    >
      <div class="flex flex-col md:flex-row md:items-center mb-4 gap-4">
        <p class="text-gray-700 dark:text-gray-300 font-light">
          Total: {{ data.feed.entry.length }} articles
        </p>
        <div class="flex flex-row gap-2">
          <UInput
              icon="i-heroicons-magnifying-glass-20-solid"
              size="sm"
              color="white"
              :trailing="false"
              placeholder="Search..."
              v-model="input"
          />
          <FeedRefresh :refresh="refresh"/>
        </div>
      </div>
      <div class="flex flex-col divide-y divide-gray-300 dark:divide-gray-700">
        <div v-for="d in result" :key="d.id" class="py-2">
          <FeedItem :entry="d"/>
        </div>
      </div>
    </div>
    <div v-else class="state">
      <UIcon name="i-hugeicons-notification-snooze-03" class="w-5 h-5"/>
      No news found
    </div>
  </div>
</template>
