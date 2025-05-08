<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
    <header class="py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">All Stories</h1>
        <div class="flex items-center space-x-4">
          <NuxtLink
            to="/generate"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 transition-all duration-300 hover:scale-105"
          >
            <Wand2 class="h-5 w-5 mr-2" />
            Generate Story
          </NuxtLink>
          <button
            @click="isCreateModalOpen = true"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-all duration-300 hover:scale-105"
          >
            <Plus class="h-5 w-5 mr-2" />
            New Story
          </button>
          <NuxtLink 
            to="/"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 hover:scale-105 hover:rotate-2"
          >
            <Home class="h-5 w-5 mr-2" />
            Back Home
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="isLoading" class="flex justify-center items-center min-h-[50vh]">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>
      </div>

      <div v-else-if="stories.length === 0" class="text-center py-12">
        <h2 class="text-2xl font-semibold text-gray-600">No stories yet</h2>
        <p class="mt-2 text-gray-500">Click the "New Story" button to create your first story!</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="story in stories"
          :key="story.id"
          class="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          <button
            @click="deleteStory(story.id)"
            class="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-500 transition-colors"
            title="Delete story"
          >
            <Trash2 class="h-5 w-5" />
          </button>

          <NuxtLink :to="`/stories/${story.id}`" class="block p-6">
            <div class="flex items-center mb-4">
              <img 
                :src="story.avatar_url" 
                :alt="story.family_member"
                class="w-16 h-16 rounded-full mr-4 border-2 border-white shadow-md"
              />
              <div>
                <h2 class="text-xl font-semibold text-gray-900">{{ story.family_member }}</h2>
                <p class="text-sm text-gray-500">by {{ story.author }}</p>
              </div>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">{{ story.title }}</h3>
            <p class="text-gray-600 line-clamp-3">{{ story.content }}</p>
          </NuxtLink>
        </div>
      </div>
    </main>

    <CreateStoryModal 
      :is-open="isCreateModalOpen"
      @close="isCreateModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Home, Plus, Trash2, Wand2 } from 'lucide-vue-next'
import { useStories } from '~/composables/useStories'

const { stories, isLoading, deleteStory } = useStories()
const isCreateModalOpen = ref(false)
</script>