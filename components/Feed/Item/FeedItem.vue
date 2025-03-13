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
</style>

<template>
  <div class="flex flex-col">
    <button class="text-left cursor-pointer" @click="onClick">
      <span class="text-zinc-800 dark:text-zinc-200 font-medium is-content">
        {{ props.entry.title }}
      </span>
    </button>
    <div v-if="openContent === 'true'" class="my-2">
      <LazyFeedItemDetail :entry="props.entry"/>
    </div>
  </div>
</template>