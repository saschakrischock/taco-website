
<template>
  <section 
    ref="sectionRef"
    id="build" 
    class="hero bg-white h-screen is-primary is-fullheight relative overflow-hidden"
  >
    <Blottie 
      ref="blottieRef"
      :style="{ opacity }"
      class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
      :lottie="{
        player: 'svg',
        loop: false,
        autoplay: false,
        renderer: 'svg',
        path: '/lottie/data_hero.json',
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }"
      @ready="onLottieReady"
      @complete="onLottieComplete"
    />
    
    <div class="hero-body relative z-10">
      <div 
        :style="{ opacity }"
        class="lg:p-7 p-4 pt-16 lg:pt-24 max-w-[90rem] flex flex-col justify-between h-[calc(100svh-0rem)] lg:h-[calc(100svh-5rem)] transition-opacity duration-300"
      >
        <h1 class="text-black font-headline text-mobile-2xl lg:text-2xl font-bold">
          <span>Trusting </span>
          <span class="text-[#96FF5E]">centralized platforms </span><br class="max-lg:hidden">
          <span class="text-black">with secrets management<br class="max-lg:hidden"> is giving Bezos your house keys.</span>
        </h1>
        <h2 class="subtitle font-headline mt-6 text-black font-medium text-mobile-xl lg:text-xl">
          TACo is the only general-purpose access control plugin that works without<br class="max-lg:hidden"> trusting
          an intermediary so users aren't obliged to trust AWS your dev team or<br class="max-lg:hidden">TACo.
        </h2>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Blottie, type BlottieExpose } from 'blottie'
import type { AnimationItem } from 'lottie-web'

const sectionRef = ref<HTMLElement | null>(null)
const blottieRef = ref<BlottieExpose>()
const opacity = ref(1)
let isAnimationComplete = false

const calculateVisibility = () => {
  if (!sectionRef.value) return { isVisible: false, visibilityRatio: 0 }
  
  const rect = sectionRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  
  // Calculate visibility ratio (0 to 1)
  const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top)
  const visibilityRatio = Math.min(1, Math.max(0, visibleHeight / sectionRef.value.offsetHeight))
  
  // Start fading out when 80% out of view
  const fadeStartPoint = 0.5
  opacity.value = visibilityRatio < fadeStartPoint 
    ? visibilityRatio / fadeStartPoint 
    : 1

  // Consider visible if more than 30% in view
  const isVisible = visibilityRatio >= 0.3

  return { isVisible, visibilityRatio }
}

const handleScroll = () => {
  const { isVisible } = calculateVisibility()
  
  if (isVisible && isAnimationComplete && blottieRef.value?.anim) {
    blottieRef.value.anim.goToAndPlay(0)
    isAnimationComplete = false
  }
}

const onLottieReady = (anim?: AnimationItem) => {
  const { isVisible } = calculateVisibility()
  if (anim && isVisible) {
    anim.play()
  }
}

const onLottieComplete = () => {
  isAnimationComplete = true
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>