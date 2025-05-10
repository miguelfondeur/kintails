<template>
  <div class="flex-grow py-12 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header with animated title -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          About KinTales
        </h1>
        <p class="mt-4 text-xl text-gray-600">
          Where family stories come to life
        </p>
      </div>
      
      <!-- Main content in cards -->
      <div class="space-y-10">
        <!-- What is KinTales -->
        <div class="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
          <div class="p-8">
            <div class="flex items-center mb-6">
              <div class="h-12 w-12 rounded-full bg-[#bde4a7] flex items-center justify-center mr-4">
                <BookOpen class="h-6 w-6 text-green-700" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900">What is KinTales?</h2>
            </div>
            
            <p class="text-gray-700 leading-relaxed mb-4">
              KinTales is a fun, creative platform designed to help families create, share, and preserve their stories across generations. 
            </p>
            
            <p class="text-gray-700 leading-relaxed mb-4">
              Whether it's a silly anecdote about Grandpa's fishing trip, a heartwarming memory of your first family vacation, or an amusing tale about your child's adventures, KinTales gives these memories a permanent home.
            </p>
            
            <p class="text-gray-700 leading-relaxed">
              With our AI-powered story generation tools, you can even create imaginative stories featuring your family members as the main characters!
            </p>
          </div>
        </div>
        
        <!-- Features -->
        <div class="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
          <div class="p-8">
            <div class="flex items-center mb-6">
              <div class="h-12 w-12 rounded-full bg-[#456dff] flex items-center justify-center mr-4">
                <Sparkles class="h-6 w-6 text-white" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900">Features</h2>
            </div>
            
            <ul class="space-y-4 text-gray-700">
              <li class="flex items-start">
                <CheckCircle class="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Create custom avatars for family members using the Personas avatar maker</span>
              </li>
              <li class="flex items-start">
                <CheckCircle class="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Write and save your own family stories</span>
              </li>
              <li class="flex items-start">
                <CheckCircle class="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Generate creative tales featuring your loved ones</span>
              </li>
              <li class="flex items-start">
                <CheckCircle class="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Browse stories from other users for inspiration</span>
              </li>
              <li class="flex items-start">
                <CheckCircle class="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Create your own collection of family memories to share</span>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Avatars section -->
        <div class="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
          <div class="p-8">
            <div class="flex items-center mb-6">
              <div class="h-12 w-12 rounded-full bg-[#d78774] flex items-center justify-center mr-4">
                <User class="h-6 w-6 text-white" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900">Our Avatars</h2>
            </div>
            
            <div class="mb-6">
              <div class="flex flex-wrap justify-center gap-6 mb-8">
                <div v-for="(avatar, index) in exampleAvatars" :key="index" 
                  class="relative w-20 h-20 group"
                  :class="[`avatar-${index}`]">
                  <img 
                    :src="avatar" 
                    alt="Example avatar" 
                    class="w-full h-full rounded-full border-2 border-white shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 bg-[#f0f4f8]"
                    @error="handleAvatarError"
                  />
                </div>
              </div>
              
              <p class="text-gray-700 leading-relaxed mb-4">
                Our customizable avatars are powered by DiceBear's Personas, allowing you to create unique, expressive characters for each family member in your stories.
              </p>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p class="text-sm text-gray-600 italic">
                  "This avatar style is a remix of: Personas by Draftbit by Draftbit - draftbit.com, licensed under CC BY 4.0"
                </p>
                <a 
                  href="https://www.dicebear.com/styles/personas" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center mt-2 text-sm font-medium text-sky-600 hover:text-sky-800"
                >
                  Learn more about DiceBear Personas
                  <ArrowRight class="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Team section -->
        <div class="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
          <div class="p-8">
            <div class="flex items-center mb-6">
              <div class="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                <Heart class="h-6 w-6 text-red-500" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900">Made with Love</h2>
            </div>
            
            <p class="text-gray-700 leading-relaxed mb-4">
              KinTales was created by a small team passionate about preserving family stories and making storytelling fun for everyone.
            </p>
            
            <p class="text-gray-700 leading-relaxed">
              We believe that every family has amazing stories worth telling and saving for future generations.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BookOpen, CheckCircle, User, Heart, Sparkles, ArrowRight } from 'lucide-vue-next';
import { ref } from 'vue';

// Example avatar URLs
const exampleAvatars = ref([
  'https://api.dicebear.com/7.x/personas/svg?seed=Grandma',
  'https://api.dicebear.com/7.x/personas/svg?seed=Grandpa',
  'https://api.dicebear.com/7.x/personas/svg?seed=Mom',
  'https://api.dicebear.com/7.x/personas/svg?seed=Dad',
  'https://api.dicebear.com/7.x/personas/svg?seed=Sister',
  'https://api.dicebear.com/7.x/personas/svg?seed=Brother',
]);

// Handle avatar loading errors
const handleAvatarError = (event) => {
  // Set a fallback SVG for avatars that fail to load
  event.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23f0f4f8"/><circle cx="50" cy="40" r="15" fill="%23888"/><path d="M30,70 Q50,90 70,70" stroke="%23888" stroke-width="5" fill="transparent"/></svg>';
};
</script>

<style scoped>
.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

/* Avatar animations with staggered timing */
.avatar-0 { animation: float 4s ease-in-out 0s infinite; }
.avatar-1 { animation: float 4s ease-in-out 0.6s infinite; }
.avatar-2 { animation: float 4s ease-in-out 1.2s infinite; }
.avatar-3 { animation: float 4s ease-in-out 1.8s infinite; }
.avatar-4 { animation: float 4s ease-in-out 2.4s infinite; }
.avatar-5 { animation: float 4s ease-in-out 3s infinite; }
</style> 