<script setup lang="ts">
import {z} from "zod";
import dayjs from "dayjs";
import {AtomFeedSchema} from "~/lib/types";

type AtomFeed = z.infer<typeof AtomFeedSchema>;

const props = defineProps<{
  feed: AtomFeed['feed']['entry'][0]
}>()

const openContent = useState(`open-${props.feed.id}`, () => '0')

const onClick = () => {
  openContent.value = openContent.value === '0' ? '1' : '0'
}
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

.markdown {
  @apply font-mono text-gray-600 dark:text-gray-400 prose prose-base dark:prose-invert prose-neutral markdown-style max-w-full;
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
      <NuxtMarkdown :source="props.feed.content" class="mt-2 markdown"/>
      <img :src="props.feed['media:group']['media:content']['@_url']"
           v-if="props.feed['media:group']?.['media:content']?.['@_url']" class="my-2 rounded max-h-32"
           :alt="props.feed.title"
      />
      <a :href="props.feed.id" class="mt-1 text-blue-500 dark:text-blue-400 hover:underline" target="_blank">
        Read more
      </a>
    </div>
  </div>
</template>