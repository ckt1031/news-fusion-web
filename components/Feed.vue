<script setup lang="ts">
import {z} from 'zod';
import {AtomFeedSchema} from "~/lib/types";

const route = useRoute();
const category = route.params.category ?? "world";

type AtomFeed = z.infer<typeof AtomFeedSchema>;

const {status, data} = useLazyFetch<AtomFeed>(`/api/feed/${category}`, {
  query: {
    date: route.query.date,
  }
});
</script>

<style scoped>

</style>

<template>
  <div class="my-3">
    <div v-if="status === 'pending'">
      Loading ...
    </div>
    <div v-else-if="status === 'error'">
      Error fetching data
    </div>
    <div v-else-if="data != null && data.feed != null && data.feed.entry.length > 0"
         class="flex flex-col divide-y divide-gray-300 dark:divide-gray-700">
      <div v-for="item in data.feed.entry" :key="item.id" class="py-1">
        <FeedData :feed="item"/>
      </div>
    </div>
    <div v-else class="flex justify-center items-center h-32">
      No data
    </div>
  </div>
</template>
