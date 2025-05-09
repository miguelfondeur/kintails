<template>
  <div class="flex-grow py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- User profile header -->
      <div class="text-center mb-10">
        <div v-if="isLoading" class="flex justify-center py-4">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>
        </div>
        
        <div v-else-if="userProfile" class="flex flex-col items-center">
          <img 
            :src="userProfile.avatar_url || 'https://api.dicebear.com/7.x/personas/svg?seed=default&backgroundColor=b6e3f4&radius=50'" 
            :alt="userProfile.name" 
            class="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-4"
          />
          <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">{{ userProfile.name || userName }}'s Stories</h1>
          <p v-if="userProfile.bio" class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            {{ userProfile.bio }}
          </p>
        </div>
        
        <div v-else class="text-center">
          <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">{{ userName }}'s Stories</h1>
          <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Explore stories created by this author
          </p>
        </div>
      </div>
      
      <!-- Stories grid -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-if="isLoading" class="col-span-3 text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent mx-auto"></div>
        </div>
        
        <div v-else-if="userStories.length === 0" class="col-span-3 text-center py-12">
          <p class="text-gray-500">This user hasn't published any stories yet.</p>
          <NuxtLink to="/stories/all" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700">
            Browse All Stories
          </NuxtLink>
        </div>
        
        <StoryCard 
          v-else
          v-for="story in userStories" 
          :key="story.id" 
          :story="story"
          :link-author="false"
          @click="viewStory(story.id)" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStories } from '~/composables/useStories'
import StoryCard from '~/components/StoryCard.vue'

const route = useRoute()
const userId = route.params.userId

// Format user display name from userId
const userName = computed(() => {
  if (!userId) return 'User'
  
  // If userId is an email, use part before @
  if (userId.includes('@')) {
    return userId.split('@')[0]
  }
  
  // Otherwise capitalize first letter of each word
  return userId
    .split(/[-_.]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

const { stories, isLoading } = useStories()

// In a real app, we would fetch the user profile from an API
// For now, we'll mock this with a simple ref
const userProfile = ref(null)

// Filter stories by user ID
const userStories = computed(() => {
  if (!stories.value) return []
  
  // In a real app, this would filter by actual user ID
  // For now, filter by author (case insensitive)
  return stories.value.filter(story => {
    // This is a simplified example - in a real app we'd use the actual user ID
    // For now, match either userName or userId to author
    const author = story.author?.toLowerCase() || ''
    return author.includes(userId.toLowerCase()) || 
           author.includes(userName.value.toLowerCase())
  })
})

// Navigate to view story
const viewStory = (id) => {
  navigateTo(`/stories/view/${id}`)
}
</script> 