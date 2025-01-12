<script setup lang="ts">
const props = defineProps<{
	imageUrl: string;
}>();

const proxiedImageURL = `/api/image?href=${encodeURIComponent(props.imageUrl)}`;
</script>

<template>
  <object
      :data="props.imageUrl"
      type="image/jpg"
      class="mt-4 mb-2 rounded max-h-32 md:max-h-64"
  >
    <img :src="proxiedImageURL" class="mt-4 mb-2 rounded max-h-32 md:max-h-64" alt="Thumbnail"/>
  </object>
</template>

<style scoped>

</style>