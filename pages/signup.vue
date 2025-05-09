<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 px-4">
      <div class="max-w-md w-full">
        <div class="text-center mb-8">
          <img 
            src="https://api.dicebear.com/7.x/personas/svg?skinColor=d78774&hair=balding&body=checkered&nose=wrinkles&eyes=glasses&mouth=bigSmile&facialHair=walrus&hairColor=dee1f5&clothingColor=f3b63a&backgroundColor=bde4a7&facialHairProbability=100&radius=50" 
            alt="Kintales" 
            class="w-20 h-20 mx-auto rounded-full shadow-lg mb-4 border-4 border-white" 
          />
          <h1 class="text-3xl font-bold text-gray-900">Create Account</h1>
          <p class="text-gray-600 mt-2">Start sharing your family stories</p>
        </div>
  
        <div class="bg-white p-8 rounded-xl shadow-xl">
          <!-- Google Signup Button - Placed above the form -->
          <button
            type="button"
            @click="handleGoogleSignup"
            :disabled="loading"
            class="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 flex items-center justify-center gap-2 mb-6"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" class="w-5 h-5" />
            Sign up with Google
          </button>
          
          <div class="relative my-6">
            <hr class="border-gray-300" />
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="bg-white px-4 text-sm text-gray-500">or continue with email</span>
            </div>
          </div>

          <form @submit.prevent="handleSignup" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                v-model="email"
                type="email"
                required
                placeholder="your.email@example.com"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                v-model="password"
                type="password"
                required
                minlength="6"
                placeholder="6+ characters"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
  
            <div v-if="error" class="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              {{ error }}
            </div>
  
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 px-4 bg-sky-600 text-white rounded-lg hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>{{ loading ? 'Creating account...' : 'Create Account' }}</span>
              <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <svg v-if="loading" class="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          </form>
  
          <div class="mt-6 text-center text-sm">
            <p class="text-gray-600">
              Already have an account?
              <NuxtLink to="/login" class="text-sky-600 hover:text-sky-700 font-medium">
                Sign in
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  //Initialize Supabase and Router
  const client = useSupabaseClient()
  const user = useSupabaseUser()
  const router = useRouter()
  
  //Refs
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const loading = ref(false)
  
  // Redirect if already logged in
  watch(user, (newUser) => {
    if (newUser) {
      router.push('/stories')
    }
  })
  
  const handleSignup = async () => {
    try {
      loading.value = true
      error.value = ''
      
      const { error: err } = await client.auth.signUp({
        email: email.value,
        password: password.value
      })
  
      if (err) throw err
      
      router.push('/stories')
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  const handleGoogleSignup = async () => {
    try {
      loading.value = true
      error.value = ''
      
      const { error: err } = await client.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/confirm`
        }
      })
  
      if (err) throw err
    } catch (err) {
      error.value = err.message
      loading.value = false
    }
  }
  </script>