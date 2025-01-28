<script setup lang="ts">
import dayjs from "dayjs";
import sAgo from "s-ago";

const props = defineProps<{
	dateIso: string;
}>();

const dateObject = dayjs(props.dateIso);
const dateString = dateObject.format("MMMM D, YYYY - HH:mm");
const dateAgo = sAgo(dateObject.toDate());
</script>

<template>
  <UTooltip :text="dateAgo" :popper="{ placement: 'right', arrow: true }">
    <p class="text-zinc-500 dark:text-zinc-400nt- non-conteclass">
      {{ dateString }}
    </p>
  </UTooltip>
</template>

<style scoped>

</style>