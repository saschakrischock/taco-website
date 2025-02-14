<template>
  <section ref="container" class="hero is-primary bg-white h-[100svh] is-fullheight relative overflow-hidden">
    <div 
      ref="parallaxBg"
      class="absolute inset-0 w-full h-[100%] -top-[0%] bg-center bg-cover bg-no-repeat"
      :style="{
        backgroundImage: 'url(/images/2.jpg)',
        transform: `translate3d(0, ${parallaxOffset}px, 0)`,
        zIndex: 0
      }"
    ></div>
    <div class="hero-body absolute">
      <div class="lg:p-7 p-4 max-w-[90rem] justify-between h-[calc(100svh-0rem)] flex flex-col">
        <h2 class="text-black lg:text-2xl text-mobile-2xl font-bold ">
              End-to-End Encrypted. <br>End-to-End Decentralized. 
            </h2>
            <h3 class="subtitle font-medium text-mobile-xl lg:text-xl mt-7">
                  Empower users to share private data with legitimate recipients, and no-one else.<br>
                   From the very first ciphertext generated via the encrypt/decrypt API in January 2024.
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