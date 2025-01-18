<script setup lang="ts">
import {
	immersiveTranslateConfig,
	loadImmersiveTranslate,
} from "~/lib/immersive-translate";

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

loadImmersiveTranslate();

useHead({
	title: "Immersive Translate",
	meta: [
		{
			name: "description",
			content:
				"JSON configuration for the plugin, paste it in developer settings.",
		},
	],
});
</script>

<template>
  <div class="flex flex-col gap-3 items-start">
    <h1 class="text-2xl font-bold">
      Immersive Translate
    </h1>
    <p class="text-gray-600 dark:text-gray-400 is-content">
      We have integrated the Immersive Translate to enable splitted translation of the content.
      SDK is automatically loaded and initialized when the page is loaded.
      If you have separately installed it's extension, you can use apply the configuration in developer settings.
    </p>
    <Shiki
        lang="json"
        :code="JSON.stringify(config, null, 2)"
        class="bg-[#0d1117] p-4 rounded-lg overflow-x-auto w-full font-mono"
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