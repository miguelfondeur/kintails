<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center min-h-[50vh]">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>
      </div>

      <!-- Story Content -->
      <div v-else-if="story" :class="[story.backgroundColor, 'rounded-2xl shadow-xl overflow-hidden']">
        <div class="relative p-8">
          <!-- Navigation Buttons -->
          <div class="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <button
              v-if="previousStoryId !== null"
              @click="navigateToStory(previousStoryId)"
              class="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all transform hover:scale-105 pointer-events-auto"
              title="Previous story"
            >
              <ChevronLeft class="h-6 w-6 text-gray-700" />
            </button>
            <button
              v-if="nextStoryId !== null"
              @click="navigateToStory(nextStoryId)"
              class="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all transform hover:scale-105 pointer-events-auto"
              title="Next story"
            >
              <ChevronRight class="h-6 w-6 text-gray-700" />
            </button>
          </div>

          <!-- Back Button -->
          <NuxtLink 
            to="/stories"
            class="absolute top-4 right-4 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <ArrowLeft class="h-4 w-4 mr-2" />
            Back to Stories
          </NuxtLink>

          <div class="flex items-center mb-6">
            <img 
              :src="story.avatar_url" 
              :alt="story.family_member"
              class="w-24 h-24 rounded-full mr-6 border-4 border-white shadow-lg"
            />
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-1">{{ story.family_member }}</h1>
              <p class="text-gray-600">Written by {{ story.author }}</p>
            </div>
          </div>

          <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ story.title }}</h2>
          <p class="text-gray-700 whitespace-pre-line text-lg leading-relaxed">{{ story.content }}</p>
        </div>
      </div>

      <!-- Not Found State -->
      <div v-else class="text-center py-12">
        <h2 class="text-2xl font-semibold text-gray-600">Story not found</h2>
        <NuxtLink 
          to="/stories"
          class="inline-flex items-center mt-4 px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
        >
          <ArrowLeft class="h-4 w-4 mr-2" />
          Back to Stories
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { useStories } from '~/composables/useStories';

const route = useRoute()
const router = useRouter()
const { stories, isLoading } = useStories()

const currentId = computed(() => Number(route.params.id))

// Add debug logs to help troubleshoot routing issues
console.log('Route params:', route.params)
console.log('Current ID:', currentId.value)
console.log('All stories:', stories.value)

const story = computed(() => {
  const foundStory = stories.value.find(s => s.id === currentId.value)
  console.log('Found story:', foundStory)
  return foundStory
})

const currentIndex = computed(() => {
  return stories.value.findIndex(s => s.id === currentId.value)
})

const previousStoryId = computed(() => {
  if (currentIndex.value > 0) {
    return stories.value[currentIndex.value - 1].id
  }
  return null
})

const nextStoryId = computed(() => {
  if (currentIndex.value < stories.value.length - 1) {
    return stories.value[currentIndex.value + 1].id
  }
  return null
})

const navigateToStory = (id) => {
  console.log('Navigating to story:', id)
  window.location.href = `/stories/${id}` // Use direct URL navigation as an alternative
  // router.push(`/stories/${id}`)
}
</script>