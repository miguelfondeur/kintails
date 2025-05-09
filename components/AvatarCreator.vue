<template>
    <div class="bg-white rounded-lg shadow-xl p-6">
      <div class="flex items-center gap-6 mb-8">
        <div class="relative w-24 h-24">
          <img 
            :src="avatarUrl" 
            alt="Avatar Preview"
            class="w-24 h-24 max-w-none rounded-full border-4 border-white shadow-lg animate-float"
          />
        </div>
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Avatar Creator</h2>
          <p class="text-gray-600">Customize your family member's avatar</p>
        </div>
      </div>
  
      <div class="space-y-6">
        <!-- Skin Color -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Skin Color</label>
          <div class="grid grid-cols-6 gap-2">
            <button
              v-for="color in skinColors"
              :key="color"
              @click="options.skinColor = color"
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
              @click="options.hair = style"
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
              <p class="text-center text-sm mt-1 capitalize">{{ style.replace(/([A-Z])/g, ' $1').trim() }}</p>
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
              @click="options.body = style"
              :class="[
                'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                options.body === style
                  ? 'bg-sky-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ style.replace(/([A-Z])/g, ' $1').trim() }}
            </button>
          </div>
        </div>
  
        <!-- Nose Style -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nose Style</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="style in noseStyles"
              :key="style"
              @click="options.nose = style"
              :class="[
                'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                options.nose === style
                  ? 'bg-sky-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ style.replace(/([A-Z])/g, ' $1').trim() }}
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
              @click="options.eyes = style"
              :class="[
                'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                options.eyes === style
                  ? 'bg-sky-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ style.replace(/([A-Z])/g, ' $1').trim() }}
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
              @click="options.mouth = style"
              :class="[
                'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                options.mouth === style
                  ? 'bg-sky-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ style.replace(/([A-Z])/g, ' $1').trim() }}
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
              @click="options.facialHair = style"
              :class="[
                'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                options.facialHair === style
                  ? 'bg-sky-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ style.replace(/([A-Z])/g, ' $1').trim() }}
            </button>
            <button
              @click="options.facialHair = ''"
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
              @click="options.hairColor = color"
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
              @click="options.clothingColor = color"
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
              @click="options.backgroundColor = color"
              :class="[
                'w-8 h-8 rounded-full border-2 transition-all duration-200',
                options.backgroundColor === color ? 'border-sky-500 scale-110 shadow-lg' : 'border-gray-200'
              ]"
              :style="{ backgroundColor: `#${color}` }"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const skinColors = [
    '623d36', '92594b', 'b16a5b', 'd78774', 'e5a07e', 'e7a391', 'eeb4a4'
  ]
  
  const hairStyles = [
    'bald', 'balding', 'bobBangs', 'bobCut', 'bunUndercut', 'buzzcut',
    'curly', 'curlyBun', 'curlyHighTop', 'fade', 'long', 'mohawk',
    'pigtails', 'shortCombover', 'straightBun'
  ]
  
  const bodyStyles = [
    'checkered', 'rounded', 'small', 'squared'
  ]
  
  const noseStyles = [
    'mediumRound', 'smallRound', 'wrinkles'
  ]
  
  const eyeStyles = [
    'glasses', 'happy', 'open', 'sleep', 'sunglasses', 'wink'
  ]
  
  const mouthStyles = [
    'bigSmile', 'frown', 'lips', 'pacifier', 'smile', 'smirk', 'surprise'
  ]
  
  const facialHairStyles = [
    'beardMustache', 'goatee', 'pyramid', 'shadow', 'soulPatch', 'walrus'
  ]
  
  const hairColors = [
    '6c4545', '362c47', 'dee1f5', 'e15c66', 'e16381', 'f27d65', 'f29c65'
  ]
  
  const clothingColors = [
    '6dbb58', '54d7c7', '456dff', '7555ca', 'e24553', 'f3b63a', 'f55d81'
  ]
  
  const backgroundColors = [
    'b6e3f4', 'c0aede', 'ffd5dc', 'ffdfbf', 'bde4a7', 'b4e9f8'
  ]
  
  const options = ref({
    skinColor: 'd78774',
    hair: 'balding',
    body: 'checkered',
    nose: 'wrinkles',
    eyes: 'glasses',
    mouth: 'bigSmile',
    facialHair: 'walrus',
    hairColor: 'dee1f5',
    clothingColor: 'f3b63a',
    backgroundColor: 'bde4a7'
  })
  
  const buildUrlParams = (opts) => {
    const mergedOptions = { ...options.value, ...opts }
    const params = new URLSearchParams()
  
    // Add all non-empty options
    Object.entries(mergedOptions).forEach(([key, value]) => {
      if (value) {
        params.append(key, value)
      }
    })
  
    // Set facial hair probability based on whether facial hair is selected
    params.append('facialHairProbability', mergedOptions.facialHair ? '100' : '0')
  
    // Always add radius for consistent circular shape
    params.append('radius', '50')
  
    return params.toString()
  }
  
  const avatarUrl = computed(() => {
    return `https://api.dicebear.com/7.x/personas/svg?${buildUrlParams()}`
  })
  
  const getPreviewUrl = (overrides) => {
    return `https://api.dicebear.com/7.x/personas/svg?${buildUrlParams(overrides)}`
  }
  
  defineExpose({
    getAvatarUrl: () => avatarUrl.value
  })
  </script>