// Footer.vue
<template>
  <div 
    ref="footerRef" 
    id="contact" 
    class="w-full relative"
  >
    <!-- Main content section with full viewport height -->
    <div class="relative min-h-[100dvh]">
      <!-- Lottie animation -->
      <Blottie
        ref="footerLottieRef"
        :style="{ opacity: lottieOpacity }"
        class="w-[100vw] footer-blottie flex justify-center items-end absolute top-[7rem] left-0 origin-center 
               
               pointer-events-none h-[calc(100dvh-7rem)] object-cover"
        :lottie="{
          player: 'svg',
          renderer: 'svg',
          loop: false,
          autoplay: false,
          path: '/lottie/data_footer.json',

        }"
        @ready="onLottieReady"
        @complete="onLottieComplete"
      />

      <!-- Credits section -->
      <div class="flex absolute w-full  bottom-4 max-lg:items-center max-lg:gap-4 max-lg:flex-col justify-end lg:justify-center items-end   h-[calc(100dvh-7rem)] text-center text-black text-[15px] font-normal">
        <transition @enter="observeNewElements" name="fade">
          <div v-if="showCredits" class="flex w-full font-mono flex-col gap-0 leading-[1.3]">
            <span class="font-mono mono-text block">Design & AD: Aletheia, Leith Benkhedda</span>
            <span class="font-mono mono-text block">Photography: Thadde Comar</span>
            <span class="font-mono mono-text block">Web development: Sascha Krischock</span>
          </div>
        </transition>

        <!-- Mobile navigation -->
            <div class="flex flex-col justify-center items-center lg:hidden gap-3">
        <div class="flex lg:hidden gap-x-3">
          <a target="_blank" href="https://docs.taco.build/" class="text-center bg-[#F4F4F4] py-1 px-3 rounded-xl font-mono font-normal mono-text">Build</a>
         <!-- <a href="#editorials" class="text-center bg-[#F4F4F4] py-1 px-3 rounded-xl font-mono font-normal mono-text">Editorials</a>-->
          <a  target="_blank" href="https://github.com/nucypher" class="text-center bg-[#F4F4F4] py-1 px-3 rounded-xl font-mono font-normal mono-text">Repos</a>
        </div>
        <div class="flex lg:hidden gap-4">
          <a target="_blank" href="https://discord.gg/buildwithtaco" class="text-center bg-[#F4F4F4] py-1 px-3 rounded-xl font-mono font-normal mono-text">Contact</a>
        <button @click="toggleCredits" class="text-center bg-[#F4F4F4] py-1 px-3 rounded-xl font-mono font-normal mono-text">
            Credits
        </button>
        </div>
    </div>

        <!-- Mobile copyright -->
        <div class="flex lg:hidden font-mono flex-col gap-0 leading-[1.3]">
          ©2025 |  NuCypher Build<br class="!block">
          All Rights Reserved
        </div>
      </div>
    </div>

    <!-- Black footer bar -->
    <div class="w-full bg-black flex flex-row justify-between px-6 max-lg:justify-center py-4 relative">
      <!-- Desktop copyright -->
      <div class="max-lg:hidden text-white text-lg font-normal font-mono mono-text">
        ©2025 | NuCypher Build – All Rights Reserved
      </div>

      <!-- Logo -->
      <SvgLogoWhite class="lg:absolute lg:top-[0.6rem] lg:left-1/2 lg:-translate-x-1/2 w-24 lg:h-8"/>

      <!-- Desktop navigation -->
      <div class="max-lg:hidden text-lg justify-end items-center gap-8 inline-flex">
        <a target="_blank" href="https://docs.taco.build/" class="text-center text-white font-mono font-normal mono-text">Build</a>
        <a target="_blank" href="https://github.com/nucypher"  class="text-center text-white font-mono font-normal mono-text">Repos</a>
       <!-- <a href="#editorials" class="text-center text-white font-mono font-normal mono-text">Editorials</a>-->
        <a target="_blank" href="https://discord.gg/buildwithtaco"  class="text-center text-white font-mono font-normal mono-text">Contact</a>
        <button @click="showCredits = !showCredits" class="text-center text-white font-mono font-normal mono-text">
            Credits
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { SvgLogoWhite } from '#components'
import { Blottie, type BlottieExpose } from 'blottie'
import type { AnimationItem } from 'lottie-web'


// Refs
const footerRef = ref<HTMLElement | null>(null)
const footerLottieRef = ref<BlottieExpose>()
const lottieOpacity = ref(0)
const wasAboveViewport = ref(true)
const showCredits = ref(false)

const { observeNewElements } = useMatrixText();

const toggleCredits = async () => {
  showCredits.value = !showCredits.value;
  if (showCredits.value) {
    await nextTick();
    observeNewElements();
  }
};

// Visibility calculation
const calculateVisibility = () => {
  if (!footerRef.value) return { visibilityRatio: 0, isAboveViewport: false }
  
  const rect = footerRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  
  // Calculate how much of the footer is visible
  const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top)
  const visibilityRatio = Math.min(1, Math.max(0, visibleHeight / rect.height))
  
  // Simply check if top position is more than window height
  const isAboveViewport = rect.top > windowHeight

  console.log('Visibility Debug:', {
    rectTop: Math.round(rect.top),
    windowHeight,
    isAboveViewport,
    visibilityRatio
  })
  
  return { visibilityRatio, isAboveViewport }
}

// Scroll handler
const handleScroll = () => {
  const { visibilityRatio, isAboveViewport } = calculateVisibility()
  
  console.log('Scroll Debug:', {
    visibilityRatio,
    isAboveViewport,
    wasAboveViewport: wasAboveViewport.value,
    opacity: lottieOpacity.value,
    hasAnim: !!footerLottieRef.value?.anim
  })
  
  if (isAboveViewport) {
    console.log('Footer is above viewport - should reset animation')
    // When footer is above viewport
    lottieOpacity.value = 0
    wasAboveViewport.value = true
    // Reset animation to first frame when hidden
    if (footerLottieRef.value?.anim) {
      console.log('Resetting animation to frame 0')
      footerLottieRef.value.anim.goToAndStop(0, true)
    } else {
      console.log('No animation reference available for reset')
    }
  } else {
    console.log('Footer is in or below viewport')
    lottieOpacity.value = 1
  }
  
  // Trigger animation replay when:
  // 1. Was previously above viewport
  // 2. Section is now at least 80% visible
  if (
    wasAboveViewport.value &&
    visibilityRatio >= 0.8 &&
    footerLottieRef.value?.anim
  ) {
    console.log('Conditions met to replay animation:', {
      wasAbove: wasAboveViewport.value,
      visibility: visibilityRatio,
      hasAnim: !!footerLottieRef.value?.anim
    })
    // Show and replay animation
    lottieOpacity.value = 1
    footerLottieRef.value.anim.goToAndPlay(0)
    wasAboveViewport.value = false
    console.log('Animation replay triggered')
  }
}

const onLottieReady = (anim?: AnimationItem) => {
  console.log('Lottie Ready:', { hasAnim: !!anim })
  if (anim) {
    anim.goToAndStop(0, true)
    console.log('Animation initialized and stopped at frame 0')
  }
}

const onLottieComplete = () => {
  console.log('Animation completed')
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>