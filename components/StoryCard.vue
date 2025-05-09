<template>
  <div
    class="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    @click="$emit('click')"
  >
    <div v-if="showActions" class="absolute top-2 right-2 flex space-x-1">
      <button
        @click.stop="$emit('edit')"
        class="p-2 text-gray-500 hover:text-sky-500 transition-colors"
        title="Edit story"
      >
        <Pencil class="h-5 w-5" />
      </button>
      <button
        @click.stop="$emit('delete')"
        class="p-2 text-gray-500 hover:text-red-500 transition-colors"
        title="Delete story"
      >
        <Trash2 class="h-5 w-5" />
      </button>
    </div>
    
    <div class="block p-6 cursor-pointer">
      <div class="flex items-center mb-4">
        <img 
          :src="story.avatar_url" 
          :alt="story.family_member"
          class="w-16 h-16 rounded-full mr-4 border-2 border-white shadow-md"
        />
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ story.family_member }}</h2>
          <p class="text-sm text-gray-500">by 
            <span v-if="!linkAuthor">{{ story.author }}</span>
            <NuxtLink 
              v-else
              :to="`/stories/collections/${encodeURIComponent(story.author)}`" 
              class="text-sky-600 hover:text-sky-800"
              @click.stop
            >
              {{ story.author }}
            </NuxtLink>
          </p>
        </div>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">{{ story.title }}</h3>
      <p class="text-gray-600 line-clamp-3">{{ story.content }}</p>
    </div>
  </div>
</template>

<script setup>
import { Pencil, Trash2 } from 'lucide-vue-next'

defineProps({
  story: {
    type: Object,
    required: true
  },
  showActions: {
    type: Boolean,
    default: false
  },
  linkAuthor: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click', 'edit', 'delete'])
</script> 