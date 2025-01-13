<script setup lang="ts">
import Footer from "~/components/Footer.vue";

useHead({
	title: "News Fusion",
	meta: [
		{ name: "description", content: "The news aggregator for modern age" },
	],
});
</script>


<style>
body {
  font-family: 'Inter', 'Noto Sans TC', 'Noto Sans SC', sans-serif;
}

.root-container {
  @apply subpixel-antialiased bg-neutral-50 dark:bg-neutral-900 flex h-screen flex-col justify-between overflow-x-hidden;
}

.padding-container {
  @apply w-full max-w-[1000px] px-5 m-auto;
}
</style>

<template>
  <NuxtRouteAnnouncer/>
  <NuxtLoadingIndicator/>
  <NuxtLayout>
    <div class="root-container">
      <Header/>
      <div class="padding-container flex flex-1 flex-col">
        <NuxtPage/>
      </div>
      <Footer/>
    </div>
    <UNotifications/>
  </NuxtLayout>
</template>