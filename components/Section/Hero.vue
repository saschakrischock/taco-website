<template>
  <section
    ref="sectionRef"
    id="build"
    class="hero bg-white h-screen is-primary is-fullheight relative overflow-hidden"
  >
    <!-- First Lottie Animation with centered text -->
    <div class="absolute pointer-events-none bg-white z-50 w-full h-full transition-opacity duration-1000" :style="{ opacity: firstLottieOpacity }">      <Blottie
        ref="firstLottieRef"
        class="absolute inset-0 w-[60rem] left-1/2 -translate-x-1/2 object-cover transition-opacity duration-300"
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
      <div class="absolute inset-0 flex font-mono items-center justify-center">
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
        :style="{ opacity }"
        class="lg:p-7 p-4 pt-16 lg:pt-24 max-w-[90rem] flex flex-col justify-between h-[calc(100svh-7rem)] lg:h-[calc(100svh-5rem)] transition-opacity duration-300"
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
    // Start matrix effect when Lottie starts, passing the Lottie animation instance
    if (tacoTextRef.value) {
      stopMatrixEffect = startMatrixEffect(tacoTextRef.value, anim)
    }
  }
}

const onFirstLottieComplete = () => {
  isFirstAnimationComplete = true
  // Stop matrix effect and restore original text
  if (stopMatrixEffect) {
    stopMatrixEffect()
  }
  // Fade out first animation
  firstLottieOpacity.value = 0
  // Start second animation after a short delay
  setTimeout(() => {
    secondLottieOpacity.value = 1
    if (secondLottieRef.value?.anim) {
      secondLottieRef.value.anim.play()
    }
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