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
@reference "tailwindcss";

.markdown-style code {
  @apply font-mono text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg;
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
    <button class="text-left cursor-pointer" @click="onClick">
      <span class="text-zinc-700 dark:text-zinc-300 font-medium is-content">
        {{ props.entry.title }}
      </span>
    </button>
    <div v-if="openContent === 'true'" class="my-2">
      <LazyFeedItemDetail :entry="props.entry"/>
    </div>
  </div>
</template>