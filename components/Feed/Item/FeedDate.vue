<script setup lang="ts">
import dayjs from "dayjs";
import sAgo from "s-ago";

const props = defineProps<{
	dateIso: string;
}>();

const dateObject = dayjs(props.dateIso);
const dateString = dateObject.format("MMM D, YYYY - HH:mm");
const dateAgo = sAgo(dateObject.toDate());
</script>

<template>
  <p class="text-zinc-500 dark:text-zinc-400 non-content-class">
    {{ dateString }} <span class="text-zinc-500">({{ dateAgo }})</span>
  </p>
</template>

<style scoped>

</style>