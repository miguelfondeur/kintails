<template>
  <footer class="bg-white border-t border-gray-200 mt-auto">
    <div class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand Section -->
        <div class="text-center md:text-left">
          <div class="flex items-center justify-center md:justify-start mb-4">
            <div class="h-10 w-10 rounded-full bg-[#bde4a7] flex items-center justify-center mr-2">
              <BookOpen class="h-5 w-5 text-green-700" />
            </div>
            <h3 class="text-xl font-bold text-gray-900">KinTales</h3>
          </div>
          <p class="text-gray-600 text-sm">
            Creating silly stories and preserving family memories
          </p>
        </div>

        <!-- Links Section -->
        <div class="text-center">
          <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            Quick Links
          </h4>
          <div class="flex flex-col space-y-2">
            <NuxtLink to="/" class="text-gray-600 hover:text-sky-600 transition-colors">
              Home
            </NuxtLink>
            <NuxtLink to="/about" class="text-gray-600 hover:text-sky-600 transition-colors">
              About
            </NuxtLink>
            <NuxtLink to="/contact" class="text-gray-600 hover:text-sky-600 transition-colors">
              Give Feedback
            </NuxtLink>
          </div>
        </div>

        <!-- Social & Copyright Section -->
        <div class="text-center md:text-right">
          <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            Connect
          </h4>
          <div class="flex justify-center md:justify-end space-x-4 mb-6">
            <a href="#" class="text-gray-500 hover:text-sky-600 transition-colors">
              <Twitter class="h-5 w-5" />
              <span class="sr-only">Twitter</span>
            </a>
            <a href="#" class="text-gray-500 hover:text-purple-600 transition-colors">
              <Instagram class="h-5 w-5" />
              <span class="sr-only">Instagram</span>
            </a>
            <a href="#" class="text-gray-500 hover:text-blue-600 transition-colors">
              <Facebook class="h-5 w-5" />
              <span class="sr-only">Facebook</span>
            </a>
            <a href="#" class="text-gray-500 hover:text-blue-800 transition-colors">
              <Linkedin class="h-5 w-5" />
              <span class="sr-only">LinkedIn</span>
            </a>
          </div>
          <p class="text-gray-500 text-xs">
            &copy; {{ new Date().getFullYear() }} KinTales. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { BookOpen, Instagram, Facebook, Twitter, Linkedin } from 'lucide-vue-next';
</script> 