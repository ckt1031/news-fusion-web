<script setup lang="ts">
useHead({
	titleTemplate: (title) => (title ? `${title} - News Fusion` : "News Fusion"),
	meta: [
		{
			name: "description",
			content: "The news aggregator for modern age",
		},
	],
});
</script>


<style>
html {
  scroll-behavior: smooth;
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
    <div class="root-container font-sans">
      <Header/>
      <main class="padding-container flex flex-1 flex-col">
        <NuxtPage/>
      </main>
      <Footer/>
    </div>
  </NuxtLayout>
</template>