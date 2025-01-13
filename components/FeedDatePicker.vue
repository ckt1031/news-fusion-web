<script setup lang="ts">
import { format } from "date-fns";
import dayjs from "dayjs";
import { getFeedFetchKey } from "~/lib/keys";

// Get query params
const route = useRoute();
// YYYY-MM-DD
const queryDate =
	(route.query.date as string | undefined) ??
	dayjs().format("YYYY-MM-DD").toString();

const date = ref(dayjs(queryDate).toDate());

const router = useRouter();

const category = (route.params.category as string) ?? "world";
const key = getFeedFetchKey(category, route.query.date as string | undefined);
const refresh = () => refreshNuxtData(key);

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
	router.push({ query: { date: newQueryDate } });
	refresh();
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