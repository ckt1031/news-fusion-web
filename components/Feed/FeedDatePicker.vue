<script setup lang="ts">
import { format } from "date-fns";
import dayjs from "dayjs";

// Get query params
const route = useRoute();
// YYYY-MM-DD
const _paramsDate = route.params.date as string | undefined;
const _paramsCategory =
	(route.params.category as string | undefined) || "world";
const queryDate = _paramsDate ?? dayjs().format("YYYY-MM-DD");

const date = ref(dayjs(queryDate).toDate());

const router = useRouter();

const onDateChange = (newDate: Date) => {
	if (dayjs(newDate).isAfter(dayjs())) {
		// set date to today
		date.value = dayjs().toDate();
		alert("Cannot select future date");
		return;
	}

	// If the date selected is older than 25 days, return
	if (dayjs(newDate).isBefore(dayjs().subtract(25, "days"))) {
		date.value = dayjs().toDate();
		alert("Cannot select date older than 25 days");
		return;
	}

	const newQueryDate = dayjs(newDate).format("YYYY-MM-DD").toString();

	const reg = /\/\d{4}-\d{2}-\d{2}/;

	if (reg.test(router.currentRoute.value.fullPath)) {
		router.push({ params: { date: newQueryDate } });
		return;
	}

	router.replace(`/category/${_paramsCategory}/${newQueryDate}`);
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