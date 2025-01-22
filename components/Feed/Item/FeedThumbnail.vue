<script setup lang="ts">
const props = defineProps<{
	imageUrl: string;
}>();

const proxiedImageURL = `/api/image?href=${encodeURIComponent(props.imageUrl)}`;
</script>

<style scoped>

</style>

<template>
  <picture>
    <source :srcset="props.imageUrl" type="image/jpg">
    <img :src="proxiedImageURL" class="rounded max-h-[306px]" alt="Thumbnail"/>
  </picture>
</template>