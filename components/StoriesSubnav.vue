```vue
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
            route.path === item.path
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
  { name: 'All Stories', path: '/stories' },
  { name: 'Story Generator', path: '/generate' }
]
</script>
```