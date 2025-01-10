<script setup lang="ts">
import { format } from "date-fns";
import dayjs from "dayjs";

// Get query params
const route = useRoute();
// YYYY-MM-DD
const queryDate =
	(route.query.date as string | undefined) ??
	dayjs().format("YYYY-MM-DD").toString();

const date = ref(dayjs(queryDate).toDate());

const router = useRouter();

const onDateChange = (newDate: Date) => {
	const newQueryDate = dayjs(newDate).format("YYYY-MM-DD").toString();
	window.location.href = `/?date=${newQueryDate}`;
};
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')"/>
    <template #panel="{ close }">
      <DatePicker v-model="date" is-required @close="close" @dateChange="onDateChange"/>
    </template>
  </UPopover>
</template>