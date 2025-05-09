<template>
  <div class="flex-grow py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header section with title and new story button -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">My Stories</h1>
        <div class="flex space-x-3">
          <NuxtLink
            to="/generate"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <Sparkles class="h-5 w-5 mr-2" />
            Story Generator
          </NuxtLink>
          <button
            @click="openNewStoryModal"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            <PlusCircle class="h-5 w-5 mr-2" />
            New Story
          </button>
        </div>
      </div>
      
      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-if="isLoading" class="col-span-3 text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent mx-auto"></div>
        </div>
        
        <div v-else-if="stories.length === 0" class="col-span-3 text-center py-12">
          <p class="text-gray-500">You haven't created any stories yet.</p>
          <button
            @click="openNewStoryModal"
            class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Create Your First Story
          </button>
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
    
    <!-- Edit Story Modal -->
    <StoryModal
      :is-open="isEditModalOpen"
      :story="storyToEdit"
      @close="closeEditModal"
    />
    
    <!-- Create Story Modal -->
    <CreateStoryModal
      :is-open="isCreateModalOpen"
      @close="closeCreateModal"
      @story-created="onStoryCreated"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Pencil, Trash2, PlusCircle, Sparkles } from 'lucide-vue-next'
import { useStories } from '~/composables/useStories'
import StoryCard from '~/components/StoryCard.vue'
import CreateStoryModal from '~/components/CreateStoryModal.vue'
import StoryModal from '~/components/StoryModal.vue'

const { stories, isLoading, deleteStory } = useStories()
const isEditModalOpen = ref(false)
const storyToEdit = ref(null)
const isCreateModalOpen = ref(false)

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

const openNewStoryModal = () => {
  isCreateModalOpen.value = true
}

const closeCreateModal = () => {
  isCreateModalOpen.value = false
}

const onStoryCreated = (storyId) => {
  // Optionally navigate to the new story or just refresh the list
  closeCreateModal()
}
</script> 