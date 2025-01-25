<script setup lang="ts">
import Global from "~/components/Layout/Global.vue";

useHead({
	titleTemplate: (title) => (title ? `${title} - News Fusion` : "News Fusion"),
	meta: [
		{
			name: "description",
			content: "The news aggregator for modern age",
		},
	],
});
</script>


<style>
html {
  scroll-behavior: smooth;
}

.root-container {
  @apply subpixel-antialiased bg-gray-50 dark:bg-gray-900 flex h-screen flex-col justify-between overflow-x-hidden;
}

.padding-container {
  @apply w-full max-w-[1000px] px-5 m-auto;
}
</style>

<template>
  <NuxtRouteAnnouncer/>
  <NuxtLoadingIndicator/>
  <Global>
    <NuxtPage/>
  </Global>
</template>