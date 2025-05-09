<template>
    <div class="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50">
      <AppHeader />
      <StoriesSubnav v-if="showSubnav" />
      <slot />
    </div>
  </template>
  
  <script setup>
  const route = useRoute()
  const showSubnav = computed(() => 
    route.path === '/stories' || 
    route.path === '/generate' || 
    route.path.startsWith('/stories/')
  )
  </script>