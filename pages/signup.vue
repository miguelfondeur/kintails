<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-50 px-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <img 
          src="https://api.dicebear.com/7.x/personas/svg?seed=kintales&backgroundColor=b9e6fe" 
          alt="Kintales" 
          class="w-20 h-20 mx-auto rounded-full shadow-lg mb-4" 
        />
        <h1 class="text-3xl font-bold text-gray-900">Create Account</h1>
        <p class="text-gray-600 mt-2">Start sharing your family stories</p>
      </div>

      <div class="bg-white p-8 rounded-xl shadow-xl">
        <form @submit.prevent="handleSignup" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <div v-if="error" class="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 px-4 bg-sky-600 text-white rounded-lg hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50"
          >
            {{ loading ? 'Creating account...' : 'Create Account' }}
          </button>

          <button
            type="button"
            @click="handleGoogleSignup"
            :disabled="loading"
            class="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" class="w-5 h-5" />
            Sign up with Google
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

<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

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
  } catch (err: any) {
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
  } catch (err: any) {
    error.value = err.message
    loading.value = false
  }
}
</script>