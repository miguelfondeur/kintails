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
        <ClientOnly>
          <RandomStoryGenerator />
          <template #fallback>
            <div class="bg-white rounded-lg shadow-xl p-6 min-h-[400px] flex items-center justify-center">
              <div class="text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent mx-auto mb-4"></div>
                <p class="text-gray-600">Loading story generator...</p>
              </div>
            </div>
          </template>
        </ClientOnly>
      </main>
    </div>
  </template>
  
  <script setup>
    import { ArrowLeft } from 'lucide-vue-next'
  </script>