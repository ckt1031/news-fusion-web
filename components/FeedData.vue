<script setup lang="ts">
import type { z } from "zod";
import FeedDate from "~/components/FeedDate.vue";
import FeedReadMore from "~/components/FeedReadMore.vue";
import FeedThumbnail from "~/components/FeedThumbnail.vue";
import type { AtomFeedSchema } from "~/lib/types";

type AtomFeed = z.infer<typeof AtomFeedSchema>;

const props = defineProps<{
	feed: AtomFeed["feed"]["entry"][0];
}>();

const openContent = useState(`open-${props.feed.id}`, () => "false");

const onClick = () => {
	openContent.value = openContent.value === "true" ? "false" : "true";
};

const imageURL = props.feed.thumbnail;
</script>

<style scoped>
.markdown-style code {
  @apply font-mono text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg;
}

.markdown-style h1 {
  @apply text-2xl font-bold;
}

.markdown-style h2 {
  @apply text-xl font-bold;
}

.markdown-style h3 {
  @apply text-lg font-bold;
}

.markdown-style h4 {
  @apply text-base font-bold;
}

.markdown-style h5 {
  @apply text-base font-bold;
}

.markdown-style h6 {
  @apply font-semibold;
}

.markdown-style p {
  @apply text-base;
}

.markdown-style strong {
  @apply text-xl font-bold;
}
</style>

<template>
  <div class="flex flex-col">
    <button class="text-left" @click="onClick">
      <span class="text-gray-700 dark:text-gray-300 font-medium is-content">
        {{ props.feed.title }}
      </span>
    </button>
    <div v-if="openContent === 'true'" class="my-2">
      <FeedDate :date-iso="props.feed.updated"/>
      <MDC
          :value="props.feed.content"
          class="is-content group text-gray-600 dark:text-gray-400 mt-2 font-mono prose
           prose-code:bg-gray-300 dark:prose-code:bg-gray-800 prose-code:rounded prose-code:p-1
           prose-code:font-console
           prose-code:before:content-none prose-code:after:content-none
           md:prose-lg lg:prose-xl
           dark:prose-invert prose-neutral markdown-style max-w-full"
      />
      <FeedThumbnail :image-url="imageURL" v-if="imageURL"/>
      <div class="flex flex-row items-center gap-2 mt-1">
        <FeedPublisher :url="props.feed.id"/>
        <FeedReadMore :link="props.feed.link"/>
      </div>
    </div>
  </div>
</template>