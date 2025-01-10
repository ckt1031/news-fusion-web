<script setup lang="ts">
import FeedDatePicker from "~/components/FeedDatePicker.vue";
</script>

<template>
  <div class="border-b border-gray-300 dark:border-gray-700">
    <div class="py-3 flex flex-col sm:flex-row gap-3">
      <CategorySelector/>
      <div class="flex flex-row items-center">
        <FeedDatePicker/>
      </div>
    </div>
  </div>
  <Feed/>
</template>