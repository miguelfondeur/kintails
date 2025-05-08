export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss', 
    '@pinia/nuxt',
    '@nuxtjs/supabase'
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
      title: 'Family Stories',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Share and preserve your family stories' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap', rel: 'stylesheet' }
      ]
    }
  },
  nitro: {
    preset: 'netlify'
  },
  ssr: true,
  experimental: {
    payloadExtraction: false
  }
}) 