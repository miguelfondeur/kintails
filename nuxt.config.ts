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
    // Static preset for static site generation
    preset: 'static',
    // Output to the dist directory
    output: {
      dir: 'dist',
      publicDir: 'dist'
    }
  },
  
  // Disable SSR for static site generation
  ssr: false
});