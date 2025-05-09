import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ]
  },

  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/', '/signup'],
      cookieRedirect: false
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true
    }
  },
  
  nitro: {
    // Use the appropriate preset based on the deployment platform
    preset: process.env.NETLIFY ? 'netlify' : process.env.VERCEL ? 'vercel' : 'node-server',
    // Always use 'dist' as the output directory regardless of platform
    output: {
      dir: 'dist',
      publicDir: 'dist'
    }
  },
});