<template>
<<<<<<< HEAD
<<<<<<< HEAD
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
          End-to-end encryption<br> for (almost) everything.
        </h2>
        <h3 class="subtitle font-headline text-white max-w-[60rem] font-bold text-mobile-xl lg:text-mobile-xl lg:text-xl mt-7">
          Imagine if Signal-like protections were embedded in every application.<br>
          So 
          <span class="green-highlight">healthcare portals, social platforms, shared spreadsheets, booking<br> aggregators, connected vehicles, chatbot providers
          </span> – and every other digital
          <br> facility with a shadowy data harvestor – would see nothing but ciphertexts.
        </h3>
      </div>
    <section ref="container" class="hero is-primary bg-black min-h-[100svh] is-fullheight relative overflow-hidden">
=======
    <section ref="container" class="hero is-primary bg-black min-h-[100dvh] is-fullheight relative overflow-hidden">
>>>>>>> 69537b9 (changes)
=======
    <section ref="container" class="hero is-primary bg-black min-h-[100vh] is-fullheight relative overflow-hidden">
>>>>>>> 8e05bf8 (changes)
      <div 
        ref="parallaxBg"
        class="absolute scale-fix inset-0 w-full h-[100%] top-[0%] bg-center bg-cover bg-no-repeat"
        :style="{
          backgroundImage: 'url(/images/1.jpg)',
          transform: `translate3d(0, ${parallaxOffset}px, 0)`,
          zIndex: 0
        }"
      ></div>
      <div class="absolute h-72 inset-0 w-full  bg-gradient-to-b from-black to-transparent z-10"></div>
      <div class="absolute h-72 bottom-0  w-full bg-gradient-to-t from-black to-transparent z-10"></div>
      <div class="hero-body absolute z-20">
        <div class="lg:p-7 p-4 max-w-[90rem]  h-[calc(100vh-1rem)]  lg:h-[calc(100vh-3rem)] font-headline  flex justify-between flex-col">
            <h2 class="text-white   lg:text-2xl text-mobile-2xl font-bold font-headline">
              End-to-end encryption<br> for (almost) everything.
            </h2>
            <h3 class="subtitle font-headline text-white max-w-[60rem]  font-medium text-mobile-xl lg:text-mobile-xl lg:text-xl mt-7">
              Imagine if Signal-like protections were embedded in every application.<br>
              So 
              <span class="green-highlight">healthcare portals, social platforms, shared spreadsheets, booking<br> aggregators, connected vehicles, chatbot providers
               </span> – and every other digital
               <br> facility with a shadowy data harvestor – would see nothing but ciphertexts.
            </h3>
        </div>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 2792660 (YOUR_COMMIT_MESSAGE)

=======
=======
>>>>>>> b844fae (text)

        


<<<<<<< HEAD
<<<<<<< HEAD
=======
        
>>>>>>> 54ade92 (changes)
=======
>>>>>>> 2c89bc0 (YOUR_COMMIT_MESSAGE)
=======
>>>>>>> d088444 (Update website content and styling)
=======


>>>>>>> c6031de (text)
>>>>>>> b844fae (text)
=======
>>>>>>> 19b76fe (changes)
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const container = ref(null)
const parallaxBg = ref(null)
const parallaxOffset = ref(0)
let rafId = null
let lastKnownScrollPosition = 0
let ticking = false

const handleScroll = () => {
  lastKnownScrollPosition = window.scrollY

  if (!ticking) {
    rafId = requestAnimationFrame(() => {
      if (!container.value) return
      const rect = container.value.getBoundingClientRect()
      const containerHeight = rect.height
      const viewportMiddle = window.innerHeight / 2
      const elementMiddle = rect.top + containerHeight / 2
      
      // Reduce movement on mobile for smoother effect
      const isMobile = window.innerWidth < 768
      const parallaxStrength = isMobile ? 0.4 : 0.8
      
      const distanceFromCenter = (elementMiddle - viewportMiddle) * parallaxStrength
      parallaxOffset.value = -distanceFromCenter
      
      ticking = false
    })
  }
  ticking = true
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
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
}
</style>