// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8000/' 
        : '/',
    },
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: [
    '~/assets/styles/main.scss',
  ]
})
