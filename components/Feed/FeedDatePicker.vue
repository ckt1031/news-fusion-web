<script setup lang="ts">
import { format } from "date-fns";
import dayjs from "dayjs";

// Get query params
const { params } = useRoute();
// YYYY-MM-DD
const paramsDate = params.date as string | undefined;
const paramsCategory = (params.category as string | undefined) || "world";
const queryDate = paramsDate ?? dayjs().format("YYYY-MM-DD");

const date = ref(dayjs(queryDate).toDate());

const router = useRouter();

const onDateChange = (newDate: Date) => {
	const nowDayJS = dayjs();
	const newDateDayJS = dayjs(newDate);

	if (newDateDayJS.isAfter(nowDayJS)) {
		// set date to today
		date.value = nowDayJS.toDate();
		alert("Cannot select future date");
		return;
	}

	// If the date selected is older than 25 days, return
	if (newDateDayJS.isBefore(nowDayJS.subtract(25, "days"))) {
		date.value = nowDayJS.toDate();
		alert("Cannot select date older than 25 days");
		return;
	}

	const newQueryDate = newDateDayJS.format("YYYY-MM-DD").toString();

	const reg = /\/\d{4}-\d{2}-\d{2}/;

	if (reg.test(router.currentRoute.value.fullPath)) {
		router.push({ params: { date: newQueryDate } });
		return;
	}

	const url = `/category/${paramsCategory}/${newQueryDate}`;
	router.replace(url);
	history.pushState({}, "", url); // Write to history to enable back button
};
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton icon="i-hugeicons-calendar-01" :label="format(date, 'd MMM, yyy')"/>
    <template #panel="{ close }">
      <DatePicker v-model="date" is-required @close="close" @dateChange="onDateChange"/>
    </template>
  </UPopover>
</template>