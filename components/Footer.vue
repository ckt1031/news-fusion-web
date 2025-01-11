<script setup lang="ts">

</script>

<template>
  <footer class="flex justify-center items-center h-16 mt-10 mb-8 flex-col md:flex-row text-gray-600 dark:text-gray-300 gap-2">
    <p class="items-center">
      {{ new Date().getFullYear() }}
      <a href="/about" class="hover:underline">
        News Fusion
      </a>
    </p>
    <p>
      &#x2022;
    </p>
    <p class="items-center">
      Made with ❤️ by
      <a href="https://github.com/ckt1031" target="_blank" class="text-blue-500 dark:text-blue-400 hover:underline">
        ckt1031
      </a>
    </p>
  </footer>
</template>

<style scoped>

</style>