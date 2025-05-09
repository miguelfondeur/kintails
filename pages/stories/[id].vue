<template>
  <div :class="[story ? story.background_color : 'bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50', 'min-h-screen py-8']">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center min-h-[50vh]">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>
      </div>

      <!-- Story Content -->
      <div v-else-if="story" class="bg-white rounded-2xl shadow-xl min-h-[600px]">
        <div class="relative p-6 md:p-10 h-full flex flex-col items-center text-center">
          <!-- Navigation Buttons -->
          <div class="absolute left-[-20px] right-[-20px] top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <NuxtLink
              :to="`/stories/${previousStoryId}`"
              class="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transform hover:scale-105 pointer-events-auto"
              :class="{ 'pointer-events-none': !previousStoryId }"
              title="Previous story"
            >
              <ChevronLeft 
                class="h-6 w-6 text-gray-700" 
                :class="{ 'opacity-30': !previousStoryId }"
              />
            </NuxtLink>
            <NuxtLink
              :to="`/stories/${nextStoryId}`"
              class="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transform hover:scale-105 pointer-events-auto"
              :class="{ 'pointer-events-none': !nextStoryId }"
              title="Next story"
            >
              <ChevronRight 
                class="h-6 w-6 text-gray-700" 
                :class="{ 'opacity-30': !nextStoryId }"
              />
            </NuxtLink>
          </div>

          <!-- Story Header -->
          <div class="mb-10 w-full">
            <img 
              :src="story.avatar_url" 
              :alt="story.family_member"
              class="w-36 h-36 rounded-full border-4 border-white shadow-lg mx-auto mb-6"
            />
            
            <h1 class="text-4xl font-bold text-gray-900 mb-3">{{ story.family_member }}</h1>
            
            <h2 class="text-2xl font-semibold text-gray-700 italic mb-2">{{ story.title }}</h2>
            
            <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Written by {{ story.author }}</p>
          </div>
          
          <div :class="[dividerColorClass, 'w-24 h-0.5 rounded-full mx-auto mb-8']"></div>
          
          <!-- Story Content -->
          <div class="w-full bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
            <p class="text-gray-700 whitespace-pre-line text-lg leading-relaxed max-w-3xl mx-auto">{{ story.content }}</p>
          </div>
        </div>
      </div>

      <!-- Not Found State -->
      <div v-else class="bg-white rounded-2xl shadow-xl p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
        <h2 class="text-2xl font-semibold text-gray-600 mb-4">Story not found</h2>
        <NuxtLink 
          to="/stories"
          class="inline-flex items-center px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
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

const story = computed(() => {
  const foundStory = stories.value.find(s => s.id === currentId.value)
  console.log('Found story:', foundStory)
  return foundStory
})

const dividerColorClass = computed(() => {
  if (!story.value || !story.value.background_color) return 'bg-sky-200'
  
  // Extract color from background class (e.g., 'bg-sky-100' -> 'bg-sky-200')
  const bgParts = story.value.background_color.split('-')
  if (bgParts.length < 3) return 'bg-sky-200'
  
  // Return slightly darker shade for better visibility
  const colorBase = bgParts.slice(1, -1).join('-')
  const colorNumber = parseInt(bgParts[bgParts.length - 1], 10)
  const darkerShade = Math.min(colorNumber + 100, 900) // Go a bit darker but cap at 900
  
  return `bg-${colorBase}-${darkerShade}`
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
</script>