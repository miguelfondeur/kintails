<template>
  <div class="flex-grow py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="isLoading" class="flex justify-center items-center min-h-[50vh]">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>
      </div>
      
      <div v-else>
        <!-- Header with title and search -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Discover Storytellers</h1>
          </div>
          
          <!-- Search box -->
          <div class="w-full sm:w-80 mt-4 sm:mt-0">
            <div class="relative rounded-md shadow-sm">
              <input
                v-model="searchQuery"
                type="text"
                class="block w-full rounded-md border border-gray-300 bg-white p-2 pl-10 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                placeholder="Search storytellers..."
              />
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search class="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Display unique authors as cards -->
        <div v-if="filteredAuthors.length === 0" class="text-center py-12">
          <p class="text-gray-500">No storytellers found matching your search.</p>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="author in filteredAuthors" 
            :key="author.name"
            class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <NuxtLink :to="`/stories/collections/${encodeURIComponent(author.name)}`" class="block p-6">
              <div class="flex items-center mb-4">
                <img 
                  :src="author.avatar || `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(author.name)}&backgroundColor=b6e3f4&radius=50`" 
                  :alt="author.name"
                  class="w-16 h-16 rounded-full mr-4 border-2 border-white shadow-md"
                />
                <div>
                  <h2 class="text-xl font-semibold text-gray-900">{{ author.name }}</h2>
                  <p class="text-sm text-gray-500">{{ author.storyCount }} {{ author.storyCount === 1 ? 'story' : 'stories' }}</p>
                </div>
              </div>
              <p class="text-gray-600">{{ author.description || `Browse the collection of stories by ${author.name}` }}</p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search } from 'lucide-vue-next'
import { useStories } from '~/composables/useStories'

const { stories, isLoading } = useStories()
const searchQuery = ref('')

// Generate author list from stories
const authors = computed(() => {
  if (!stories.value) return []
  
  // Create a map to count stories by author
  const authorMap = new Map()
  
  stories.value.forEach(story => {
    if (!story.author) return
    
    if (authorMap.has(story.author)) {
      authorMap.get(story.author).storyCount++
    } else {
      authorMap.set(story.author, {
        name: story.author,
        storyCount: 1,
        avatar: story.avatar_url, // Use the first story's avatar
        description: null // Would come from user profiles in a real app
      })
    }
  })
  
  // Convert map to array and sort by story count (descending)
  return Array.from(authorMap.values()).sort((a, b) => b.storyCount - a.storyCount)
})

// Filter authors based on search
const filteredAuthors = computed(() => {
  if (!searchQuery.value) return authors.value
  
  const query = searchQuery.value.toLowerCase()
  return authors.value.filter(author => 
    author.name.toLowerCase().includes(query)
  )
})
</script> 