<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div class="fixed inset-0 bg-black/50 transition-opacity duration-300" @click="close"></div>
      <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden relative z-10 transform transition-all duration-300">
        <!-- Sticky Header -->
        <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10 shadow-sm">
          <h2 class="text-2xl font-bold text-gray-800">{{ isEditMode ? 'Edit Story' : 'Create New Story' }}</h2>
          <div class="flex items-center gap-3">
            <transition name="fade">
              <div v-if="previewAvatar" class="h-12 w-12 rounded-full overflow-hidden border-2 border-sky-100 shadow-sm">
                <img :src="previewAvatar" alt="Avatar Preview" class="h-full w-full object-cover" />
              </div>
            </transition>
            <button
              type="button"
              @click="close"
              class="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Scrollable Content -->
        <div class="flex-1 overflow-auto p-6 pb-24">
          <form @submit.prevent="handleSubmit" class="space-y-6" id="storyForm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-5">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Family Member Name</label>
                  <input 
                    v-model="form.familyMember"
                    type="text"
                    required
                    placeholder="Who is this story about?"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
                  />
                </div>
  
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input 
                    v-model="form.author"
                    type="text"
                    required
                    placeholder="Who is writing this story?"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
                  />
                </div>
  
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input 
                    v-model="form.title"
                    type="text"
                    required
                    placeholder="Give your story a title"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
                  />
                </div>
  
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Story</label>
                  <textarea 
                    v-model="form.content"
                    rows="6"
                    required
                    placeholder="Once upon a time..."
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm resize-y"
                  ></textarea>
                </div>
  
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                  <div class="grid grid-cols-4 gap-4">
                    <button
                      v-for="color in backgroundColors"
                      :key="color.class"
                      type="button"
                      @click="selectBackgroundColor(color)"
                      :class="[
                        'w-full h-12 rounded-lg border-2 transition-all duration-200',
                        color.class,
                        form.backgroundColor === color.class ? 'border-sky-500 shadow-md scale-110' : 'border-gray-200'
                      ]"
                    />
                  </div>
                </div>
              </div>
  
              <div>
                <div v-if="isEditMode && isGeneratedAvatar" class="bg-white rounded-lg shadow-xl p-6">
                  <div class="flex items-center gap-6 mb-6">
                    <div class="relative w-32 h-32">
                      <img 
                        :src="previewAvatar" 
                        alt="Generated Avatar"
                        class="w-32 h-32 max-w-none rounded-full border-4 border-white shadow-lg"
                      />
                    </div>
                    <div>
                      <h3 class="text-xl font-bold text-gray-900 mb-2">Generated Avatar</h3>
                      <p class="text-gray-600">This avatar was created by the story generator</p>
                    </div>
                  </div>
                  <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                    <p class="text-sm text-indigo-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                      </svg>
                      Generated avatars cannot be edited. Create a new story if you want to customize the avatar.
                    </p>
                  </div>
                </div>
                <AvatarCreator v-else ref="avatarCreator" @avatar-updated="updatePreviewAvatar" />
              </div>
            </div>
          </form>
        </div>
        
        <!-- Sticky Footer -->
        <div class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3 z-10 shadow-md">
          <button
            type="button"
            @click="close"
            class="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="storyForm"
            class="px-4 py-2.5 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-lg hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors"
          >
            {{ isEditMode ? 'Save Changes' : 'Create Story' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { useStories } from '~/composables/useStories'
  
  const props = defineProps({
    isOpen: Boolean,
    story: {
      type: Object,
      default: null
    }
  })
  
  const emit = defineEmits(['close'])
  
  const { addStory, updateStory } = useStories()
  const avatarCreator = ref()
  const previewAvatar = ref(null)
  
  const backgroundColors = [
    { class: 'bg-sky-100' },
    { class: 'bg-rose-100' },
    { class: 'bg-indigo-100' },
    { class: 'bg-amber-100' },
    { class: 'bg-blue-100' },
    { class: 'bg-green-100' },
    { class: 'bg-purple-100' },
    { class: 'bg-orange-100' }
  ]
  
  const form = ref({
    familyMember: '',
    author: '',
    title: '',
    content: '',
    backgroundColor: backgroundColors[0].class
  })

  const isEditMode = computed(() => !!props.story)
  
  // Check if the avatar was generated from the story generator (has a seed parameter)
  const isGeneratedAvatar = computed(() => {
    return props.story?.avatar_url?.includes('seed=') || false
  })
  
  // Watch for story prop changes to update the form
  watch(() => props.story, (newStory) => {
    if (newStory) {
      form.value = {
        familyMember: newStory.family_member,
        author: newStory.author,
        title: newStory.title,
        content: newStory.content,
        backgroundColor: newStory.background_color
      }
      previewAvatar.value = newStory.avatar_url
    }
  }, { immediate: true })

  // Set up avatar when in edit mode
  onMounted(() => {
    if (props.isOpen && props.story && avatarCreator.value && !isGeneratedAvatar.value) {
      setTimeout(() => {
        avatarCreator.value.setAvatarUrl(props.story.avatar_url)
      }, 100)
    }
  })
  
  const updatePreviewAvatar = (url) => {
    previewAvatar.value = url
  }
  
  const selectBackgroundColor = (color) => {
    form.value.backgroundColor = color.class
  }
  
  const resetForm = () => {
    form.value = {
      familyMember: '',
      author: '',
      title: '',
      content: '',
      backgroundColor: backgroundColors[0].class
    }
    previewAvatar.value = null
  }

  const close = () => {
    emit('close')
    resetForm()
  }
  
  const handleSubmit = async () => {
    try {
      // Get the avatar URL - either from the editor or preserve the generated one
      const avatarUrl = isGeneratedAvatar.value 
        ? previewAvatar.value 
        : avatarCreator.value?.getAvatarUrl() || previewAvatar.value
      
      const storyData = {
        family_member: form.value.familyMember,
        author: form.value.author,
        title: form.value.title,
        content: form.value.content,
        avatar_url: avatarUrl,
        background_color: form.value.backgroundColor
      }

      if (isEditMode.value) {
        await updateStory(props.story.id, storyData)
      } else {
        await addStory(storyData)
      }
      
      close()
    } catch (error) {
      console.error(`Error ${isEditMode.value ? 'updating' : 'creating'} story:`, error)
    }
  }
  </script>

<style scoped>
input, textarea {
  caret-color: #4285F4; /* Ensures cursor is visible */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 