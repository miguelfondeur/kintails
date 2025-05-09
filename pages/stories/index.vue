<template>
  <div>
    <!-- This is a redirect page -->
    <div class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>
      <p class="ml-3 text-gray-600">Redirecting...</p>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

// If there's an ID in the URL, redirect to the story view
// Otherwise, redirect to My Stories page
onMounted(() => {
  const { id } = route.query
  if (id) {
    router.replace(`/stories/view/${id}`)
  } else {
    router.replace('/stories/collections')
  }
})
</script>