<template>
  <div class="min-h-screen py-12 px-4">
    <div class="max-w-3xl mx-auto">
      <AvatarCreator ref="avatarCreator" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const avatarCreator = ref()
</script>