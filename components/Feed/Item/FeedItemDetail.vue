<script setup lang="ts">
import clsx from "clsx";
import getYouTubeID from "get-youtube-id";
import type { AtomFeedSingleEntry } from "~/lib/types";

const props = defineProps<{
	entry: AtomFeedSingleEntry;
}>();

const link = props.entry.link;
const videoId = link.includes("youtube.com") ? getYouTubeID(link) : null;

const markdownCodeClass = clsx(
	"prose-code:bg-zinc-200 dark:prose-code:bg-zinc-800",
	"prose-code:rounded prose-code:p-1",
	"prose-code:font-mono prose-code:font-light",
	"prose-code:text-black dark:prose-code:text-zinc-300",
	"prose-code:before:content-none prose-code:after:content-none",
);

const markdownClass = clsx(
	"group",
	"mt-2",
	"markdown-code",
	"prose prose-zinc dark:prose-invert",
	"max-w-full",
	"text-zinc-600 dark:text-zinc-400",
	markdownCodeClass,
);
</script>

<style scoped>
</style>

<template>
  <MDC
      :value="props.entry.content"
      :class="markdownClass"
  />
  <div class="mt-4 mb-2" translatable="false">
    <LazyFeedYouTubePlayer :video-id="videoId" v-if="videoId"/>
    <FeedThumbnail v-else :image-url="props.entry.thumbnail" v-if="props.entry.thumbnail"/>
  </div>
  <div class="flex flex-col sm:flex-row sm:items-center mt-3" translatable="false">
    <FeedPublisher :url="props.entry.id" :name="props.entry.author.name" class="mb-1 sm:mb-0 sm:mr-1"/>
    <FeedReadMore :link="props.entry.link"/>
    <FeedCopy :title="props.entry.title" :summary="props.entry.content" :link="props.entry.link"/>
  </div>
</template>
