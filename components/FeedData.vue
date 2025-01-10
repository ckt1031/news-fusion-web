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

</style>

<template>
  <div class="flex flex-col">
    <button class="text-left" @click="onClick">
      <span class="text-gray-700 dark:text-gray-300 font-medium">
        {{ props.feed.title }}
      </span>
    </button>
    <div v-if="openContent === '1'" class="my-2">
      <p class="text-gray-600 dark:text-gray-500">
        {{
          dayjs(props.feed.updated).format('MMMM D, YYYY')
        }}
      </p>
      <p class="mt-2 text-gray-500 dark:text-gray-400">
        {{ props.feed.content }}
      </p>
      <a :href="props.feed.id" class="mt-1 text-blue-500 dark:text-blue-400 hover:underline">
        Read more
      </a>
    </div>
  </div>
</template>