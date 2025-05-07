<template>
  <div>
    <!-- Hero Section -->
    <section class="relative py-20 px-4 overflow-hidden bg-sky-100">
      <!-- Animated background patterns -->
      <div class="absolute inset-0 -z-10 pattern-background opacity-30"></div>

      <div class="max-w-4xl mx-auto text-center">
        <div class="relative mb-8 inline-block">
          <img 
            src="https://api.dicebear.com/7.x/personas/svg?seed=kintales&backgroundColor=b9e6fe" 
            alt="Kintales" 
            class="w-32 h-32 mx-auto rounded-full shadow-xl animate-float" 
          />
        </div>
        
        <h1 class="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Welcome to KinTales
          <span class="inline-block animate-wave">👋</span>
        </h1>
        
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create silly stories, share family memories, and have fun with storytelling!
        </p>

        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink
            to="/stories"
            class="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-sky-500 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <BookOpen class="h-5 w-5 mr-2" />
            Browse Stories
          </NuxtLink>
          <NuxtLink
            to="/generate"
            class="inline-flex items-center px-6 py-3 text-lg font-medium bg-purple-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Wand2 class="h-5 w-5 mr-2" />
            Generate Story
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Create Magical Stories
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-rose-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="w-14 h-14 bg-rose-200 rounded-xl flex items-center justify-center mb-6">
              <PenLine class="h-7 w-7 text-rose-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Write Stories</h3>
            <p class="text-gray-600">
              Share your family's adventures, from epic tales to silly moments!
            </p>
          </div>

          <div class="bg-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="w-14 h-14 bg-purple-200 rounded-xl flex items-center justify-center mb-6">
              <UserCircle class="h-7 w-7 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Create Characters</h3>
            <p class="text-gray-600">
              Design fun avatars for your family with our character creator!
            </p>
          </div>

          <div class="bg-amber-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="w-14 h-14 bg-amber-200 rounded-xl flex items-center justify-center mb-6">
              <Sparkles class="h-7 w-7 text-amber-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Generate Fun</h3>
            <p class="text-gray-600">
              Let our story generator create wacky tales about your loved ones!
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Avatar Showcase -->
    <section class="py-20 bg-sky-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-12">
          Meet Some Characters
        </h2>
        <div class="flex flex-wrap justify-center gap-8">
          <div v-for="seed in ['grandpa', 'mom', 'dad', 'sister', 'brother']" :key="seed" 
            class="group relative"
          >
            <img 
              :src="`https://api.dicebear.com/7.x/personas/svg?seed=${seed}&backgroundColor=b9e6fe`"
              :alt="seed"
              class="w-24 h-24 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-purple-100">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">
          Start Your Family's Story Today
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          Join thousands of families creating memories and having fun together!
        </p>
        <NuxtLink
          to="/stories"
          class="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-purple-500 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <Heart class="h-5 w-5 mr-2" />
          Create Your First Story
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { BookOpen, Heart, PenLine, Sparkles, UserCircle, Wand2 } from 'lucide-vue-next'
</script>

<style scoped>
.animate-wave {
  animation: wave 2s infinite;
  transform-origin: 70% 70%;
  display: inline-block;
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
</style>