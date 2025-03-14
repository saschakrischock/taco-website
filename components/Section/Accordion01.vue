<template>
  <section class="bg-black flex relative flex-col justify-between min-h-[100svh]">
    <div class="lg:p-7  p-4 max-w-[90rem]">
      <h2 class="text-white font-headline font-bold lg:text-2xl text-mobile-2xl">
        <span>Web3 needs TACo</span><br>
        <span class="text-[#909090]"> to fulfill a long-awaited promise.</span>
      </h2>
    </div>
    <div class="lg:p-7 max-lg:pb-7 fade-element font-mono">
      <div class="grid grid-cols-1 w-full lg:px-7 px-4  lg:absolute lg:bottom-7 lg:left-0 items-end  lg:grid-cols-3 lg:gap-7">
        <div v-for="(item, index) in items" 
             :key="index"
             ref="cardRefs"
             class="w-full border-t lg:border-b max-lg:last-of-type:border-b border-white relative cursor-pointer overflow-hidden transition-all duration-500"
             :style="{ 
               height: `${openItems[index] ? fullHeights[index] : baseHeight}px`
             }"
             @click="toggleItem(index)"
             @mouseenter="!isMobile && handleHover(index, true)"
             @mouseleave="!isMobile && handleHover(index, false)">
          
          <!-- Icon -->
          <div class="p-2 pt-4" ref="iconRefs">
            <div class="flex justify-between  items-start">
              <component :is="item.icon" />
            </div>
          </div>

          <!-- Plus/Cross button - combined transforms -->
          <button
            class="absolute right-2 top-4 text-white transition-all duration-500 z-10"
            :class="{ 'rotate-45': openItems[index] }">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="7.10742" y="3.55225" width="1.68" height="7" transform="rotate(90 7.10742 3.55225)" fill="white"/>
<rect x="4.44727" y="7.89233" width="1.68" height="7" transform="rotate(-180 4.44727 7.89233)" fill="white"/>
</svg>

          </button>

          <!-- Title -->
          <div ref="titleRefs"
               class="absolute inset-x-0 bottom-0 transition-transform duration-500"
               :style="{
                 transform: openItems[index] ? `translateY(-${descriptionHeights[index] || 0}px)` : 'translateY(0)'
               }">
            <div class="px-2 pb-2 bg-black">
              <div class="text-white text-sm w-[12rem] mono-text">
                {{ item.title }}
              </div>
            </div>
          </div>

          <!-- Description -->
          <div ref="descriptionRefs"
               class="absolute  inset-x-0 bottom-0 px-2 pb-4 text-white text-sm transition-all duration-500"
               :style="{
                 opacity: openItems[index] ? 1 : 0,
                 transform: openItems[index] ? 'translateY(0)' : 'translateY(100%)',
                                  transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms ease-in'
               }">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
const Globe = resolveComponent('SvgIconGlobe')
const Database = resolveComponent('SvgIconDatabase')
const Ai = resolveComponent('SvgIconAi')

 import { useMatrixText } from '~/composables/matrix';
 useMatrixText();

const isMobile = ref(false)
const openItems = ref({})
const descriptionHeights = ref({})
const baseHeight = ref(0)
const fullHeights = ref({})

// Refs for measurements
const cardRefs = ref([])
const iconRefs = ref([])
const titleRefs = ref([])
const descriptionRefs = ref([])

const calculateHeights = async () => {
  await nextTick()
  
  // First calculate the base height using the maximum of icon + title heights
  let maxIconHeight = 0
  let maxTitleHeight = 0

  iconRefs.value.forEach(ref => {
    const height = ref?.offsetHeight || 0
    maxIconHeight = Math.max(maxIconHeight, height)
  })

  titleRefs.value.forEach(ref => {
    const height = ref?.offsetHeight || 0
    maxTitleHeight = Math.max(maxTitleHeight, height)
  })

  // Set uniform base height for all items
  baseHeight.value = maxIconHeight + maxTitleHeight + 32

  // Calculate individual expanded heights
  items.value.forEach((_, index) => {
    const descHeight = descriptionRefs.value[index]?.offsetHeight || 0
    descriptionHeights.value[index] = descHeight
    fullHeights.value[index] = baseHeight.value + descHeight
  })
}

const handleHover = (index, isEntering) => {
  openItems.value[index] = isEntering
}

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
  }
  
  const handleResize = () => {
    checkMobile()
    calculateHeights()
  }
  
  checkMobile()
  calculateHeights()
  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
  }
})

const items = ref([
  {
    title: 'Decentralized Social Networks & Communities',
    content: 'Sufficiently decentralized is a cop-out. TACo can handle many-to-many data sharing at scale, regardless of the size of file or frequency of access request. And without a centralized authority that may harvest, exploit, monetize, or censor interpersonal communication.',
    icon: Globe
  },
  {
    title: 'Decentralized GenAI',
    content: 'Communication with or between LLM models should be 100% private and censorship-resistant, not mined by intermediaries or blocked by a central authority. TACo can be harnessed for e2ee inference, access-controlled agentic RAG, and distributed computation.',
    icon: Ai
  },
  {
    title: 'Decentralized Storage & Databases',
    content: 'TACo is the perfect complement to persistent storage and GraphQL/SQL databases – at long last enabling users to grant future access to uploaded data – without having to download & re-encrypt locally using a known data consumer’s public key.',
    icon: Database
  }
])

const toggleItem = (index) => {
  handleHover(index, !openItems.value[index])
}
</script>