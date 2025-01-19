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
    <a
        :href="props.link"
        class="text-blue-500 dark:text-blue-400 hover:underline flex items-center gap-1"
        target="_blank"
    >
      <UIcon name="i-hugeicons-link-square-02" class="w-4 h-4"/>
      Read More
    </a>
  </UTooltip>
</template>

<style scoped>

</style>