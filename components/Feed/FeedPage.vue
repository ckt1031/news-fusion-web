<script setup lang="ts">
import CategorySelector from "~/components/Feed/CategorySelector.vue";
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
  <FeedList/>
</template>

<style scoped>

</style>