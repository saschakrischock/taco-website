<template>
    <section id="editorials" class="bg-white flex flex-col justify-between h-[calc(100svh-7rem)]  p-7">
        <div class="  max-w-[90rem]">
      <h1 class="lg:text-2xl text-mobile-2xl font-headline ">
        Stories
        <span class="text-[#96FF5E]"> curated by TACo</span>
      </h1>
    </div>
      <div v-if="posts" class="divide-y border-t border-b border-black  divide-black">
        <article v-for="post in posts" 
                 :key="post.id"
                 class="py-3 px-4 duration-300 transition-all hover:bg-[#96FF5E]">
          <NuxtLink :to="post.path" class="w-full  ">
            <div class="space-y-2">
            
            <div class="flex justify-between w-full">
                <!-- Title -->
               <div class="flex gap-24">
              <h2 class="text-list-xl font-bold w-[20rem]">
                {{ post.title }}
              </h2>
           
              <!-- Tags and Date container -->
              <div class="flex justify-between text-lg text-[#909090] font-mono">
                <div class="flex gap-2">
                  <span v-for="tag in post.meta.tags" :key="tag" class="whitespace-nowrap">
                    #{{ tag }}
                  </span>
                </div>
            </div>
        </div>

     
            
                <time class="text-right font-mono font-xl">
                  {{ formatDate(post.meta.date) }}<br>
                  {{ post.meta.time }}
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