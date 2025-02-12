<template>
  <div class="bg-white relative flex flex-col justify-between min-h-screen">
    <div class="p-7 pt-6 max-w-[90rem]">
      <h1 class="lg:text-2xl text-mobile-2xl font-headline ">
        <span class="text-[#96FF5E]">The Web needs TACo</span>
        <span class="text-black"> to escape</span>
        <br>
        <span class="text-black">the clutches of Big Tech.</span>
      </h1>
    </div>
    <div class="p-7 font-mono">
      <div class="grid absolute bottom-7 grid-cols-1 items-end md:grid-cols-2 lg:grid-cols-3 gap-7">
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

          <!-- Code Block -->
          <div ref="codeBlockRefs"
               class="px-4 transition-all duration-500"
               :style="{
                 opacity: openItems[index] ? 1 : 0,
                 transform: openItems[index] ? 'scaleY(1)' : 'scaleY(1)',
                 transformOrigin: 'center',
                 transitionDelay: openItems[index] ? '500ms' : '0ms',
                 visibility: openItems[index] ? 'visible' : 'hidden',
                 position: 'relative',
                 zIndex: 1
               }">
            <pre class="bg-gray-50 p-4  rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
              <code :class="{ 'text-mono animate-type': openItems[index] }" v-html="highlightSyntax(item.codeExample)"></code>
            </pre>
           
          </div>

          <!-- Title -->
          <div ref="titleRefs"
               class="absolute inset-x-0 bottom-0 transition-transform duration-500"
               :style="{
                 transform: openItems[index] ? `translateY(-${descriptionHeights[index]}px)` : 'translateY(0)'
               }">
            <div class="px-4 pb-4 bg-white">
              <div class="text-black text-sm mono-text">
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

const isMobile = ref(false)
const openItems = ref({})
const descriptionHeights = ref({})
const codeBlockHeights = ref({})
const baseHeight = ref(0)
const fullHeights = ref({})

// Refs for measurements
const cardRefs = ref([])
const iconRefs = ref([])
const titleRefs = ref([])
const descriptionRefs = ref([])
const codeBlockRefs = ref([])

const highlightSyntax = (code) => {
  return code
    .replace(/(import|from|const|new)\b/g, '<span class="text-[#96FF5E]">$1</span>')
    .replace(/(conditions|base|time|TimeCondition)/g, '<span class="text-gray-400">$1</span>')
    .replace(/('.*?')/g, '<span class="text-gray-400">$1</span>')
}

const calculateHeights = async () => {
  await nextTick()
  
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

  baseHeight.value = maxIconHeight + maxTitleHeight + 32

  items.value.forEach((_, index) => {
    const descHeight = descriptionRefs.value[index]?.offsetHeight || 0
    const codeHeight = codeBlockRefs.value[index]?.offsetHeight || 0
    descriptionHeights.value[index] = descHeight
    codeBlockHeights.value[index] = codeHeight
    fullHeights.value[index] = baseHeight.value + descHeight + codeHeight
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
    icon: Secure,
    codeExample: `import { conditions } from '@nucypher/taco';
const age_requirement_condition = new conditions.base. time.TimeCondition ({
    chain: 1,
    returnValueTest: {
        comparator: '>=',
        value: 1770508800,
    },
});`
  },
  {
    title: 'Internet of Things',
    content: 'Communication with or between LLM models should be 100% private and censorship-resistant, not mined by intermediaries or blocked by a central authority. TACo can be harnessed for e2ee inference, acess-controlled agentic RAG, and distributed computation.',
    icon: Secure,
    codeExample: `import { Recovery } from '@nucypher/taco';
const recovery = new Recovery({
    threshold: 2,
    shares: 3,
    conditions: [timelock, multisig]
});`
  },
  {
    title: 'Activism, journalism and human rights',
    content: 'TACo is the perfect complement to persistent storage and GraphQL/SQL databases – at long last enabling users to grant future access to uploaded data – without having to download & re-encrypt locally using a known consumer public key.',
    icon: Secure,
    codeExample: `import { Delegation } from '@nucypher/taco';
const delegation = new Delegation({
    recipient: '0x...',
    duration: 86400,
    revocable: true
});`
  }
])

const toggleItem = (index) => {
  handleHover(index, !openItems.value[index])
}
</script>
