<template>
  <div class="bg-white flex flex-col justify-between min-h-screen">
    <div class="p-7 pt-6 max-w-[90rem]">
      <h1 class="text-2xl font-bold">
        <span class="text-[#96FF5E]">The Web needs TACo</span>
        <span class="text-black"> to escape</span>
        <br>
        <span class="text-black">the clutches of Big Tech.</span>
      </h1>
    </div>
    <div class="p-7 font-mono">
      <div class="grid grid-cols-1 items-end md:grid-cols-2 lg:grid-cols-3 gap-7">
        <div v-for="(item, index) in items" 
             :key="index"
             ref="cardRefs"
             class="w-full border-t border-b border-black relative cursor-pointer overflow-hidden transition-all duration-500"
             :style="{ 
               height: `${openItems[index] ? fullHeights[index] : baseHeight}px`
             }"
             @click="toggleItem(index)"
             @mouseenter="!isMobile && handleHover(index, true)"
             @mouseleave="!isMobile && handleHover(index, false)">
          
          <!-- Icon -->
          <div class="p-4" ref="iconRefs">
            <div class="flex justify-between items-start">
              <component :is="item.icon" />
            </div>
          </div>

          <!-- Plus/Cross button -->
          <button
            class="absolute right-4 top-4 text-black transition-all duration-500 z-10"
            :class="{ 'rotate-45': openItems[index] }">
            <div class="w-[7px] h-[7px] relative">
              <div class="w-[1.68px] h-[7px] left-[7px] top-[2.66px] absolute origin-top-left rotate-90 bg-black"></div>
              <div class="w-[1.68px] h-[7px] left-[4.34px] top-[7px] absolute origin-top-left -rotate-180 bg-black"></div>
            </div>
          </button>

          <!-- Title -->
          <div ref="titleRefs"
               class="absolute inset-x-0 bottom-0 transition-transform duration-500"
               :style="{
                 transform: openItems[index] ? `translateY(-${descriptionHeights[index] || 0}px)` : 'translateY(0)'
               }">
            <div class="px-4 pb-4 bg-white">
              <div class="text-black text-sm w-[12rem] mono-text">
                {{ item.title }}
              </div>
            </div>
          </div>

          <!-- Description -->
          <div ref="descriptionRefs"
               class="absolute mono-text text-mono inset-x-0 bottom-0 px-4 pb-4 text-black text-sm transition-all duration-500"
               :style="{
                 opacity: openItems[index] ? 1 : 0,
                 transform: openItems[index] ? 'translateY(0)' : 'translateY(100%)'
               }">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
const Secure = resolveComponent('SvgIconSecure')
const Eye = resolveComponent('SvgIconEye')
const Fist = resolveComponent('SvgIconFist')

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
    title: 'Hyper-sensitive, high stakes data',
    content: 'Sufficiently decentralized is a cop-out. TACo can handle many-to-many data sharing at scale, regardless of the size of file or frequency of access request. And without a centralized authority that may harvest, exploit, monetize, or censor interpersonal communication.',
    icon: Secure
  },
  {
    title: 'Internet of Things',
    content: 'Communication with or between LLM models should be 100% private and censorship-resistant, not mined by intermediaries or blocked by a central authority. TACo can be harnessed for e2ee inference, acess-controlled agentic RAG, and distributed computation.',
    icon: Eye
  },
  {
    title: 'Activism, journalism and human rights',
    content: 'TACo is the perfect complement to persistent storage and GraphQL/SQL databases – at long last enabling users to grant future access to uploaded data – without having to download & re-encrypt locally using a known data consumer‘s public key.',
    icon: Fist
  }
])

const toggleItem = (index) => {
  handleHover(index, !openItems.value[index])
}
</script>