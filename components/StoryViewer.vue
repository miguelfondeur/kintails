<template>
  <div :class="[currentStory ? currentStory.background_color : 'bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50', 'transition-colors duration-300 py-8 flex-1 flex flex-col']">
    <div class="max-w-4xl mx-auto px-4 w-full flex-1 flex flex-col">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center min-h-[50vh]">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>
      </div>

      <!-- Story Content -->
      <div v-else-if="currentStory" class="bg-white rounded-2xl shadow-xl flex-1 flex flex-col">
        <!-- Back Button -->
        <button 
          @click="$emit('back')"
          class="absolute left-4 top-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transform hover:scale-105 transition-all z-10"
          title="Back to stories"
        >
          <ArrowLeft class="h-5 w-5 text-gray-700" />
        </button>
        
        <div class="relative p-6 md:p-10 h-full flex flex-col items-center text-center">
          <!-- Navigation Buttons -->
          <div class="absolute left-[-20px] right-[-20px] top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
            <button
              @click="navigateToPrevious"
              class="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transform hover:scale-105 pointer-events-auto transition-all"
              :class="{ 'pointer-events-none': !hasPreviousStory }"
              :disabled="!hasPreviousStory"
              title="Previous story"
            >
              <ChevronLeft 
                class="h-6 w-6 text-gray-700" 
                :class="{ 'opacity-30': !hasPreviousStory }"
              />
            </button>
            <button
              @click="navigateToNext"
              class="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transform hover:scale-105 pointer-events-auto transition-all"
              :class="{ 'pointer-events-none': !hasNextStory }"
              :disabled="!hasNextStory"
              title="Next story"
            >
              <ChevronRight 
                class="h-6 w-6 text-gray-700" 
                :class="{ 'opacity-30': !hasNextStory }"
              />
            </button>
          </div>
          
          <Transition name="story-content" mode="out-in">
            <div class="w-full" :key="currentStory.id">
              <!-- Story Header -->
              <div class="mb-10 w-full">
                <img 
                  :src="currentStory.avatar_url" 
                  :alt="currentStory.family_member"
                  class="w-36 h-36 rounded-full border-4 border-white shadow-lg mx-auto mb-6"
                />
                
                <h1 class="text-4xl font-bold text-gray-900 mb-3">{{ currentStory.family_member }}</h1>
                
                <h2 class="text-2xl font-semibold text-gray-700 italic mb-2">{{ currentStory.title }}</h2>
                
                <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Written by {{ currentStory.author }}</p>
              </div>
              
              <div :class="[dividerColorClass, 'w-24 h-0.5 rounded-full mx-auto mb-8']"></div>
              
              <!-- Story Content -->
              <div class="w-full bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
                <p class="text-gray-700 whitespace-pre-line text-lg leading-relaxed max-w-3xl mx-auto">{{ currentStory.content }}</p>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Not Found State -->
      <div v-else class="bg-white rounded-2xl shadow-xl p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
        <h2 class="text-2xl font-semibold text-gray-600 mb-4">No stories found</h2>
        <button 
          @click="$emit('back')"
          class="inline-flex items-center px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
        >
          <ArrowLeft class="h-4 w-4 mr-2" />
          Back to Stories
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-vue-next';

const props = defineProps({
  stories: {
    type: Array,
    required: true
  },
  initialStoryId: {
    type: Number,
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:storyId', 'back']);

const currentIndex = ref(0);

// Initialize with the correct story index
watch(() => props.initialStoryId, (newId) => {
  if (newId && props.stories.length) {
    const index = props.stories.findIndex(s => s.id === newId);
    if (index !== -1) {
      currentIndex.value = index;
    }
  }
}, { immediate: true });

// Computed properties
const currentStory = computed(() => 
  props.stories.length > 0 ? props.stories[currentIndex.value] : null
);

const hasPreviousStory = computed(() => currentIndex.value > 0);
const hasNextStory = computed(() => currentIndex.value < props.stories.length - 1);

const dividerColorClass = computed(() => {
  if (!currentStory.value || !currentStory.value.background_color) return 'bg-sky-200';
  
  // Extract color from background class (e.g., 'bg-sky-100' -> 'bg-sky-200')
  const bgParts = currentStory.value.background_color.split('-');
  if (bgParts.length < 3) return 'bg-sky-200';
  
  // Return slightly darker shade for better visibility
  const colorBase = bgParts.slice(1, -1).join('-');
  const colorNumber = parseInt(bgParts[bgParts.length - 1], 10);
  const darkerShade = Math.min(colorNumber + 100, 900); // Go a bit darker but cap at 900
  
  return `bg-${colorBase}-${darkerShade}`;
});

// Navigation methods
const navigateToPrevious = () => {
  if (hasPreviousStory.value) {
    currentIndex.value--;
    updateURL();
  }
};

const navigateToNext = () => {
  if (hasNextStory.value) {
    currentIndex.value++;
    updateURL();
  }
};

// Update the URL without page navigation
const updateURL = () => {
  if (currentStory.value) {
    emit('update:storyId', currentStory.value.id);
    
    // Update browser history without navigation
    const newPath = `/stories?id=${currentStory.value.id}`;
    window.history.pushState(
      { storyId: currentStory.value.id },
      '',
      newPath
    );
  }
};
</script>

<style scoped>
.story-content-enter-active,
.story-content-leave-active {
  transition: all 0.3s ease;
}

.story-content-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.story-content-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style> 