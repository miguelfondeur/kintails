<template>
  <div class="flex-grow py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="isLoading" class="flex justify-center py-12">
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
        <div v-if="filteredUsers.length === 0" class="text-center py-12">
          <p class="text-gray-500">No storytellers found matching your search.</p>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="user in filteredUsers" 
            :key="user.id"
            class="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:translate-y-[-4px]"
            @click="goToCollection(user.id)"
          >
            <div class="block p-6">
              <div class="flex items-center mb-4">
                <img 
                  :src="generateAvatarUrl(user.avatar_seed, user.avatar_options)" 
                  :alt="user.username"
                  class="w-16 h-16 rounded-full mr-4 border-2 border-white shadow-md"
                />
                <div>
                  <h2 class="text-xl font-semibold text-gray-900">{{ user.username }}</h2>
                  <p class="text-sm text-gray-500 flex items-center">
                    <span class="inline-block w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                    {{ user.story_count || 0 }} {{ user.story_count === 1 ? 'story' : 'stories' }}
                  </p>
                </div>
              </div>
              <p class="text-gray-600">Browse the collection of stories by this storyteller</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search } from 'lucide-vue-next'
import { useSupabaseClient } from '#imports'
import { useRouter } from '#imports'

// Initialize with reactive data
const isLoading = ref(true)
const searchQuery = ref('')
const users = ref([])
const router = useRouter()

// Generate avatar URL from user profile data
function generateAvatarUrl(seed, avatarOptions) {
  if (!seed) {
    return 'https://api.dicebear.com/7.x/personas/svg?backgroundColor=b6e3f4&radius=50'
  }
  
  // If no avatar options, just use the seed with default settings
  if (!avatarOptions) {
    return `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4&radius=50`
  }
  
  try {
    // Parse the avatar options if it's a string
    const options = typeof avatarOptions === 'string' 
      ? JSON.parse(avatarOptions) 
      : avatarOptions
    
    // Create a clean object with only the properties DiceBear expects
    const diceBearParams = {
      seed,
      skinColor: options.skinColor,
      hair: options.hair,
      hairColor: options.hairColor,
      eyes: options.eyes,
      mouth: options.mouth,
      body: options.body,
      facialHair: options.facialHair,
      clothingColor: options.clothingColor,
      backgroundColor: options.backgroundColor,
      radius: '50'
    }
    
    // Filter out any undefined parameters
    const filteredParams = Object.fromEntries(
      Object.entries(diceBearParams).filter(([_, value]) => value !== undefined && value !== '')
    )
    
    const params = new URLSearchParams(filteredParams)
    return `https://api.dicebear.com/7.x/personas/svg?${params.toString()}`
  } catch (error) {
    console.error('Error generating avatar URL:', error)
    return `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4&radius=50`
  }
}

// Filter users based on search
const filteredUsers = computed(() => {
  if (!searchQuery.value || !users.value) return users.value || []
  
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user => 
    user.username && user.username.toLowerCase().includes(query)
  )
})

// Load users and their story counts
onMounted(async () => {
  isLoading.value = true
  try {
    // Use Supabase client directly
    const client = useSupabaseClient()
    console.log('Loading users and story counts from Supabase...')
    
    // First, get all profiles
    const { data: profiles, error: profilesError } = await client
      .from('profiles')
      .select('id, username, avatar_seed, avatar_options, created_at')
    
    if (profilesError) {
      console.error('Error fetching profiles:', profilesError)
      throw profilesError
    }
    
    if (!profiles || !Array.isArray(profiles)) {
      console.warn('No profiles returned from database')
      users.value = []
      return
    }
    
    console.log(`Loaded ${profiles.length} user profiles`)
    
    // Get all stories to count by user
    const { data: allStories, error: storiesError } = await client
      .from('stories')
      .select('user_id')
    
    let storyCountMap = {}
    
    if (!storiesError && allStories && Array.isArray(allStories)) {
      // Count stories by user_id
      storyCountMap = allStories.reduce((acc, story) => {
        acc[story.user_id] = (acc[story.user_id] || 0) + 1
        return acc
      }, {})
      
      console.log(`Counted stories for ${Object.keys(storyCountMap).length} users`)
    } else {
      console.warn('Could not load stories for counting', storiesError)
    }
    
    // Combine profiles with story counts
    const usersWithCounts = profiles.map(profile => ({
      ...profile,
      story_count: storyCountMap[profile.id] || 0
    }));
    
    // Sort by story count (descending), but only show users with at least one story
    users.value = usersWithCounts
      .filter(user => user.story_count > 0)
      .sort((a, b) => b.story_count - a.story_count)
    
  } catch (err) {
    console.error("Error loading users:", err)
    users.value = []
  } finally {
    isLoading.value = false
  }
})

// Navigation function
const goToCollection = (userId) => {
  router.push(`/stories/collections/${encodeURIComponent(userId)}`)
}
</script>


