<template>
  <div class="flex justify-center items-center min-h-[50vh]">
    <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>
  </div>
</template>

<script setup>
// This page is now just a redirect to the new story viewing approach
// Redirect to /stories?id=X
const route = useRoute();
const router = useRouter();

// Get the story ID from the route parameter
const storyId = route.params.id;

// Redirect to the main stories page with the ID as a query parameter
onMounted(() => {
  router.replace({ path: '/stories', query: { id: storyId } });
});
</script>