// HeroSection.vue
<template>
  <section
    ref="sectionRef"
    id="build"
    class="hero bg-white min-h-[100svh] is-primary is-fullheight relative overflow-hidden"
  >
    <!-- First Lottie Animation with centered text -->
    <div 
      :class="['fixed bg-white z-[100] w-full h-full transition-opacity duration-500', { 'pointer-events-none': isFirstAnimationFadedOut }]" 
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
          
        </h1>
      </div>
    </div>

    <!-- Second Lottie Animation (no transition) -->
    <Blottie
      ref="secondLottieRef"
      :style="{ opacity: secondLottieOpacity }"
      class="absolute inset-0 w-full h-full object-cover"
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
        <h2 class="text-black font-headline text-mobile-2xl lg:text-2xl text-mobile-2xl font-bold">
          <span>Trusting </span>
          <span class="text-black">centralized platforms </span><br class="max-lg:hidden">
          with <span class="text-[#96FF5E]">secrets management<br class="max-lg:hidden">
            <span class="text-black"> is like giving Bezos your house keys.</span></span>
        </h2>
        <h3 class="subtitle font-headline mt-6 text-black font-bold text-mobile-xl lg:text-xl">
          TACo is the only general-purpose access control plugin that works without <br class="max-lg:hidden">
          
          trusting an intermediary. So users aren't obliged to trust 
          <span :class="['transition-colors duration-300', { 'text-[#96FF5E]': isFirstGreen }]">  AWS KMS, </span>
          <span :class="['transition-colors duration-300', { 'text-[#96FF5E]': isSecondGreen }]">your dev<br> team, </span>
          <span :class="['transition-colors duration-300', { 'text-[#96FF5E]': isThirdGreen }]">or TACo</span>
        </h3>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Blottie, type BlottieExpose } from 'blottie'
import type { AnimationItem } from 'lottie-web'

// Initialize matrix effect
const { startMatrixEffect } = useTacoMatrixSync()

// Refs
const sectionRef = ref<HTMLElement | null>(null)
const tacoTextRef = ref<HTMLElement | null>(null)
const firstLottieRef = ref<BlottieExpose>()
const secondLottieRef = ref<BlottieExpose>()
const firstLottieOpacity = ref(1)
const secondLottieOpacity = ref(0)
const heroContentOpacity = ref(0)
const isFirstGreen = ref(false)
const isSecondGreen = ref(false)
const isThirdGreen = ref(false)
const isFirstAnimationFadedOut = ref(false)

// State management
const isFirstAnimationComplete = ref(false)
const hasSecondAnimationStarted = ref(false)
const wasFullyHidden = ref(false)

// Cleanup variable for matrix effect
let stopMatrixEffect: (() => void) | null = null

// Visibility calculation
const calculateVisibility = () => {
  if (!sectionRef.value) return { visibilityRatio: 0, scrollProgress: 0 }
  
  const rect = sectionRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  
  // Calculate visibility ratio (how much of the section is visible)
  const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top)
  const visibilityRatio = Math.min(1, Math.max(0, visibleHeight / rect.height))
  
  // Calculate scroll progress (how far the user has scrolled past the top of the section)
  const scrollProgress = Math.max(0, Math.min(1, -rect.top / windowHeight))
  
  return { visibilityRatio, scrollProgress }
}

// Scroll handler
const handleScroll = () => {
  const { visibilityRatio, scrollProgress } = calculateVisibility()
  
  // Hard cut the second animation when scrolled one viewport height
  if (hasSecondAnimationStarted.value) {
    if (scrollProgress >= 1) {
      secondLottieOpacity.value = 0
      wasFullyHidden.value = true
      isFirstGreen.value = false
      isSecondGreen.value = false
      isThirdGreen.value = false
      // Reset animation to first frame when hidden
      if (secondLottieRef.value?.anim) {
        secondLottieRef.value.anim.goToAndStop(0, true)
      }
    } else {
      secondLottieOpacity.value = 1
    }
  }
  
  // Trigger second animation replay when:
  // 1. First animation is complete
  // 2. Second animation has started at least once
  // 3. Section was fully hidden before
  // 4. Section is now at least 80% visible
  if (
    isFirstAnimationComplete.value &&
    hasSecondAnimationStarted.value &&
    wasFullyHidden.value &&
    visibilityRatio >= 0.8 &&
    secondLottieRef.value?.anim
  ) {
    // Show the animation
    secondLottieOpacity.value = 1

    setTimeout(() => {
      isFirstGreen.value = true
      setTimeout(() => {
        isSecondGreen.value = true
        setTimeout(() => {
          isThirdGreen.value = true
        }, 700)
      }, 700)
    }, 1700)
    // Replay from start
    secondLottieRef.value.anim.goToAndPlay(0)
    wasFullyHidden.value = false
    // Just use startSecondAnimation - it has the sequence we want
    startSecondAnimation()
  }
}

// First Lottie animation handlers
const onFirstLottieReady = (anim?: AnimationItem) => {
  if (anim) {
    anim.setSpeed(3)
    anim.play()
    if (tacoTextRef.value) {
      stopMatrixEffect = startMatrixEffect(tacoTextRef.value, anim)
    }
  }
}

const onFirstLottieComplete = () => {
  isFirstAnimationComplete.value = true
  if (stopMatrixEffect) {
    stopMatrixEffect()
  }
  
  // Fade out first animation
  firstLottieOpacity.value = 0
  
  setTimeout(() => {
    isFirstAnimationFadedOut.value = true
    startSecondAnimation()
  }, 500)
}

// Second animation handlers
const startSecondAnimation = () => {
  if (!hasSecondAnimationStarted.value && secondLottieRef.value?.anim) {
    secondLottieOpacity.value = 1
    hasSecondAnimationStarted.value = true
    secondLottieRef.value.anim.play()
   
    setTimeout(() => {
      isFirstGreen.value = true
      setTimeout(() => {
        isSecondGreen.value = true
        setTimeout(() => {
          isThirdGreen.value = true
        }, 700)
      }, 700)
    }, 1700)
    
    setTimeout(() => {
      heroContentOpacity.value = 1
    }, 300)
  }
}

const onSecondLottieReady = (anim?: AnimationItem) => {
  // Don't autoplay, wait for trigger
}

const onSecondLottieComplete = () => {
  // Nothing needed here
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (stopMatrixEffect) {
    stopMatrixEffect()
  }
})
</script>