<script setup>
const containerRef = ref(null)
const slides = ref([
  '/privacy/diagram-01.svg',
  '/privacy/diagram-02.svg',
  '/privacy/diagram-03.svg',
  '/privacy/diagram-04.svg',
  '/privacy/diagram-05.svg',
  '/privacy/diagram-06.svg'
])

const swiper = useSwiper(containerRef, {
  loop: true,
  autoplay: true,
  pagination: {
    el: '.swiper-pagination', // Changed from bulletElement to el
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}">${index + 1}</span>`
    }
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  }
})
</script>

<template>
  <section class="bg-black flex-row flex ">
    <div class="hero-body h-[calc(100svh)]  flex flex-col justify-between">
      <div class="p-7 max-w-[90rem]">
        <h1 class="text-white text-2xl font-bold font-['ABC Diatype Unlicensed Trial']">
          <span class="text-[#909090]">The privacy Layer</span><br>
          <span class="text-[#909090]">with </span>
          <span class="text-white">nothing to hide</span>
        </h1>
      </div>
      <div class="flex flex-col gap-4 px-7 pb-7">
      <div class="swiper-pagination font-mono "></div>
      <div class="lg:text-xl text-mobile-xl text-white max-w-[27rem]">
        Independent nodes are sampled from the Threshold Network to collectively generate a distributed public key.
      </div>
    </div>
    </div>



    <ClientOnly>
      <swiper-container ref="containerRef" :init="false" class="">
        <swiper-slide v-for="(slide, index) in slides" :key="index" class="flex items-center justify-center">
          <img :src="slide" :alt="`Diagram ${index + 1}`" class="max-w-full h-auto" />
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
  </section>
</template>

<style scoped>
:deep(.swiper-pagination) {
  position: relative !important; /* Force override Swiper's default positioning */
  bottom: 0 !important;
  left: 0 !important;
  width: auto !important;
  display: flex;
  gap: 8px;
}

swiper-container {
  width: 50rem;
  margin-bottom: 2rem;
  margin-right: 2rem;
}

swiper-slide {
    justify-content: flex-end !important;
    align-items: flex-end !important ;
}

:deep(.swiper-pagination-bullet) {
  width: 0;
  height: 0;
  padding-right: 2rem;
  padding-bottom: 1rem;
  text-align: center;
  line-height: 30px;
  color: #fff;
  opacity: 0.3;
  font-size: 15px;
  cursor: pointer;
  background: transparent;
  border: none;
  margin: 0 !important; /* Remove default margins */
}

:deep(.swiper-pagination-bullet-active) {
  color: #96ff5e;
  opacity: 1;
  background: transparent;
  border-color: #fff;
}

swiper-container {
  --swiper-theme-color: #fff;
}

swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>