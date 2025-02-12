<template>
    <div class="max-w-4xl mx-auto p-6">
      <div v-if="posts" class="divide-y divide-gray-200">
        <article v-for="post in posts" 
                 :key="post.id"
                 class="py-6">
          <NuxtLink :to="post.path" class="block group">
            <div class="space-y-2">
              <!-- Title -->
              <h2 class="text-2xl font-semibold tracking-tight group-hover:text-gray-600">
                {{ post.title }}
              </h2>
              
              <!-- Tags and Date container -->
              <div class="flex items-center justify-between text-sm text-gray-500 font-mono">
                <div class="flex gap-2">
                  <span v-for="tag in post.meta.tags" :key="tag" class="whitespace-nowrap">
                    #{{ tag }}
                  </span>
                </div>
                <time class="text-right">
                  {{ formatDate(post.meta.date) }}
                </time>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>
      <div v-else>No posts found</div>
    </div>
  </template>
  
  <script setup lang="ts">
  const { data: posts } = await useAsyncData('blog', () => 
    queryCollection('posts').all()
  )
  
  const formatDate = (date: string) => {
    if (!date) return ''
    try {
      return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '.')
    } catch (e) {
      return date
    }
  }
  </script>