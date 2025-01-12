<script setup lang="ts">
import FeedDatePicker from "~/components/FeedDatePicker.vue";
import { onLoadImmersiveTranslate } from "~/lib/immersive-translate";

defineRouteRules({
	ssr: true,
	prerender: false,
});

const { onLoaded } = useScript(
	{
		src: "https://download.immersivetranslate.com/immersive-translate-sdk-latest.js",
		async: true,
	},
	{
		use() {
			return { initImmersiveTranslate: window.initImmersiveTranslate };
		},
	},
);

onMounted(() => {
	onLoaded(({ initImmersiveTranslate }) => {
		onLoadImmersiveTranslate(initImmersiveTranslate);
	});
});
</script>

<template>
  <div class="border-b border-gray-300 dark:border-gray-700">
    <div class="py-3 flex flex-col sm:flex-row gap-3">
      <CategorySelector/>
      <div class="flex flex-row items-center">
        <FeedDatePicker/>
      </div>
    </div>
  </div>
  <Feed/>
</template>