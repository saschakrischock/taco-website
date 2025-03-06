<template>
  <section ref="container" class="hero is-primary bg-white min-h-[100vh] is-fullheight relative overflow-hidden">
    <div 
      ref="parallaxBg"
      class="absolute scale-fix inset-0 w-full h-[100%] -top-[0%] bg-center bg-cover bg-no-repeat will-change-transform"
      :style="{
        backgroundImage: `url('${bgImageUrl}')`,
        transform: `translate3d(0, ${parallaxOffset}px, 0)`,
        zIndex: 0
      }"
    ></div>
    <div class="hero-body w-full absolute">
      <div class="absolute h-72 bottom-0 w-full bg-gradient-to-t from-white to-transparent z-10"></div>

      <div class="lg:p-7 p-4 max-w-[90rem] justify-between h-[calc(100vh-0rem)] flex flex-col">
        <h2 class="text-black lg:text-2xl font-headline text-mobile-2xl font-bold">
          End-to-End Encrypted. <br>End-to-End Decentralized. 
        </h2>
        <h3 class="subtitle z-10 lg:max-w-[50rem] font-bold font-headline text-mobile-xl lg:text-xl mt-7">
          TACo is day one decentralized. That means the very first ciphertext generated via the <a href ="https://github.com/nucypher/taco-web">taco-web API</a> – in January 2024 – was encrypted under a decentralized cryptosystem, with a group of 30 nodes independently managing access to the data.
        </h3>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Add the useImage composable for Nuxt Image
const nuxtImg = useImage()

// Create a responsive background image URL with Netlify provider
const bgImageUrl = computed(() => {
  // Determine appropriate size based on viewport
  const width = window.innerWidth
  const imageWidth = width < 768 ? 1024 : width < 1280 ? 1920 : 2560
  
  return nuxtImg('/images/2_big.jpg', {
    width: imageWidth,
    quality: 80,
    format: 'webp',
    placehoder: 100
  })
})

const container = ref(null)
const parallaxBg = ref(null)
const parallaxOffset = ref(0)
let rafId = null
let targetOffset = 0
const lerpFactor = 0.5 // lerp

const lerp = (start, end, factor) => {
  return start + (end - start) * factor
}

const updateParallax = () => {
  if (!container.value) return
  
  const rect = container.value.getBoundingClientRect()
  const containerHeight = rect.height
  const viewportMiddle = window.innerHeight / 2
  const elementMiddle = rect.top + containerHeight / 2
  
  // Reduce movement on mobile for smoother effect
  const isMobile = window.innerWidth < 768
  const parallaxStrength = isMobile ? 0.2 : 0.4 // Reduced strength for smoother effect
  
  // Calculate the target offset
  targetOffset = -((elementMiddle - viewportMiddle) * parallaxStrength)
  
  parallaxOffset.value = lerp(parallaxOffset.value, targetOffset, lerpFactor)
  
  rafId = requestAnimationFrame(updateParallax)
}

const handleScroll = () => {
  if (!rafId) {
    rafId = requestAnimationFrame(updateParallax)
  }
}

// Add resize handler for responsive image updates
const handleResize = () => {
  // The computed bgImageUrl will automatically update when window size changes
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
  rafId = requestAnimationFrame(updateParallax)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  if (rafId) {
    cancelAnimationFrame(rafId)
  }
})
</script>

<style scoped>
.will-change-transform {
  will-change: transform;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
}
</style>