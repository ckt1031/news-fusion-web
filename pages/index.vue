<script setup lang="ts">
import FeedDatePicker from "~/components/FeedDatePicker.vue";
</script>

<template>
  <div class="mt-3 flex flex-col md:flex-row gap-3">
    <CategorySelector/>
    <div class="flex flex-row items-center">
      <FeedDatePicker/>
    </div>
  </div>
  <Feed/>
</template>