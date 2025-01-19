<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from "v-calendar";
import type {
	DatePickerDate,
	DatePickerRangeObject,
} from "v-calendar/dist/types/src/use/datePicker.d.ts";
import "v-calendar/dist/style.css";

defineOptions({
	inheritAttrs: false,
});

const props = defineProps({
	modelValue: {
		type: [Date, Object] as PropType<
			DatePickerDate | DatePickerRangeObject | null
		>,
		default: null,
	},
});

const emit = defineEmits(["update:model-value", "close", "dateChange"]);

const date = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit("update:model-value", value);
		emit("dateChange", value);
		emit("close");
	},
});

const attrs = {
	transparent: true,
	borderless: true,
	color: "blue",
	"is-dark": { selector: "html", darkClass: "dark" },
	"first-day-of-week": 1,
};

function onDayClick(date: Date, event: MouseEvent): void {
	const target = event.target as HTMLElement;
	target.blur();
}
</script>

<style></style>

<template>
  <VCalendarDatePicker
      v-if="date && (date as DatePickerRangeObject)?.start && (date as DatePickerRangeObject)?.end"
      v-model.range="date"
      :columns="2"
      v-bind="{ ...attrs, ...$attrs }"
      @dayclick="onDayClick"
  />
  <VCalendarDatePicker
      v-else
      v-model="date"
      v-bind="{ ...attrs, ...$attrs }"
      @dayclick="onDayClick"
  />
</template>
