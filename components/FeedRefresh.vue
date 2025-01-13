<script setup lang="ts">
import { getFeedFetchKey } from "~/lib/keys";

const route = useRoute();
const category = (route.params.category as string) ?? "world";
const date = route.query.date as string | undefined;

const key = getFeedFetchKey(category, date);
const refresh = () => refreshNuxtData(key);
</script>

<template>
  <UTooltip text="Refresh Feed">
    <UButton
        icon="i-hugeicons-arrow-reload-horizontal"
        size="sm"
        color="primary"
        variant="outline"
        title="Refresh Feed"
        @click="refresh"
    />
  </UTooltip>
</template>

<style scoped>

</style>