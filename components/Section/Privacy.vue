<script setup>
const containerRef = ref(null)
const currentSlide = ref(0)

const slides = ref([
  {
    image: '/privacy/diagram-01.svg',
    text: '<span class="highlight">Independent nodes</span> are randomly sampled from the TACo network to create an access control cohort.'
  },
  {
    image: '/privacy/diagram-02.svg',
    text: 'The cohort of TACo nodes initializes a Distributed Key Generation ritual, which generates a <span class="highlight">persistent public key</span>.'
  },
  {
    image: '/privacy/diagram-03.svg',
    text: 'The data producer encrypts the private data using the persistent public key, and specifies <span class="highlight">conditions for access</span> – these are embedded alongside the ciphertext.'
  },
  {
    image: '/privacy/diagram-04.svg',
    text: 'The <span class="highlight">encrypted payload</span> (ciphertext + conditions) is uploaded to a storage layer or transmitted via a transport layer, so it can be retrieved by a data consumer.'
  },
  {
    image: '/privacy/diagram-05.svg',
    text: 'The data consumer requests access to the data. TACo nodes individually authenticate them, then validate that each <span class="highlight">access condition</span> is fulfilled.'
  },
  {
    image: '/privacy/diagram-06.svg',
    text: 'If a threshold of TACo nodes confirm that the conditions are fulfilled, <span class="highlight">decryption material</span> is provisioned to the data consumer. The ciphertext is decrypted locally.'
  }
])

const swiper = useSwiper(containerRef, {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: true
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}">${index + 1}</span>`
    }
  },
  speed: 700,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  on: {
    slideChange: (swiper) => {
      currentSlide.value = swiper.realIndex
    }
  }
})
</script>

<template>
  <section class="bg-black lg:flex-row lg:flex relative">
    <div class="hero-body min-h-[calc(100svh)] flex flex-col justify-between">
      <div class="lg:p-7 p-4 max-w-[90rem]">
        <h2 class="text-white lg:text-2xl text-mobile-2xl font-headline font-bold ">
          <span class="text-[#909090]">The privacy Layer </span><br>
          <span class="text-[#909090]">with </span>
          <span class="text-white">nothing to hide.</span>
        </h2>
      </div>
      <div class="max-lg:flex max-lg:flex-col-reverse">
        <div class="flex flex-col gap-4 lg:px-7 px-4 pb-4 lg:pb-7">
          <div class="swiper-pagination font-mono"></div>
          <div class="relative ">
            
            <div class="text-mobile-xl opacity-0 pointer-events-none lg:text-xl max-lg:bottom-0 font-headline text-white max-w-[32rem] "> 
              If a threshold of TACo nodes confirm that the conditions are fulfilled, decryption material is provisioned to the data consumer. The ciphertext is decrypted locally
            </div>
            <Transition name="slide-text-fade" mode="out-in">
              <div 
  :key="currentSlide" 
  class="text-mobile-xl lg:text-xl lg:top-0 max-lg:bottom-0 font-headline text-white max-w-[32rem] absolute"
  v-html="slides[currentSlide].text"
>
</div>
            </Transition>
          </div>
        </div>
        <ClientOnly>
          <swiper-container ref="containerRef" :init="false" class="lg:max-w-[40vw] lg:absolute lg:right-0 lg:bottom-0">
            <swiper-slide v-for="(slide, index) in slides" :key="index" class="flex items-center justify-center">
              <img :src="slide.image" :alt="`Diagram ${index + 1}`" class="max-w-full h-auto" />
            </swiper-slide>
          </swiper-container>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.swiper-pagination) {
  position: relative !important;
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
  align-items: flex-end !important;
}



@media (max-width: 1024px) {
  swiper-container {
    width: calc(100% - 2rem) !important;
    margin-right: 1rem !important;
    margin-left: 1rem !important;
    margin-bottom: 1rem !important;
  }

  swiper-slide {
    justify-content: center !important;
    align-items: center !important;
  }
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
  margin: 0 !important;
}

:deep(.swiper-pagination-bullet-active) {
  color: #96ff5e;
  opacity: 1;
  background: transparent;
  border-color: #fff;
}

@media (max-width: 1024px) {
  :deep(.swiper-pagination-bullet) {
    width: 6px;
    height: 6px;
    padding: 0;
    font-size: 0;
    background: #fff;
    border-radius: 50%;
    opacity: 0.5;
  }


  .slide-text-fade-enter-active,
.slide-text-fade-leave-active {
  transition: all 0.35s ease;
  position: absolute;
  width: 100%;
  top: inherit !important;
  bottom: 0 !important;
  left: 0;
}

  :deep(.swiper-pagination-bullet-active) {
    background: #96ff5e;
    opacity: 1;
  }

  .swiper-pagination {
    width: fit-content !important;
    padding: 0.5rem 0.75rem !important;
    margin: 0.5rem auto 0 !important;
    border-radius: 1rem !important;
    background-color: #252525 !important;
  }
}

swiper-container {
  --swiper-theme-color: #fff;
}

swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide-text-fade-enter-active,
.slide-text-fade-leave-active {
  transition: all 0.35s ease;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

.slide-text-fade-enter-from,
.slide-text-fade-leave-to {
  opacity: 0;
  transform: translateY(3px);
}

.slide-text-fade-enter-to,
.slide-text-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Ensure span takes full width */
.relative span {
  width: 100%;
}
</style>