<template>
  <div class="flex-grow py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- User profile header -->
      <div class="mb-10">
        <div v-if="isUserStoriesLoading" class="flex justify-center py-4">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>
        </div>
        
        <div v-else-if="userProfile" class="flex items-start">
          <img 
            :src="profileAvatarUrl" 
            :alt="userProfile.username" 
            class="w-20 h-20 rounded-full border-4 border-white shadow-lg mr-6"
          />
          <div>
            <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">{{ userProfile.username }}'s Stories</h1>
            <p class="text-sm text-gray-500 flex items-center mt-2">
              <span class="inline-block w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
              {{ userStoriesCount }} {{ userStoriesCount === 1 ? 'story' : 'stories' }}
            </p>
          </div>
        </div>
        
        <div v-else class="text-left">
          <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Stories Collection</h1>
          <p class="mt-3 text-md text-gray-500">
            Explore stories created by this author
          </p>
        </div>
      </div>
      
      <!-- Stories grid -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-if="isUserStoriesLoading" class="col-span-3 text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent mx-auto"></div>
        </div>
        
        <div v-else-if="!userStories || userStories.length === 0" class="col-span-3 text-center py-12">
          <p class="text-gray-500">This user hasn't published any stories yet.</p>
          <NuxtLink to="/stories/explore" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700">
            Explore More Storytellers
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
import { ref, computed, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import { useRoute, navigateTo } from '#imports'
import StoryCard from '~/components/StoryCard.vue'

const route = useRoute()
const userId = route.params.userId
const client = useSupabaseClient()

// Create reactive refs for our data
const userStories = ref([])
const isUserStoriesLoading = ref(true)
const userProfile = ref(null)

// Create a computed property for the story count with defensive checks
const userStoriesCount = computed(() => {
  return userStories.value?.length || 0
})

// Load stories when component mounts
onMounted(async () => {
  isUserStoriesLoading.value = true
  
  try {
    console.log(`Loading stories for user: ${userId}`)
    
    // Fetch user profile directly
    const { data: profile, error: profileError } = await client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (profileError) {
      console.error('Error fetching user profile:', profileError)
    } else if (profile) {
      userProfile.value = profile
      console.log('User profile loaded:', profile.username)
    }
    
    // Fetch user's stories - without trying to join with profiles
    const { data: stories, error: storiesError } = await client
      .from('stories')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (storiesError) {
      console.error('Error fetching user stories:', storiesError)
      throw storiesError
    }
    
    if (stories && Array.isArray(stories)) {
      // Add profile data to each story
      userStories.value = stories.map(story => ({
        ...story,
        profiles: userProfile.value // Add the profile we already fetched to each story
      }))
      
      console.log(`Loaded ${stories.length} stories for user`)
    } else {
      userStories.value = []
    }
    
    // If we still don't have a profile, create a fallback
    if (!userProfile.value) {
      userProfile.value = {
        username: `User-${userId.substring(0, 6)}`,
        avatar_seed: userId,
        avatar_options: null
      }
    }
  } catch (error) {
    console.error("Error loading user stories:", error)
    userStories.value = []
    
    // Ensure we have a fallback profile even in case of error
    if (!userProfile.value) {
      userProfile.value = {
        username: `User-${userId.substring(0, 6)}`,
        avatar_seed: userId,
        avatar_options: null
      }
    }
  } finally {
    isUserStoriesLoading.value = false
  }
})

// Generate avatar URL from profile data
const profileAvatarUrl = computed(() => {
  if (!userProfile.value || !userProfile.value.avatar_seed) {
    return `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(userId)}&backgroundColor=b6e3f4&radius=50`
  }
  
  // If no avatar options, just use the seed with default settings
  if (!userProfile.value.avatar_options) {
    return `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(userProfile.value.avatar_seed)}&backgroundColor=b6e3f4&radius=50`
  }
  
  try {
    // Parse avatar options if it's a string
    const avatarOptions = typeof userProfile.value.avatar_options === 'string' 
      ? JSON.parse(userProfile.value.avatar_options) 
      : userProfile.value.avatar_options
    
    // Create parameters for DiceBear
    const diceBearParams = {
      seed: userProfile.value.avatar_seed,
      skinColor: avatarOptions.skinColor,
      hair: avatarOptions.hair,
      hairColor: avatarOptions.hairColor,
      eyes: avatarOptions.eyes,
      mouth: avatarOptions.mouth,
      body: avatarOptions.body,
      facialHair: avatarOptions.facialHair,
      clothingColor: avatarOptions.clothingColor,
      backgroundColor: avatarOptions.backgroundColor,
      radius: '50'
    }
    
    // Filter out undefined parameters
    const filteredParams = Object.fromEntries(
      Object.entries(diceBearParams).filter(([_, value]) => value !== undefined && value !== '')
    )
    
    const params = new URLSearchParams(filteredParams)
    return `https://api.dicebear.com/7.x/personas/svg?${params.toString()}`
  } catch (error) {
    console.error('Error generating avatar URL:', error)
    return `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(userProfile.value.avatar_seed)}&backgroundColor=b6e3f4&radius=50`
  }
})

// Navigate to view story
const viewStory = (id) => {
  navigateTo(`/stories/view/${id}`)
}
</script> 