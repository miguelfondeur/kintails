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

// Redirect to stories page once authenticated
watch(user, (newUser) => {
  if (newUser) {
    router.push('/stories')
  }
})
</script>