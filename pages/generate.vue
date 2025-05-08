<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
    <header class="py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Story Generator</h1>
        <div class="flex items-center space-x-4">
          <NuxtLink 
            to="/stories"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft class="h-5 w-5 mr-2" />
            Back to Stories
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RandomStoryGenerator />
    </main>
  </div>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'
</script>