<template>
    <div class="bg-white rounded-lg shadow-xl p-6">
      <div class="flex items-center gap-6 mb-8">
        <ClientOnly>
          <div class="relative w-32 h-32">
            <img 
              :src="avatarUrl" 
              alt="Generated Avatar"
              class="w-full h-full rounded-full border-4 border-white shadow-lg animate-float"
            />
          </div>
          <template #fallback>
            <div class="relative w-32 h-32 bg-gray-200 rounded-full border-4 border-white"></div>
          </template>
        </ClientOnly>
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Random Story Generator</h2>
          <p class="text-gray-600">Create a random story with a unique character</p>
        </div>
      </div>
  
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Character Name</label>
          <input 
            v-model="characterName"
            type="text"
            required
            placeholder="Enter a name for your character"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
          />
        </div>
  
        <div v-if="generatedStory" class="space-y-4 p-4 bg-sky-50 rounded-lg border border-sky-100">
          <h3 class="text-xl font-semibold text-gray-900">{{ generatedStory.title }}</h3>
          <p class="text-gray-700 whitespace-pre-line">{{ generatedStory.content }}</p>
        </div>
  
        <div class="flex gap-4">
          <button
            @click="generateNewAvatar"
            class="flex-1 px-4 py-2.5 text-sm font-medium text-sky-700 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            New Avatar
          </button>
          <button
            @click="generateStory"
            :disabled="!characterName"
            class="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Generate Story
          </button>
        </div>
  
        <div v-if="generatedStory && !savedStoryId" class="flex justify-end">
          <button
            @click="saveStory"
            class="px-4 py-2.5 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Save Story
          </button>
        </div>
  
        <!-- Post-save navigation options -->
        <div v-if="savedStoryId" class="flex justify-center gap-4">
          <NuxtLink 
            :to="`/stories/${savedStoryId}`"
            class="px-4 py-2.5 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-lg hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            View Story
          </NuxtLink>
          <NuxtLink 
            to="/stories"
            class="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            All Stories
          </NuxtLink>
          <button
            @click="resetGenerator"
            class="px-4 py-2.5 text-sm font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Generate Another
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useStoryTemplates } from '~/stores/storyTemplates'
  import { useStories } from '~/composables/useStories'
  
  const templates = useStoryTemplates()
  const { addStory } = useStories()
  
  const characterName = ref('')
  const seed = ref('')
  const generatedStory = ref(null)
  const savedStoryId = ref(null)
  const avatarReady = ref(false)
  
  // Initialize seed on client-side only
  onMounted(() => {
    seed.value = Math.random().toString(36).substring(7)
    avatarReady.value = true
  })
  
  const avatarUrl = computed(() => {
    if (!seed.value) return ''
    
    const params = new URLSearchParams({
      seed: seed.value,
      backgroundColor: 'b6e3f4',
      radius: '50'
    })
    return `https://api.dicebear.com/7.x/personas/svg?${params.toString()}`
  })
  
  const generateNewAvatar = () => {
    seed.value = Math.random().toString(36).substring(7)
  }
  
  const generateStory = () => {
    if (characterName.value) {
      generatedStory.value = templates.generateStory(characterName.value)
      savedStoryId.value = null
    }
  }
  
  const saveStory = async () => {
    if (generatedStory.value && characterName.value) {
      const savedStory = await addStory({
        family_member: characterName.value,
        author: 'Story Generator',
        title: generatedStory.value.title,
        content: generatedStory.value.content,
        avatar_url: avatarUrl.value,
        background_color: 'bg-sky-100'
      });
      console.log(savedStory);
      savedStoryId.value = savedStory.id
    }
  }
  
  const resetGenerator = () => {
    characterName.value = ''
    generatedStory.value = null
    savedStoryId.value = null
    generateNewAvatar()
  }
  </script>
  
  <style scoped>
  input {
    caret-color: #4285F4; /* Ensures cursor is visible */
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  </style>