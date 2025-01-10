<script setup lang="ts">
</script>

<style>
div {
  font-family: 'Inter', sans-serif;
}
.root-container {
  @apply subpixel-antialiased bg-neutral-50 dark:bg-neutral-800 flex h-screen flex-col justify-between overflow-x-hidden;
}
.padding-container {
  @apply w-full max-w-[1000px] px-5 m-auto;
}
</style>

<template>
  <div class="root-container">
    <Header/>
    <div class="padding-container flex flex-1 flex-col">
      <NuxtPage/>
    </div>
  </div>
</template>