<template>
    <div class="bg-gray-50 border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-8">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="py-4 px-1 border-b-2 font-medium text-sm transition-colors"
            :class="[
              isActive(item)
                ? 'border-sky-500 text-sky-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const route = useRoute()
  
  const navItems = [
    { name: 'My Stories', path: '/stories/collections' },
    { name: 'All Stories', path: '/stories/all' },
    { name: 'Discover', path: '/stories/explore' },
    { name: 'Story Generator', path: '/generate' }
  ]
  
  // Define the type for nav items
  type NavItem = {
    name: string;
    path: string;
  }
  
  // Check if a nav item is active
  const isActive = (item: NavItem) => {
    // For the view page, highlight the appropriate section
    if (route.path.startsWith('/stories/view/')) {
      // When viewing a story, highlight "My Stories"
      return item.path === '/stories/collections'
    }
    
    // For other routes, check if we're on the item's path
    return route.path === item.path || route.path.startsWith(item.path + '/')
  }
  </script>