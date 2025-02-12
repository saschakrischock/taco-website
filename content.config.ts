import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      source: 'posts/**/*.md',
      type: 'page'
    })
  }
})