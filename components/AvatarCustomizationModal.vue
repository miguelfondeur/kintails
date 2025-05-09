<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500/75 transition-opacity" @click="$emit('close')"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
      
      <div class="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full relative z-10">
        <div class="absolute top-0 right-0 pt-4 pr-4">
          <button 
            @click="$emit('close')" 
            class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            <span class="sr-only">Close</span>
            <X class="h-6 w-6" />
          </button>
        </div>
        
        <div class="bg-white p-6">
          <div class="flex items-center mb-6">
            <div class="relative mr-6">
              <img 
                :src="avatarUrl" 
                alt="Avatar Preview"
                class="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-800">Customize Your Avatar</h2>
              <p class="text-gray-600">Choose features to personalize your avatar</p>
            </div>
          </div>
          
          <div class="overflow-y-auto max-h-[60vh]">
            <AvatarEditor 
              :options="options" 
              @update:options="updateOptions"
            />
          </div>
          
          <div class="mt-8 sm:mt-6 flex justify-end gap-3">
            <button 
              @click="$emit('close')"
              class="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Cancel
            </button>
            <button 
              @click="save"
              class="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { X } from 'lucide-vue-next';
import AvatarEditor from '~/components/AvatarEditor.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  options: {
    type: Object,
    required: true
  },
  seed: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['close', 'update:options', 'save']);

const updateOptions = (newOptions) => {
  emit('update:options', newOptions);
};

const save = () => {
  emit('save');
};

const avatarUrl = computed(() => {
  if (!props.seed) return '';
  
  // Create a clean object with only the properties DiceBear expects
  const diceBearParams = {
    seed: props.seed,
    skinColor: props.options.skinColor,
    hair: props.options.hair,
    hairColor: props.options.hairColor,
    eyes: props.options.eyes,
    mouth: props.options.mouth,
    body: props.options.body,
    facialHair: props.options.facialHair,
    clothingColor: props.options.clothingColor,
    backgroundColor: props.options.backgroundColor,
    radius: '50'
  };
  
  // Filter out any undefined parameters
  const filteredParams = Object.fromEntries(
    Object.entries(diceBearParams).filter(([_, value]) => value !== undefined && value !== '')
  );
  
  const params = new URLSearchParams(filteredParams);
  return `https://api.dicebear.com/7.x/personas/svg?${params.toString()}`;
});
</script>

<style scoped>
/* Ensure modal appears above other content */
.fixed.inset-0.z-50 {
  z-index: 100;
}
</style> 