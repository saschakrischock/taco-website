<template>
  <section id="editorials" class="bg-white flex flex-col justify-between h-[calc(100vh-7rem)] p-4  lg:p-7">
      <div class="  max-w-[90rem]">
    <h2 class="lg:text-2xl text-mobile-2xl font-bold font-headline ">
      Stories
      <span class="text-[#96FF5E]"> curated by TACo</span>
    </h2>
  </div>
    <div v-if="posts" class="divide-y border-t fade-element border-b border-black  divide-black">
      <article v-for="post in posts" 
               :key="post.id"
               class="py-3 lg:px-4 duration-300 transition-all relative hover:bg-[#96FF5E]">
        <NuxtLink :to="post.path" class="w-full  ">
          <div class="space-y-2">
          
          <div class="flex lg:flex-row flex-col justify-between w-full">
              <!-- Title -->
             <div class="flex max-lg:flex-col lg:gap-24">
            <h2 class="text-list-xl font-bold max-lg:mb-2 w-[20rem]">
              {{ post.title }}
            </h2>
         
            <!-- Tags and Date container -->
            <div class="flex justify-between mono-text  text-lg text-[#909090] font-mono">
              <div class="flex gap-2">
                <span v-for="tag in post.meta.tags" :key="tag" class="whitespace-nowrap">
                  #{{ tag }}
                </span>
              </div>
          </div>
      </div>

   
          
              <time class="text-right max-lg:absolute max-lg:right-0  max-lg:bottom-2 max-lg:text-[#909090] font-mono font-lg">
                <div class="mono-text">{{ formatDate(post.meta.date) }}</div>
                <div class="max-lg:!hidden">{{ post.meta.time }}</div>
              </time>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>
    <div v-else>No posts found</div>
    <div></div>
  </section>
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