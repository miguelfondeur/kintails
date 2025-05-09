<template>
    <header class="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <img 
              src="https://api.dicebear.com/7.x/personas/svg?skinColor=d78774&hair=balding&body=checkered&nose=wrinkles&eyes=glasses&mouth=bigSmile&facialHair=walrus&hairColor=dee1f5&clothingColor=f3b63a&backgroundColor=bde4a7&facialHairProbability=100&radius=50" 
              alt="Kintales" 
              class="w-10 h-10 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300" 
            />
            <span class="text-2xl font-bold text-gray-900">Kintales</span>
          </NuxtLink>
  
          <div class="flex items-center gap-4">
            <NuxtLink 
              to="/"
              class="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              :class="{ 'text-sky-600': route.path === '/' }"
            >
              Home
            </NuxtLink>
            <NuxtLink 
              to="/stories"
              class="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              :class="{ 'text-sky-600': route.path.startsWith('/stories') }"
            >
              Stories
            </NuxtLink>
  
            <!-- Auth Buttons -->
            <template v-if="user">
              <button
                @click="handleLogout"
                class="text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center gap-2"
              >
                <LogOut class="w-4 h-4" />
                Sign Out
              </button>
            </template>
            <template v-else>
              <NuxtLink
                to="/login"
                class="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Sign In
              </NuxtLink>
              <NuxtLink
                to="/signup"
                class="px-4 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition-colors"
              >
                Sign Up
              </NuxtLink>
            </template>
          </div>
        </nav>
      </div>
    </header>
  </template>
  
  <script setup>
  import { LogOut } from 'lucide-vue-next';
  
  //Instantiate Supabase and Router
  const route = useRoute()
  const router = useRouter()
  const client = useSupabaseClient()
  const user = useSupabaseUser()
  
  const handleLogout = async () => {
    await client.auth.signOut()
    router.push('/')
  }
  </script>