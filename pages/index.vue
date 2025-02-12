<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Blottie } from 'blottie'

const isAnimationComplete = ref(false)
const overlayOpacity = ref(1)

const handleComplete = () => {
  isAnimationComplete.value = true
  // Start fade out animation
  setTimeout(() => {
    overlayOpacity.value = 0
  }, 100) // Small delay to ensure animation completed
}
</script>

<template>
  <div>
    <div
      class="bg-white fixed w-full h-full z-[1000] transition-opacity duration-500"
      :style="{ opacity: overlayOpacity }"
    >
      <Blottie
        class="absolute inset-0 w-full h-full object-cover"
        :lottie="{
          player: 'svg',
          renderer: 'svg',
          path: '/lottie/data_logo.json',
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          },
          loop: false,
          autoplay: true
        }"
        @complete="handleComplete"
      />
    </div>

    <SectionHero/>
    <SectionImageText01/>
    <SectionAccordion01/>
    <SectionAccordion02/>
    <SectionPrivacy/>
    <SectionImageText02/>
    <SectionAccordionCode/>
    <SectionTable/>
    <SectionPostList/>
  </div>
</template>

<style scoped>
.transition-opacity {
  transition: opacity 0.5s ease-out;
}
</style>