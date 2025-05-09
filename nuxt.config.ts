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
  app: {
    head: {
      title: 'KinTales',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Share and preserve your family stories' },
        { name: 'theme-color', content: '#0ea5e9' },
        { name: 'msapplication-TileColor', content: '#0ea5e9' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'icon', type: 'image/svg+xml', href: 'https://api.dicebear.com/7.x/personas/svg?skinColor=d78774&hair=balding&body=checkered&nose=wrinkles&eyes=glasses&mouth=bigSmile&facialHair=walrus&hairColor=dee1f5&clothingColor=f3b63a&backgroundColor=bde4a7&facialHairProbability=100&radius=50' },
        { rel: 'apple-touch-icon', href: 'https://api.dicebear.com/7.x/personas/svg?skinColor=d78774&hair=balding&body=checkered&nose=wrinkles&eyes=glasses&mouth=bigSmile&facialHair=walrus&hairColor=dee1f5&clothingColor=f3b63a&backgroundColor=bde4a7&facialHairProbability=100&radius=50' }
      ]
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