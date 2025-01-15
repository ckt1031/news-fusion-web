<script setup lang="ts">
const props = defineProps<{
	url: string;
}>();
const url = `https://www.google.com/s2/favicons?domain=${props.url}&sz=64`;
</script>

<template>
  <img class="w-4 h-4" alt="favicon" :src="url"/>
</template>

<style scoped>

</style>