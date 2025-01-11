<script setup lang="ts">
const visibleRef = ref(false);
const indexRef = ref(0);

const showImg = (index: number) => {
	indexRef.value = index;
	visibleRef.value = true;
};
const onHide = () => {
	visibleRef.value = false;
};

const props = defineProps<{
	imageUrl: string;
}>();

const proxiedImageURL = `/api/image?href=${encodeURIComponent(props.imageUrl)}`;
</script>

<template>
  <object
      :data="props.imageUrl"
      type="image/jpg"
      class="mt-4 mb-2 rounded max-h-32 md:max-h-64 cursor-pointer"
      @click="() => showImg(0)"
  >
    <img :src="proxiedImageURL" class="mt-4 mb-2 rounded max-h-32 md:max-h-64" alt="Thumbnail"/>
  </object>
  <VueEasyLightbox
      :visible="visibleRef"
      :imgs="[props.imageUrl]"
      :index="indexRef"
      @hide="onHide"
  />
</template>

<style scoped>

</style>