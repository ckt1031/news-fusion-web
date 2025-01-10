<script setup lang="ts">
const props = defineProps<{
	url: string;
}>();
const url = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${props.url}&size=256`;
</script>

<template>
  <img :src="url" alt="favicon" class="w-4 h-4 rounded-full"/>
</template>

<style scoped>

</style>