<script setup lang="ts">
import { immersiveTranslateConfig } from "~/lib/immersive-translate";

const config = [
	{
		matches: "news.tsun1031.xyz",
		...immersiveTranslateConfig.pageRule,
	},
];

const copyToClipboard = () => {
	navigator.clipboard.writeText(JSON.stringify(config, null, 2));
	alert("Copied to clipboard!");
};
</script>

<template>
  <div class="flex flex-col gap-3 items-start">
    <h1 class="text-2xl font-bold">
      Immersive Translate
    </h1>
    <p class="text-gray-600 dark:text-gray-400">
      This page is for configuring the Immersive Translate extension.
    </p>
    <Shiki
        lang="json"
        :code="JSON.stringify(config, null, 2)"
        class="bg-[#0d1117] p-4 rounded-lg overflow-x-auto w-full"
    />
    <UButton
        icon="i-hugeicons-copy-01"
        size="md"
        color="primary"
        variant="outline"
        label="Copy to clipboard"
        title="Copy to clipboard"
        @click="copyToClipboard"
    />
  </div>
</template>

<style scoped>

</style>