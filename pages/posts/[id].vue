<template>
  <div class="max-w-4xl mx-auto p-6">
    <article v-if="post" class="prose lg:prose-xl mx-auto">
      <!-- Title and metadata header -->
      <div class="mb-8 mt-24 not-prose">
        <h1 class="text-2xl font-bold mb-4">{{ post.title }}</h1>
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

      <!-- Content -->
      <ContentRenderer class="blog" :value="post" />
    </article>
    <div v-else>Post not found</div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Using the correct path construction
const { data: post } = await useAsyncData(`post-${route.params.slug}`, () =>
  queryCollection('posts').path(route.path).first()
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

// Set meta tags if post exists
useHead(() => ({
  title: post.value?.title ?? 'Post',
  meta: [
    { name: 'description', content: post.value?.description ?? '' }
  ]
}))
</script>


