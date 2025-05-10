<template>
  <div class="flex-grow py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header section with title -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">All Stories</h1>
      </div>
      
      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-if="isLoading" class="col-span-3 text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent mx-auto"></div>
        </div>
        
        <div v-else-if="allStories.length === 0" class="col-span-3 text-center py-12">
          <p class="text-gray-500">No stories have been published yet.</p>
          <NuxtLink to="/generate" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
            Create the First Story
          </NuxtLink>
        </div>
        
        <StoryCard 
          v-else
          v-for="story in allStories" 
          :key="story.id" 
          :story="story"
          :link-author="true"
          @click="viewStory(story.id)" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useSupabaseClient } from '#imports'
import StoryCard from '~/components/StoryCard.vue'

// Create reactive refs for stories data
const allStories = ref([])
const isLoading = ref(true)

// Function to load all stories from all users
const loadAllStories = async () => {
  isLoading.value = true
  try {
    const client = useSupabaseClient()
    console.log('Fetching all stories from all users...')
    
    // Get all stories first
    const { data: stories, error: storiesError } = await client
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false })

    if (storiesError) {
      console.error('Error fetching all stories:', storiesError)
      throw storiesError
    }
    
    console.log(`Loaded ${stories?.length || 0} stories total`)
    
    if (!stories || stories.length === 0) {
      allStories.value = []
      isLoading.value = false
      return
    }
    
    // Get all unique user IDs from stories
    const userIds = [...new Set(stories.map(story => story.user_id))]
    
    // Fetch profiles for those users
    const { data: profiles, error: profilesError } = await client
      .from('profiles')
      .select('id, username, avatar_seed, avatar_options')
      .in('id', userIds)
    
    if (profilesError) {
      console.error('Error fetching profiles:', profilesError)
      // Continue anyway, we'll use the story author as fallback
    }
    
    // Create a map of user_id to profile data for easy lookup
    const profileMap = {}
    if (profiles && profiles.length > 0) {
      profiles.forEach(profile => {
        profileMap[profile.id] = profile
      })
    }
    
    // Map stories with profile data
    allStories.value = stories.map(story => {
      const profile = profileMap[story.user_id]
      // Use profile username if available, otherwise use the story's author field
      const authorName = profile?.username || story.author || 'Anonymous'
      
      return {
        ...story,
        author: authorName,
        // Keep original author in separate property if needed
        original_author: story.author,
        // Add profile info
        profile: profile || null
      }
    })
    
  } catch (error) {
    console.error('Error loading all stories:', error)
    allStories.value = []
  } finally {
    isLoading.value = false
  }
}

// Load stories when component mounts
onMounted(() => {
  loadAllStories()
})

const viewStory = (id) => {
  navigateTo(`/stories/view/${id}`)
}
</script> 