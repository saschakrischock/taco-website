// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'TACo - Actually Decentralized End-to-End Encryption',
      meta: [
        // Essential meta tags
        { name: 'description', content: 'TACo is a access control plugin that has been decentralized from day one. Integrate trust-minimized end-to-end encryption into your application via the taco-web encrypt/decrypt API.' },
        { name: 'keywords', content: 'encryption, e2ee, end-to-end encryption, decentralized, access control, web3, privacy, security, taco-web, api' },
        
        // Open Graph tags for social media sharing
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://taco.build/' },
        { property: 'og:title', content: 'TACo End-to-end Encryption' },
        { property: 'og:description', content: 'TACo is an access control plugin that is actually decentralized. Integrate uncensorable e2ee into your applications via the taco-web encrypt/decrypt API.' },
        { property: 'og:image', content: '/social/banner.png' },
        
        // Twitter Card tags
        { name: 'twitter:card', content: 'TTACo End-to-end Encryption' },
        { name: 'twitter:url', content: 'https://taco.build/' },
        { name: 'twitter:title', content: 'TACo End-to-end Encryption' },
        { name: 'twitter:description', content: 'TACo is an access control plugin that is actually decentralized. Integrate uncensorable e2ee into your applications via the taco-web encrypt/decrypt API.' },
        { name: 'twitter:image', content: '/social/banner.png' },
        
        // Additional useful meta tags
        { name: 'author', content: 'TACo Team' },
        { name: 'theme-color', content: '#4CAF50' },
        { name: 'robots', content: 'index, follow' },
        
        // Product-specific meta tags
        { name: 'application-name', content: 'TACo E2EE' },
        { name: 'application-type', content: 'Encryption API' },
        { property: 'product:category', content: 'Security & Privacy' }
      ],
      link: [
        { 
          rel: 'icon', 
          type: 'image/x-icon',  // Changed from image/png to image/x-icon
          href: "/favicon_white.ico"  // Changed from favicon_light.png to favicon_white.ico
        }
      ]
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  image: {
    provider: 'netlify'
  },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts', '@nuxt/content', 'nuxt-swiper', 'nuxt-marquee', '@nuxt/image'],
  ssr: true,
  // If you're using static hosting, add:
  
  nitro: {
    prerender: {
      routes: ['/'] // Add routes that need pre-rendering
    }
  }
})