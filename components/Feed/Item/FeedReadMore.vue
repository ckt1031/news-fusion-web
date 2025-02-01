<script setup lang="ts">
const props = defineProps<{
	link: string;
}>();
</script>

<template>
  <UTooltip
      :text="props.link.length < 50 ? props.link : props.link.slice(0, 50) + '...'"
      class="non-content-class"
  >
    <UButton
      label="Read More"
      color="neutral"
      variant="ghost"
      class="cursor-pointer"
      :href="props.link"
      target="_blank"
      icon="i-hugeicons-link-square-02"
    />
  </UTooltip>
</template>

<style scoped>

</style>