<script setup lang="ts">
import Fuse from "fuse.js";
import type { AtomFeed, AtomFeedSingleEntry } from "~/lib/types";

const route = useRoute();
const category = (route.params.category as string) ?? "world";
const date = route.params.date as string | undefined;

const { status, data, refresh } = await useLazyFetch<AtomFeed>(
	`/api/feed/${category}`,
	{ query: { date } },
);

const input = ref("");
const result = computed(() => {
	const entries = (data?.value?.feed?.entry ?? []) as AtomFeedSingleEntry[];

	const fuse = new Fuse(entries, {
		threshold: 0.5,
		keys: ["title", "content", "link", "author.name"],
		includeMatches: true,
	});

	if (toValue(input).length === 0) return entries;

	return fuse.search(toValue(input)).map((i) => i.item);
});
</script>

<style scoped>
@reference "tailwindcss";

.center-box {
  @apply flex gap-1.5 justify-center items-center h-32
}
</style>

<template>
  <div class="my-3">
    <div v-if="status === 'pending'" class="center-box">
      <UIcon name="i-hugeicons-reload" class="w-5 h-5 animate-spin"/>
      Loading...
    </div>
    <div v-else-if="status === 'error'" class="center-box">
      <UIcon name="i-hugeicons-bug-01" class="w-5 h-5"/>
      Error fetching data
    </div>
    <div v-else-if="data && data.error" class="center-box">
      <UIcon name="i-hugeicons-bug-01" class="w-5 h-5"/>
      {{ data.error }}
    </div>
    <div
        v-else-if="data != null && data.feed != null && data.feed.entry && data.feed.entry.length > 0"
    >
      <div class="flex flex-col sm:flex-row sm:items-center mb-4 gap-6">
        <p class="text-zinc-700 dark:text-zinc-300 font-light">
          Total: {{ data.feed.entry.length }} articles
        </p>
        <div class="flex flex-row gap-2">
          <UInput
              icon="i-hugeicons-search-01"
              color="neutral"
              :trailing="false"
              placeholder="Search..."
              v-model="input"
          />
          <FeedRefresh :refresh="refresh"/>
        </div>
      </div>
      <div class="flex flex-col divide-y divide-zinc-300 dark:divide-zinc-700" v-if="result.length > 0">
        <div v-for="d in result" :key="d.id" class="py-2">
          <FeedItem :entry="d"/>
        </div>
      </div>
      <div v-else class="center-box">
        <UIcon name="i-hugeicons-search-remove" class="w-5 h-5"/>
        No search results
      </div>
    </div>
    <div v-else class="flex flex-col gap-3 items-center">
      <div class="center-box">
        <UIcon name="i-hugeicons-no-meeting-room" class="w-5 h-5"/>
        No news found
      </div>
      <DiscoverOldNews :date="date" :category="category"/>
    </div>
  </div>
</template>
