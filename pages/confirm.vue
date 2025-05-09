<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-green-50 to-teal-50">
      <div class="text-center bg-white p-8 rounded-lg shadow-lg border border-gray-100 max-w-md w-full">
        <div class="relative mx-auto mb-6">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-sky-500 border-t-transparent mx-auto"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-sky-500 text-lg">👋</span>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Almost there!</h2>
        <p class="text-gray-600 mb-1">Completing your authentication...</p>
        <p class="text-sm text-gray-500">You'll be redirected to your stories in a moment.</p>
      </div>
    </div>
</template>
  
<script setup>
    const user = useSupabaseUser()
    const router = useRouter()
    const client = useSupabaseClient()
    
    // Check if user is already authenticated when the page loads
    onMounted(async () => {
      try {
        // Get the hash from the URL if present (for OAuth callbacks)
        const hash = window.location.hash
        
        if (hash && hash.includes('access_token')) {
          // Let Supabase handle processing the hash for OAuth
          await client.auth.getSession()
        }
        
        // If user is already authenticated, redirect to stories
        if (user.value) {
          router.replace('/stories')
        }
      } catch (error) {
        console.error('Authentication error:', error)
        // In case of error, redirect to login
        router.replace('/login')
      }
    })
    
    // Also watch for authentication state changes
    // This handles the case when the auth state updates after page load
    watch(user, (newUser) => {
        if (newUser) {
          router.replace('/stories')
        }
    }, { immediate: true })
</script>