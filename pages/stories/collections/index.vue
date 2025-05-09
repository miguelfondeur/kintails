<template>
  <div class="flex-grow py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">My Stories</h1>
        <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Stories you've created or saved
        </p>
      </div>
      
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-if="isLoading" class="col-span-3 text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent mx-auto"></div>
        </div>
        
        <div v-else-if="stories.length === 0" class="col-span-3 text-center py-12">
          <p class="text-gray-500">You haven't created any stories yet.</p>
          <NuxtLink to="/generate" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700">
            Create Your First Story
          </NuxtLink>
        </div>
        
        <StoryCard 
          v-else
          v-for="story in stories" 
          :key="story.id" 
          :story="story"
          :show-actions="true"
          @click="viewStory(story.id)" 
          @edit="openEditModal(story)"
          @delete="deleteStory(story.id)"
        />
      </div>
    </div>
    
    <StoryModal
      :is-open="isEditModalOpen"
      :story="storyToEdit"
      @close="closeEditModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Pencil, Trash2 } from 'lucide-vue-next'
import { useStories } from '~/composables/useStories'
import StoryCard from '~/components/StoryCard.vue'

const { stories, isLoading, deleteStory } = useStories()
const isEditModalOpen = ref(false)
const storyToEdit = ref(null)

const viewStory = (id) => {
  navigateTo(`/stories/view/${id}`)
}

const openEditModal = (story) => {
  storyToEdit.value = story
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
  storyToEdit.value = null
}
</script> 