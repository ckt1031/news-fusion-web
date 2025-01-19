<script setup lang="ts">
import type { AtomFeedSingleEntry } from "~/lib/types";

const props = defineProps<{
	entry: AtomFeedSingleEntry;
}>();
</script>

<template>
  <FeedDate :date-iso="props.entry.updated"/>
  <MDC
      :value="props.entry.content"
      class="is-content group text-gray-600 dark:text-gray-400 mt-2 font-summary prose
           prose-code:bg-gray-300 dark:prose-code:bg-gray-800 prose-code:rounded prose-code:p-1
           prose-code:font-mono
           prose-code:before:content-none prose-code:after:content-none
           md:prose-lg lg:prose-xl
           dark:prose-invert prose-neutral markdown-style max-w-full"
  />
  <FeedThumbnail :image-url="props.entry.thumbnail" v-if="props.entry.thumbnail"/>
  <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-3">
    <FeedPublisher :url="props.entry.id" :name="props.entry.author.name"/>
    <FeedReadMore :link="props.entry.link"/>
  </div>
</template>

<style scoped>

</style>