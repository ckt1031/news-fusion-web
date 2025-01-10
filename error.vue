<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
	error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="h-screen bg-gradient-to-br from-gray-700 to-black flex flex-col items-center justify-center text-white">
    <div v-if="error" class="flex flex-col md:flex-row items-center gap-3 md:gap-10">
      <div class="md:border-r-2 border-gray-700 h-full flex flex-col items-center justify-center">
        <h2 class="text-9xl font-bold md:mr-10 justify-self-center">{{ error.statusCode }}</h2>
      </div>
      <div class="flex flex-col gap-2 md:text-lg">
        <div v-if="error.statusCode === 404" class="flex flex-col gap-2 items-center md:items-start">
          <h1 class="text-2xl font-bold">Page Not Found</h1>
          <p class="text-lg">The page you are looking for does not exist.</p>
        </div>
        <code v-else class="bg-black text-sm p-2 rounded-md font-console max-w-64 max-h-36 overflow-auto">
          {{ error.message }}
        </code>
        <button @click="handleError"
                class="mt-4 bg-gray-900 border border-gray-700 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>
