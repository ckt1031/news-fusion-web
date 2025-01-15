<script setup lang="ts">
const props = defineProps<{
	refresh: () => void;
}>();
</script>

<template>
  <UTooltip text="Refresh Feed">
    <UButton
        icon="i-hugeicons-arrow-reload-horizontal"
        size="sm"
        color="primary"
        variant="outline"
        title="Refresh Feed"
        @click="props.refresh"
    />
  </UTooltip>
</template>

<style scoped>

</style>