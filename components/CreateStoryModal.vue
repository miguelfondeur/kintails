<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] overflow-auto">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-6">Create New Story</h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Family Member Name</label>
                <input 
                  v-model="form.familyMember"
                  type="text"
                  required
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input 
                  v-model="form.author"
                  type="text"
                  required
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Story</label>
                <textarea 
                  v-model="form.content"
                  rows="6"
                  required
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
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
              <AvatarCreator ref="avatarCreator" />
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="close"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-md hover:bg-sky-700"
            >
              Create Story
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStories } from '~/composables/useStories'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { addStory } = useStories()
const avatarCreator = ref()

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

const selectBackgroundColor = (color: { class: string }) => {
  form.value.backgroundColor = color.class
}

const close = () => {
  emit('close')
  form.value = {
    familyMember: '',
    author: '',
    title: '',
    content: '',
    backgroundColor: backgroundColors[0].class
  }
}

const handleSubmit = async () => {
  try {
    const avatarUrl = avatarCreator.value?.getAvatarUrl()
    await addStory({
      familyMember: form.value.familyMember,
      author: form.value.author,
      title: form.value.title,
      content: form.value.content,
      avatarUrl,
      backgroundColor: form.value.backgroundColor
    })
    close()
  } catch (error) {
    console.error('Error creating story:', error)
  }
}
</script>