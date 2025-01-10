<script setup lang="ts">
import dayjs from "dayjs";
import type {z} from "zod";
import type {AtomFeedSchema} from "~/lib/types";

type AtomFeed = z.infer<typeof AtomFeedSchema>;

const props = defineProps<{
  feed: AtomFeed["feed"]["entry"][0];
}>();

const openContent = useState(`open-${props.feed.id}`, () => "0");

const onClick = () => {
  openContent.value = openContent.value === "0" ? "1" : "0";
};
</script>

<style scoped>
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
      <span class="text-gray-700 dark:text-gray-300 font-medium">
        {{ props.feed.title }}
      </span>
    </button>
    <div v-if="openContent === '1'" class="my-2">
      <p class="text-gray-500 dark:text-gray-400">
        {{
          dayjs(props.feed.updated).format('MMMM D, YYYY')
        }}
      </p>
      <MDC :value="props.feed.content"
           class="group text-gray-600 dark:text-gray-400 mt-2 font-mono prose prose-base dark:prose-invert prose-neutral markdown-style max-w-full"/>
      <img :src="props.feed['media:group']['media:content']['@_url']"
           v-if="props.feed['media:group']?.['media:content']?.['@_url']" class="mt-4 mb-2 rounded max-h-32 md:max-h-64"
           :alt="props.feed.title"
      />
      <div class="flex flex-row items-center gap-2 mt-1">
        <FeedPublisher :url="props.feed.id"/>
        <a :href="props.feed.id" class="text-blue-500 dark:text-blue-400 hover:underline flex items-center gap-1" target="_blank">
          <UIcon name="i-hugeicons-link-square-02" class="w-4 h-4" />
          Read more
        </a>
      </div>
    </div>
  </div>
</template>