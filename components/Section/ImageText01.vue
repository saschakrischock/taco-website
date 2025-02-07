<template>
    <section ref="container" class="hero is-primary h-screen is-fullheight relative overflow-hidden">
      <div 
        ref="parallaxBg"
        class="absolute inset-0 w-full h-[150%] -top-[50%] bg-center bg-cover bg-no-repeat"
        :style="{
          backgroundImage: 'url(/images/1.jpg)',
          transform: `translate3d(0, ${parallaxOffset}px, 0)`,
          zIndex: 0
        }"
      ></div>
      <div class="hero-body absolute">
        <div class="p-7 max-w-[90rem]">
            <h1 class="text-white text-2xl font-bold ">
              End-to-end encryption<br>for (almost) everything.
            </h1>
            <h2 class="subtitle text-white text-medium text-xl mt-7">
              TACo is the only general-purpose access control plugin that works without trusting<br>an intermediary so users aren’t obliged to trust AWS your dev team or TACo.
                </h2>
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