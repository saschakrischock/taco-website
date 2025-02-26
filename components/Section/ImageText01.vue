<template>
  <section ref="container" class="hero is-primary bg-black min-h-[100vh] is-fullheight relative overflow-hidden">
    <div
      ref="parallaxBg"
      class="absolute scale-fix inset-0 w-full h-[100%] top-[0%] bg-center max-lg:bg-right bg-cover bg-no-repeat will-change-transform"
      :style="{
        backgroundImage: 'url(/images/1.jpg)',
        transform: `translate3d(0, ${parallaxOffset}px, 0)`,
        zIndex: 0
      }"
    ></div>
    <div class="absolute h-72 inset-0 w-full bg-gradient-to-b from-black to-transparent z-10"></div>
    <div class="absolute h-72 bottom-0 w-full bg-gradient-to-t from-black to-transparent z-10"></div>
    <div class="hero-body absolute z-20">
      <div class="lg:p-7 p-4 max-w-[90rem] h-[calc(100vh-1rem)] lg:h-[calc(100vh-3rem)] font-headline flex justify-between flex-col">
        <h2 class="text-white lg:text-2xl text-mobile-2xl font-bold font-headline">
          End-to-end encryption<br> for almost everything.
        </h2>
        <h3 class="subtitle font-headline text-white max-w-[60rem] font-bold text-mobile-xl lg:text-mobile-xl lg:text-xl mt-7">
          Imagine if Signal-like protections were embedded in every application.<br>
          <span class="green-highlight">Healthcare portals, social platforms, shared spreadsheets, booking<br> aggregators, connected vehicles, chatbot providers
          </span> – and every other digital
          <br> facility with a shadowy data harvester – would see nothing but ciphertexts.
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
let rafId = null
let previousScrollY = 0
let targetOffset = 0
const lerpFactor = 0.5 // lerp

// Smoothly interpolate between current and target position
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
  
  //  lerp
  parallaxOffset.value = lerp(parallaxOffset.value, targetOffset, lerpFactor)
  
  rafId = requestAnimationFrame(updateParallax)
}

const handleScroll = () => {
  if (!rafId) {
    rafId = requestAnimationFrame(updateParallax)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  rafId = requestAnimationFrame(updateParallax)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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