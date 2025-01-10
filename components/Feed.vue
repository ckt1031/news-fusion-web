<script setup lang="ts">
import type { z } from "zod";
import type { AtomFeedSchema } from "~/lib/types";

const route = useRoute();
const category = route.params.category ?? "world";

type Error = {
	error: string | null;
};
type AtomFeed = z.infer<typeof AtomFeedSchema> & Error;

const { status, data } = useLazyFetch<AtomFeed>(`/api/feed/${category}`, {
	query: {
		date: route.query.date,
	},
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
      <p class="text-gray-700 dark:text-gray-300 font-light mb-4">
        Total: {{ data.feed.entry.length }} articles
      </p>
      <div class="flex flex-col divide-y divide-gray-300 dark:divide-gray-700">
        <div v-for="item in data.feed.entry" :key="item.id" class="py-2">
          <FeedData :feed="item"/>
        </div>
      </div>
    </div>
    <div v-else class="state">
      <UIcon name="i-hugeicons-notification-snooze-03" class="w-5 h-5"/>
      No news found
    </div>
  </div>
</template>
