<template>
    <section ref="container" class="hero is-primary bg-black min-h-[100svh] is-fullheight relative overflow-hidden">
      <div 
        ref="parallaxBg"
        class="absolute inset-0 w-full h-[100%] top-[0%] bg-center bg-cover bg-no-repeat"
        :style="{
          backgroundImage: 'url(/images/1.jpg)',
          transform: `translate3d(0, ${parallaxOffset}px, 0)`,
          zIndex: 0
        }"
      ></div>
      <div class="absolute h-72 inset-0 w-full  bg-gradient-to-b from-black to-transparent z-10"></div>
      <div class="absolute h-72 bottom-0  w-full bg-gradient-to-t from-black to-transparent z-10"></div>
      <div class="hero-body absolute z-20">
        <div class="lg:p-7 p-4 max-w-[90rem]  h-[calc(100svh-1rem)]  lg:h-[calc(100svh-3rem)] font-headline  flex justify-between flex-col">
            <h2 class="text-white   lg:text-2xl text-mobile-2xl font-bold font-headline">
              End-to-end encryption<br> for (almost) everything.
            </h2>
            <h3 class="subtitle font-headline text-white max-w-[60rem]  font-medium text-mobile-xl lg:text-mobile-xl lg:text-xl mt-7">
              Imagine if Signal-like protections were embedded in every application.<br>
              So 
              <span class="green-highlight">healthcare portals, social platforms, shared spreadsheets, booking<br> aggregators, connected vehicles, chatbot providers
               </span> – and every other digital
               <br> facility with a shadowy data harvestor – would see nothing but ciphertexts.
            </h3>
        </div>

        




    </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const container = ref(null)
  const parallaxBg = ref(null)
  const parallaxOffset = ref(0)
  
  const handleScroll = () => {
    if (!container.value) return
    const rect = container.value.getBoundingClientRect()
    const containerHeight = rect.height
    const viewportMiddle = window.innerHeight / 2
    const elementMiddle = rect.top + containerHeight / 2
    const distanceFromCenter = (elementMiddle - viewportMiddle) * 0.8
    parallaxOffset.value = -distanceFromCenter
  }
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
  </script>