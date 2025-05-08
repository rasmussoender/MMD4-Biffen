export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
    '@/assets/css/style.css',
    '@/assets/css/variables.css'
  ],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        }
      ]
    }
  }
})
