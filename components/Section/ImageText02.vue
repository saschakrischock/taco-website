<template>
  <section ref="container" class="hero is-primary bg-white min-h-[100vh] is-fullheight relative overflow-hidden">
    <div 
      ref="parallaxBg"
      class="absolute scale-fix inset-0 w-full h-[100%] -top-[0%] bg-center bg-cover bg-no-repeat"
      :style="{
        backgroundImage: 'url(/images/2.jpg)',
        transform: `translate3d(0, ${parallaxOffset}px, 0)`,
        zIndex: 0
      }"
    ></div>
    <div class="hero-body w-full absolute">
      <div class="absolute h-72 bottom-0   w-full bg-gradient-to-t from-white to-transparent z-10"></div>

      <div class="lg:p-7 p-4 max-w-[90rem] justify-between h-[calc(100vh-0rem)] flex flex-col">
        <h2 class="text-black lg:text-2xl font-headline text-mobile-2xl font-bold ">
              End-to-End Encrypted. <br>End-to-End Decentralized. 
            </h2>
            <h3 class="subtitle z-10 lg:max-w-[50rem] font-medium font-headline text-mobile-xl lg:text-xl mt-7">
              TACo is day one decentralized. That means the very first ciphertext generated via the taco-web API – in January 2024 – was encrypted under a decentralized cryptosystem, with a group of 30 nodes indepenently managing access to the data.
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