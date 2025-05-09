<template>
  <div class="space-y-6">
    <!-- Skin Color -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Skin Color</label>
      <div class="grid grid-cols-6 gap-2">
        <button
          v-for="color in skinColors"
          :key="color"
          @click="updateOption('skinColor', color)"
          :class="[
            'w-8 h-8 rounded-full border-2 transition-all duration-200',
            options.skinColor === color ? 'border-sky-500 scale-110 shadow-lg' : 'border-gray-200'
          ]"
          :style="{ backgroundColor: `#${color}` }"
        />
      </div>
    </div>

    <!-- Hair Style -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Hair Style</label>
      <div class="grid grid-cols-4 gap-4">
        <button
          v-for="style in hairStyles"
          :key="style"
          @click="updateOption('hair', style)"
          :class="[
            'p-2 rounded-lg border-2 transition-all duration-200',
            options.hair === style ? 'border-sky-500 bg-sky-50 shadow-lg' : 'border-gray-200'
          ]"
        >
          <img 
            :src="getPreviewUrl({ hair: style })" 
            :alt="style"
            class="w-full h-auto rounded-full aspect-square object-cover"
          />
          <p class="text-center text-xs mt-1 capitalize">{{ formatName(style) }}</p>
        </button>
      </div>
    </div>

    <!-- Body Type -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Body Type</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="style in bodyStyles"
          :key="style"
          @click="updateOption('body', style)"
          :class="[
            'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
            options.body === style
              ? 'bg-sky-500 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ formatName(style) }}
        </button>
      </div>
    </div>

    <!-- Eyes -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Eyes</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="style in eyeStyles"
          :key="style"
          @click="updateOption('eyes', style)"
          :class="[
            'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
            options.eyes === style
              ? 'bg-sky-500 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ formatName(style) }}
        </button>
      </div>
    </div>

    <!-- Mouth -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Mouth</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="style in mouthStyles"
          :key="style"
          @click="updateOption('mouth', style)"
          :class="[
            'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
            options.mouth === style
              ? 'bg-sky-500 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ formatName(style) }}
        </button>
      </div>
    </div>

    <!-- Facial Hair -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Facial Hair</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="style in facialHairStyles"
          :key="style"
          @click="updateOption('facialHair', style)"
          :class="[
            'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
            options.facialHair === style
              ? 'bg-sky-500 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ formatName(style) }}
        </button>
        <button
          @click="updateOption('facialHair', '')"
          :class="[
            'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
            !options.facialHair
              ? 'bg-sky-500 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          None
        </button>
      </div>
    </div>

    <!-- Hair Color -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Hair Color</label>
      <div class="grid grid-cols-6 gap-2">
        <button
          v-for="color in hairColors"
          :key="color"
          @click="updateOption('hairColor', color)"
          :class="[
            'w-8 h-8 rounded-full border-2 transition-all duration-200',
            options.hairColor === color ? 'border-sky-500 scale-110 shadow-lg' : 'border-gray-200'
          ]"
          :style="{ backgroundColor: `#${color}` }"
        />
      </div>
    </div>

    <!-- Clothing Color -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Clothing Color</label>
      <div class="grid grid-cols-6 gap-2">
        <button
          v-for="color in clothingColors"
          :key="color"
          @click="updateOption('clothingColor', color)"
          :class="[
            'w-8 h-8 rounded-full border-2 transition-all duration-200',
            options.clothingColor === color ? 'border-sky-500 scale-110 shadow-lg' : 'border-gray-200'
          ]"
          :style="{ backgroundColor: `#${color}` }"
        />
      </div>
    </div>

    <!-- Background Color -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
      <div class="grid grid-cols-6 gap-2">
        <button
          v-for="color in backgroundColors"
          :key="color"
          @click="updateOption('backgroundColor', color)"
          :class="[
            'w-8 h-8 rounded-full border-2 transition-all duration-200',
            options.backgroundColor === color ? 'border-sky-500 scale-110 shadow-lg' : 'border-gray-200'
          ]"
          :style="{ backgroundColor: `#${color}` }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props to receive and emit the options
const props = defineProps({
  options: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:options'])

// Available options arrays
const skinColors = [
  '623d36', '92594b', 'b16a5b', 'd78774', 'e5a07e', 'e7a391', 'eeb4a4'
]

const hairStyles = [
  'bald', 'balding', 'bobBangs', 'bobCut', 'bunUndercut', 'buzzcut',
  'curly', 'curlyBun', 'curlyHighTop', 'fade', 'long', 'mohawk',
  'pigtails', 'shortCombover', 'straightBun', 'cap', 'beanie'
]

const bodyStyles = [
  'checkered', 'rounded', 'small', 'squared'
]

const eyeStyles = [
  'glasses', 'happy', 'open', 'sleep', 'sunglasses', 'wink'
]

const mouthStyles = [
  'bigSmile', 'frown', 'lips', 'pacifier', 'smile', 'smirk', 'surprise'
]

const facialHairStyles = [
  'beard', 'beardMustache', 'goatee', 'mustache', 'walrus'
]

const hairColors = [
  '25262b', '4d1e01', '5f3b24', '763e00', 'a55728', 'b99c6b',
  'cfbfad', 'e8e1e1', 'f59797', 'f27272', 'f25244', 'ffb144', 'ffda44'
]

const clothingColors = [
  '6bd9e9', 'ff5a79', 'ffe14d', 'f4d150', '9747ff', '6ecbae',
  'f8e7d4', '242038', 'e12885', '22a699', '5ced73', '4d60ec'
]

const backgroundColors = [
  'b6e3f4', 'ffd5dc', 'ffeead', 'c0eb75', 'd0bdef', '9be0a8',
  'ffcfd7', 'f5eaaa', '87c2eb', 'eee1c4', 'e5b0f5', 'efb19d'
]

// Update an option and emit change
const updateOption = (key, value) => {
  const newOptions = { ...props.options, [key]: value }
  emit('update:options', newOptions)
}

// Format a camelCase name for display
const formatName = (name) => {
  return name.replace(/([A-Z])/g, ' $1').trim()
}

// Generate a preview URL for a hair style
const getPreviewUrl = (overrides = {}) => {
  const baseOptions = {
    skinColor: props.options.skinColor,
    eyes: 'open',
    mouth: 'smile',
    radius: '50'
  }
  
  const params = new URLSearchParams({
    ...baseOptions,
    ...overrides
  })
  
  return `https://api.dicebear.com/7.x/personas/svg?${params.toString()}`
}
</script> 