<template>
  <section class="bg-white relative flex flex-col justify-between min-h-[100dvh]">
    <div class="lg:p-7  p-4 max-w-[90rem]">
      <h2 class="lg:text-2xl font-bold text-mobile-2xl font-headline ">
        Access
        <span class="text-[#96FF5E]"> conditions </span>
        <br>
        <span class="text-black">that fit your use case.</span>
      </h2>
    </div>
    <div class="lg:p-7 font-mono">
      <div class="grid fade-element lg:absolute lg:bottom-7 max-lg:pb-4 lg:px-7 px-4  w-full lg:left-0 grid-cols-1 items-end  lg:grid-cols-3 lg:gap-7">
        <div v-for="(item, index) in items" 
             :key="index"
             ref="cardRefs"
             class="w-full border-t lg:border-b max-lg:last-of-type:border-b border-black relative cursor-pointer overflow-hidden transition-all duration-500"
             :style="{ 
               height: `${openItems[index] ? fullHeights[index] : baseHeight}px`
             }"
             @click="toggleItem(index)"
             @mouseenter="!isMobile && handleHover(index, true)"
             @mouseleave="!isMobile && handleHover(index, false)">
          
          <!-- Icon -->
          <div class="px-2 pt-2" ref="iconRefs">
            <div class="flex justify-between items-start">
              <component :is="item.icon" />
            </div>
          </div>

          <!-- Plus/Cross button -->
          <button
            class="absolute right-2 top-4 text-black transition-all duration-500 z-10"
            :class="{ 'rotate-45': openItems[index] }">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="7.10742" y="3.55225" width="1.68" height="7" transform="rotate(90 7.10742 3.55225)" fill="black"/>
<rect x="4.44727" y="7.89233" width="1.68" height="7" transform="rotate(-180 4.44727 7.89233)" fill="black"/>
</svg>

          </button>

          <!-- Code Block -->
          <div ref="codeBlockRefs"
               class="px-2 transition-all duration-500"
               :style="{
                 opacity: openItems[index] ? 1 : 0,
                 transform: openItems[index] ? 'scaleY(1)' : 'scaleY(1)',
                 transformOrigin: 'center',
                 transitionDelay: openItems[index] ? '500ms' : '0ms',
                 visibility: openItems[index] ? 'visible' : 'hidden',
                 position: 'relative',
                 zIndex: 1
               }">
            <pre class="bg-gray-50 p-4 pb-0 mt-2  rounded-xl font-mono text-sm whitespace-pre-wrap break-words"><code :class="{ 'text-mono animate-type': openItems[index] }" v-html="highlightSyntax(item.codeExample)"></code>
            </pre>
           
          </div>

          <!-- Title -->
          <div ref="titleRefs"
               class="absolute inset-x-0 bottom-0 transition-transform duration-500"
               :style="{
                 transform: openItems[index] ? `translateY(-${descriptionHeights[index]}px)` : 'translateY(0)'
               }">
            <div class="px-2 pb-4 bg-white">
              <div class="text-black text-sm mono-text text-mono">
                {{ item.title }}
              </div>
            </div>
          </div>

          <!-- Description -->
          <div ref="descriptionRefs"
               class="absolute text-mono inset-x-0 bottom-0 px-2 pb-4 text-black text-sm transition-all duration-500"
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
const Lock = resolveComponent('SvgIconLock')
const Box = resolveComponent('SvgIconBox')
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
    title: 'NFT-gating',
    content: 'Predicate decryption rights on ownership of a special-purpose NFTs. Works for digital media, event streams and beyond.',
    icon: Box,
    codeExample: `import { conditions } from '@nucypher/taco';
const nft_high_quality_condition = new condition.predefined.erc721.ERC721Balance({
  chain: <span class="text-gray-400">1</span>,
  contractAddress: '0x008646372cc42E1a627FCe94Aa7a7033e7CF075A',
  returnValueTest: {
    comparator: '>',
    value: <span class="text-gray-400">1</span>,
  },
});`
  },
  {
    title: 'Secret recovery',
    content: 'Share your seed phrase or password  – to beneficiaries or your future self – without risking DOS by an intermediary.',
    icon: Lock,
    codeExample: `import { conditions } from '@nucypher/taco';
const age_requirement_condition = new conditions.base.time.TimeCondition({
    chain: <span class="text-gray-400">1</span>,
    returnValueTest: {
        comparator: '>=',
        value: <span class="text-gray-400">1770508800</span>,
    },
});`
  },
  {
    title: 'Inference protection',
    content: 'Prevent third-parties from harvesting or blocking communication between end-users and generative models.',
    icon: Secure,
    codeExample: `import { conditions } from '@nucypher/taco';
const beneficiary_condition = new conditions.base.contract.ContractCondition({
    contractAddress: '0x1e988ba4692e52Bc50b375bcC8585b95c48AaD77',
    method: 'isAllowedModel',
    functionAbi: isAllowedModelAbi,   <span class="text-gray-300">// custom function ABI</span>
    parameters: [':userAddress'],
    chain:  <span class="text-gray-400">1</span>,
    returnValueTest: {
      comparator: '==',
      value: <span class="text-gray-400">true</span>,
    },
});`
  }
])

const toggleItem = (index) => {
  handleHover(index, !openItems.value[index])
}
</script>
