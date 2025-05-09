<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-50">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent mx-auto mb-4"></div>
        <p class="text-gray-600">Completing authentication...</p>
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