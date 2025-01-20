<script setup lang="ts">

</script>

<template>
  <footer class="flex flex-col justify-center items-center gap-3 mt-8 mb-10 md:mb-5 h-16">
    <div
        class="flex justify-center items-center flex-col md:flex-row text-gray-600 dark:text-gray-300 gap-0.5 sm:gap-2"
    >
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
    </div>
    <ClientOnly>
      <ThemeSwitcher/>
    </ClientOnly>
  </footer>
</template>

<style scoped>

</style>