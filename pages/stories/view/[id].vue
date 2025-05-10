<template>
  <div :class="[currentStory ? currentStory.background_color : 'bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50', 'flex-grow py-8 transition-colors duration-500']">
    <div v-if="isLoading" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent mx-auto"></div>
    </div>
    
    <div v-else-if="!currentStory" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h1 class="text-2xl font-bold text-gray-900">Story not found</h1>
      <p class="mt-2 text-gray-600">The story you're looking for doesn't exist or has been removed.</p>
      <NuxtLink to="/stories/all" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700">
        Back to All Stories
      </NuxtLink>
    </div>
    
    <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Story Card -->
      <div class="bg-white/90 shadow-xl rounded-2xl backdrop-blur-sm overflow-hidden">
        <!-- Card Header -->
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-start justify-between">
            <div class="flex items-center">
              <div class="w-20 h-20 flex-shrink-0">
                <img 
                  :src="currentStory.avatar_url" 
                  :alt="currentStory.family_member" 
                  class="w-full h-full rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>
              <div class="ml-4">
                <h1 class="text-3xl font-bold text-gray-900">{{ currentStory.title }}</h1>
                <p class="text-gray-600">
                  A <span class="font-bold text-gray-900">{{ currentStory.family_member }}</span> story by 
                  <NuxtLink 
                    :to="`/stories/collections/${encodeURIComponent(currentStory.author)}`" 
                    class="font-medium text-sky-600 hover:text-sky-800"
                  >
                    {{ currentStory.author }}
                  </NuxtLink>
                </p>
              </div>
            </div>
            
            <div class="flex space-x-2">
              <NuxtLink 
                to="/stories/collections" 
                class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowLeft class="h-4 w-4 mr-1" />
                Back
              </NuxtLink>
            </div>
          </div>
        </div>
        
        <!-- Story content -->
        <transition name="fade" mode="out-in">
          <div :key="currentStory.id" class="p-6 md:p-8 prose prose-sky max-w-none h-[400px] overflow-y-auto">
            <p class="whitespace-pre-line text-lg leading-relaxed text-gray-700">{{ formattedContent }}</p>
          </div>
        </transition>
        
        <!-- Card Footer -->
        <div class="p-6 border-t border-gray-100">
          <div class="flex justify-between">
            <button 
              v-if="hasPrevStory" 
              @click="showPreviousStory"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700"
            >
              <ArrowLeft class="h-4 w-4 mr-2" />
              Previous Story
            </button>
            <div v-else></div>
            
            <button 
              v-if="hasNextStory" 
              @click="showNextStory"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700"
            >
              Next Story
              <ArrowRight class="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import { useStories } from '~/composables/useStories'

const route = useRoute()
const router = useRouter()
const { stories, isLoading } = useStories()

// Current story ID
const currentStoryId = ref(parseInt(route.params.id))

// Get current story
const currentStory = computed(() => {
  return stories.value.find(s => s.id === currentStoryId.value) || null
})

// Current index
const currentIndex = computed(() => {
  if (!stories.value.length) return -1
  return stories.value.findIndex(s => s.id === currentStoryId.value)
})

// Check if has previous/next stories
const hasPrevStory = computed(() => currentIndex.value > 0)
const hasNextStory = computed(() => currentIndex.value < stories.value.length - 1 && currentIndex.value !== -1)

// Format content with better paragraph breaks if it's a single long paragraph
const formattedContent = computed(() => {
  if (!currentStory.value) return '';
  
  const content = currentStory.value.content || '';
  
  // If content already has line breaks, return as is
  if (content.includes('\n')) {
    return content;
  }
  
  // If it's a short paragraph (less than 200 chars), return as is
  if (content.length < 200) {
    return content;
  }
  
  // Otherwise, try to break it into more readable chunks at sentence boundaries
  const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
  
  // Group sentences into paragraphs of 2-3 sentences
  const paragraphs = [];
  for (let i = 0; i < sentences.length; i += 2) {
    const paragraph = sentences.slice(i, i + 2).join(' ');
    paragraphs.push(paragraph);
  }
  
  return paragraphs.join('\n\n');
})

// Navigation functions
const showPreviousStory = () => {
  if (hasPrevStory.value) {
    const prevId = stories.value[currentIndex.value - 1].id
    currentStoryId.value = prevId
    updateUrl(prevId)
  }
}

const showNextStory = () => {
  if (hasNextStory.value) {
    const nextId = stories.value[currentIndex.value + 1].id
    currentStoryId.value = nextId
    updateUrl(nextId)
  }
}

// Update URL without navigation
const updateUrl = (storyId) => {
  const newPath = `/stories/view/${storyId}`
  window.history.pushState(
    { storyId },
    '',
    newPath
  )
}

// Handle URL changes (browser back/forward buttons)
watch(() => route.params.id, (newId) => {
  if (newId && parseInt(newId) !== currentStoryId.value) {
    currentStoryId.value = parseInt(newId)
  }
})

// Handle popstate events for browser back/forward navigation
onMounted(() => {
  window.addEventListener('popstate', (event) => {
    if (route.params.id) {
      currentStoryId.value = parseInt(route.params.id)
    }
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 