<script setup lang="ts">
const props = defineProps<{
	imageUrl: string;
}>();

const proxiedImageURL = `/api/image?href=${encodeURIComponent(props.imageUrl)}`;

const visibleRef = ref(false);
const indexRef = ref(0);

const image_list = [proxiedImageURL];

const showImg = (index: number) => {
	indexRef.value = index;
	visibleRef.value = true;
};
const onHide = () => {
	visibleRef.value = false;
};
</script>

<style scoped>

</style>

<template>
  <picture>
    <source :srcset="props.imageUrl" type="image/jpg">
    <img
        :src="proxiedImageURL"
        class="pic rounded-md max-h-[306px] cursor-zoom-in" alt="Thumbnail"
        @click="() => showImg(0)"
    />
  </picture>
  <VueEasyLightbox
      :visible="visibleRef"
      :imgs="image_list"
      :index="indexRef"
      @hide="onHide"
  />
</template>