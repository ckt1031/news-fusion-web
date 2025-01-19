<script setup lang="ts">
import type { AtomFeedSingleEntry } from "~/lib/types";

const props = defineProps<{
	entry: AtomFeedSingleEntry;
}>();

const openContent = useState(`open-${props.entry.id}`, () => "false");

const onClick = () => {
	openContent.value = openContent.value === "true" ? "false" : "true";
};
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
        {{ props.entry.title }}
      </span>
    </button>
    <div v-if="openContent === 'true'" class="my-2">
      <LazyFeedItemDetail :entry="props.entry"/>
    </div>
  </div>
</template>