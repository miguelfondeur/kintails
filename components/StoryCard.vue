<template>
  <div
    class="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    @click="$emit('click')"
  >
    <div v-if="showActions" class="absolute top-2 right-2 flex space-x-1">
      <div class="relative group">
        <button
          @click.stop="$emit('edit')"
          class="p-2 text-gray-500 hover:text-sky-500 transition-colors"
          aria-label="Edit story"
        >
          <Pencil class="h-5 w-5" />
        </button>
        <div class="absolute right-0 top-full mt-2 w-24 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
          <div class="bg-gray-800 text-white text-xs rounded py-1 px-2 text-center">
            Edit story
            <div class="absolute right-0 bottom-full mr-2 border-4 border-transparent border-b-gray-800"></div>
          </div>
        </div>
      </div>
      
      <div class="relative group">
        <button
          @click.stop="$emit('delete')"
          class="p-2 text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Delete story"
        >
          <Trash2 class="h-5 w-5" />
        </button>
        <div class="absolute right-0 top-full mt-2 w-24 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
          <div class="bg-gray-800 text-white text-xs rounded py-1 px-2 text-center">
            Delete story
            <div class="absolute right-0 bottom-full mr-2 border-4 border-transparent border-b-gray-800"></div>
          </div>
        </div>
      </div>
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
      <p class="text-gray-600 line-clamp-3 whitespace-pre-line leading-relaxed">{{ formattedContent }}</p>
    </div>
  </div>
</template>

<script setup>
import { Pencil, Trash2 } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
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

// Format content with better paragraph breaks if it's a single long paragraph
const formattedContent = computed(() => {
  const content = props.story.content || '';
  
  // If content already has line breaks, return as is
  if (content.includes('\n')) {
    return content;
  }
  
  // If it's a short paragraph (less than 200 chars), return as is
  if (content.length < 200) {
    return content;
  }
  
  // Otherwise, try to break it into more readable chunks at sentence boundaries
  const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
  
  // Group sentences into paragraphs of 2-3 sentences
  const paragraphs = [];
  for (let i = 0; i < sentences.length; i += 2) {
    const paragraph = sentences.slice(i, i + 2).join(' ');
    paragraphs.push(paragraph);
  }
  
  return paragraphs.join('\n\n');
})

defineEmits(['click', 'edit', 'delete'])
</script> 