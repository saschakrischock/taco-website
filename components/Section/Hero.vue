<template>
  <section
    ref="sectionRef"
    id="build"
    class="hero bg-white min-h-[100svh] is-primary is-fullheight relative overflow-hidden"
  >
    <!-- First Lottie Animation with centered text -->
    <div 
      :class="['fixed bg-white z-[100]  w-full h-full transition-opacity duration-1000', { 'pointer-events-none': isFirstAnimationFadedOut }]" 
      :style="{ opacity: firstLottieOpacity }"
    >
  
      <Blottie
        ref="firstLottieRef"
        class="absolute inset-0 w-[60rem] max-lg:scale-[0.7] left-1/2 -translate-x-1/2 object-cover transition-opacity duration-300"
        :lottie="{
          player: 'svg',
          loop: false,
          autoplay: false,
          renderer: 'svg',
          path: '/lottie/data_logo_boxes.json',
        }"
        @ready="onFirstLottieReady"
        @complete="onFirstLottieComplete"
      />
      <!-- Centered TACo text -->
      <div class="absolute inset-0 flex max-lg:scale-[0.7] font-mono items-center justify-center">
        <h1 ref="tacoTextRef" class="text-black opacity-0 ml-[1.49rem] tracking-[1.45rem] text-[2rem] transition-all duration-300">
          TACo
        </h1>
      </div>
    </div>

    <!-- Second Lottie Animation -->
    <Blottie
      ref="secondLottieRef"
      :style="{ opacity: secondLottieOpacity }"
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
      @ready="onSecondLottieReady"
      @complete="onSecondLottieComplete"
    />

    <div class="hero-body relative z-10">
      <div
        :style="{ opacity: heroContentOpacity }"
        class="lg:p-7 p-4 pt-16 lg:pt-24 max-w-[90rem] flex flex-col justify-between h-[calc(100svh-7rem)] lg:h-[calc(100svh-5rem)] transition-opacity duration-700"
      >
        <h2 class="text-black font-headline text-mobile-2xl lg:lg:text-2xl text-mobile-2xl font-bold">
          <span>Trusting </span>
          <span class="text-[#96FF5E]">centralized platforms </span><br class="max-lg:hidden">
          <span class="text-black">with secrets management<br class="max-lg:hidden"> is giving Bezos your house keys.</span>
        </h2>
        <h3 class="subtitle font-headline mt-6 text-black font-medium text-mobile-xl lg:text-mobile-xl lg:text-xl">
          TACo is the only general-purpose access control plugin that works without<br class="max-lg:hidden"> trusting
          an intermediary so users aren't obliged to trust AWS your dev team or<br class="max-lg:hidden">TACo.
        </h3>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Blottie, type BlottieExpose } from 'blottie'
import type { AnimationItem } from 'lottie-web'

const { startMatrixEffect } = useTacoMatrixSync()

const sectionRef = ref<HTMLElement | null>(null)
const tacoTextRef = ref<HTMLElement | null>(null)
const firstLottieRef = ref<BlottieExpose>()
const secondLottieRef = ref<BlottieExpose>()
const opacity = ref(1)
const firstLottieOpacity = ref(1)
const secondLottieOpacity = ref(0)
const heroContentOpacity = ref(0) // New ref for hero content opacity
const isFirstAnimationFadedOut = ref(false) // New ref for controlling pointer events
let isFirstAnimationComplete = false
let isSecondAnimationComplete = false
let stopMatrixEffect: (() => void) | null = null

const calculateVisibility = () => {
  if (!sectionRef.value) return { isVisible: false, visibilityRatio: 0 }
  
  const rect = sectionRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  
  const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top)
  const visibilityRatio = Math.min(1, Math.max(0, visibleHeight / sectionRef.value.offsetHeight))
  
  const fadeStartPoint = 0.5
  opacity.value = visibilityRatio < fadeStartPoint
    ? visibilityRatio / fadeStartPoint
    : 1
  
  const isVisible = visibilityRatio >= 0.3
  
  return { isVisible, visibilityRatio }
}

const handleScroll = () => {
  const { isVisible } = calculateVisibility()
  
  if (isVisible && isSecondAnimationComplete && secondLottieRef.value?.anim) {
    secondLottieRef.value.anim.goToAndPlay(0)
    isSecondAnimationComplete = false
  }
}

const onFirstLottieReady = (anim?: AnimationItem) => {
  if (anim) {
    anim.play()
    if (tacoTextRef.value) {
      stopMatrixEffect = startMatrixEffect(tacoTextRef.value, anim)
    }
  }
}

const onFirstLottieComplete = () => {
  isFirstAnimationComplete = true
  if (stopMatrixEffect) {
    stopMatrixEffect()
  }
  
  // Fade out first animation
  firstLottieOpacity.value = 0
  
  // Set pointer-events-none after the fade-out animation completes
  setTimeout(() => {
    isFirstAnimationFadedOut.value = true
  }, 1000) // Match the duration-1000 transition
  
  // Start second animation and fade in hero content after a short delay
  setTimeout(() => {
    secondLottieOpacity.value = 1
    if (secondLottieRef.value?.anim) {
      secondLottieRef.value.anim.play()
    }
    
    // Fade in hero content with a slight delay after second animation starts
    setTimeout(() => {
      heroContentOpacity.value = 1
    }, 300)
  }, 500)
}

const onSecondLottieReady = (anim?: AnimationItem) => {
  // Don't autoplay the second animation
}

const onSecondLottieComplete = () => {
  isSecondAnimationComplete = true
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (stopMatrixEffect) {
    stopMatrixEffect()
  }
})
</script>