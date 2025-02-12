<!-- CodeDisplay.vue -->
<template>
    <section class="bg-white h-screen">
        <div class="p-7 pt-6 max-w-[90rem]">
            <h1 class="text-white text-2xl font-bold">
                <span class="text-black">Access</span>
                <span class=" text-[#96FF5E]"> conditions</span>
                <br>
                <span class="text-black  ">that fit your use case.</span>
            </h1>

        </div>
      <div class="font-mono text-sm p-7">
        <pre class="whitespace-pre text-lime-400">import</pre>
        <pre class="whitespace-pre text-gray-300">{ conditions } </pre>
        <pre class="whitespace-pre text-lime-400">from</pre>
        <pre class="whitespace-pre text-emerald-400">'@nucypher/taco'</pre>
        <pre class="whitespace-pre text-lime-400">const</pre>
        <pre class="whitespace-pre text-gray-400">age_requirement_condition = </pre>
        <pre class="whitespace-pre text-lime-400">new</pre>
        <pre class="whitespace-pre text-gray-400">conditions.base.time.TimeCondition ({</pre>
        <pre class="whitespace-pre ml-4 text-gray-400">chain: <span class="text-gray-300">{{ typedChain }}</span></pre>
        <pre class="whitespace-pre text-gray-400">returnValueTest: {</pre>
        <pre class="whitespace-pre ml-8 text-gray-400">comparator: </pre>
        <pre class="whitespace-pre text-emerald-400">'>=',</pre>
        <pre class="whitespace-pre ml-8 text-gray-400">value: <span class="text-gray-300">{{ typedValue }}</span></pre>
        <pre class="whitespace-pre text-gray-400">}</pre>
        <pre class="whitespace-pre text-gray-400">});</pre>
      </div>

      <div class="p-7 font-mono">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 ">
        <div v-for="(item, index) in items" :key="index" 
             class="w-full border-t h-[20rem] border-b border-black">
          <div class="p-4 h-full relative justify-between flex flex-col space-y-4">
            <div class="flex justify-between items-start">
              <div v-html="item.svg"></div>
            </div>
            
            <div class="flex justify-between items-center">
              <div class="text-black text-sm ">{{ item.title }}</div>
            </div>

            <button @click="toggleItem(index)" class="text-black absolute right-0 bottom-3">
                <span v-if="openItems[index]" class="text-xl">−</span>
                <span v-else class="text-xl">+</span>
              </button>

            <div v-if="openItems[index]" class="text-black text-sm mt-4">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
    </div>

    
    </section>
  </template>
  
  <script setup>

const items = ref([
  {
    title: 'NFT-gating',
    content: 'NFT-gating data...',
    svg: '<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_352)"><path d="M20.872 25.1795V27.4987L27.8295 23.3573V11.8443L18.8842 6.54337V8.86254L24.7649 12.3413L17.8074 16.3998L10.8499 12.3413L16.8963 8.86254V6.54337L7.78529 11.8443V23.3573L14.9085 27.4987V25.1795L9.77315 22.1978V14.0807L16.8963 18.1392V28.6583L17.8902 29.2381L18.8842 28.6583V18.0564L25.8417 14.0807V22.1978L20.872 25.1795ZM1.98737 11.9272V6.79185C1.98737 3.97572 3.97523 1.98786 6.79136 1.98786H11.9267V0H6.79136C2.89847 0 -0.000488281 2.89896 -0.000488281 6.79185V11.9272H1.98737ZM33.7931 11.9272H35.781V6.79185C35.781 2.89896 32.882 0 28.9891 0H23.8538V1.98786H28.9891C31.8052 1.98786 33.7931 3.97572 33.7931 6.79185V11.9272ZM1.98737 23.8543H-0.000488281V28.9896C-0.000488281 32.8825 2.89847 35.7815 6.79136 35.7815H11.9267V33.7936H6.79136C3.97523 33.7936 1.98737 31.8057 1.98737 28.9896V23.8543ZM33.7931 23.8543V28.9896C33.7931 31.8057 31.8052 33.7936 28.9891 33.7936H23.8538V35.7815H28.9891C32.882 35.7815 35.781 32.8825 35.781 28.9896V23.8543H33.7931Z" fill="black"/></g><defs><clipPath id="clip0_1_352"><rect width="35.7815" height="35.7815" fill="white" transform="translate(-0.000488281)"/></clipPath></defs></svg>'
  },
  {
    title: 'Secret recovery',
    content: 'Secret recovery...',
    svg: '<svg width="33" height="41" viewBox="0 0 33 41" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_363)"><path d="M2.6395 21.3258C2.6395 18.5208 4.61951 16.5408 7.42452 16.5408C14.7671 16.5408 18.2321 16.5408 25.5746 16.5408C28.3796 16.5408 30.3596 18.5208 30.3596 21.3258V33.5359C30.3596 36.3409 28.3796 38.3209 25.5746 38.3209H7.42452C4.61951 38.3209 2.6395 36.3409 2.6395 33.5359V21.3258ZM0.659485 21.3258V33.5359C0.659485 37.4134 3.547 40.3009 7.42452 40.3009H25.5746C29.4521 40.3009 32.3397 37.4134 32.3397 33.5359V21.3258C32.3397 17.4483 29.5346 14.5608 25.5746 14.5608C18.2321 14.5608 14.7671 14.5608 7.42452 14.5608C3.4645 14.5608 0.659485 17.4483 0.659485 21.3258ZM8.57953 12.5807V10.6832C8.57953 5.98071 11.8795 2.68069 16.4996 2.68069C21.1196 2.68069 24.4196 5.98071 24.4196 10.6832V12.5807H26.3996V10.6832C26.3996 4.90821 22.1921 0.700684 16.4996 0.700684C10.807 0.700684 6.59952 4.90821 6.59952 10.6832V12.5807H8.57953ZM15.5096 20.5008V34.3609H17.4896V20.5008H15.5096Z" fill="black"/></g><defs><clipPath id="clip0_1_363"><rect width="31.6802" height="39.6002" fill="white" transform="translate(0.659424 0.701172)"/></clipPath></defs></svg>',
  },
  {
    title: 'Inference protection',
    content: 'Inference protection...',
    svg: '<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_374)"><path d="M34.3814 10.0408V7.81299L22.4997 2.69727L10.618 7.97801V10.0408L22.4997 4.84257L34.3814 10.0408ZM36.3617 8.72062V21.9225C36.3617 31.5764 30.6684 37.1872 23.4899 40.2401V42.3029C31.4935 39.1674 38.342 32.9791 38.342 21.9225V9.62825L36.3617 8.72062ZM21.5096 40.2401C14.3311 37.1872 8.63775 31.5764 8.63775 21.9225V8.80313L6.65747 9.62825V21.9225C6.65747 32.9791 13.5059 39.1674 21.5096 42.3029V40.2401ZM28.6056 17.6319L21.5921 24.5629L17.549 20.6023L16.2288 21.9225L21.5921 27.3683L29.9258 19.1171L28.6056 17.6319Z" fill="black"/></g><defs><clipPath id="clip0_1_374"><rect width="31.6845" height="39.6056" fill="white" transform="translate(6.6571 2.69824)"/></clipPath></defs></svg>'


  }
])

const openItems = ref({})

const toggleItem = (index) => {
  openItems.value[index] = !openItems.value[index]
}

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

  const typedValue = ref('1770508800')
  const typedChain = ref('1')
  const isAnimating = ref(false)
  
  const animations = {
    1: { value: '1770508800', chain: '1' },
    2: { value: '1780508800', chain: '2' },
    3: { value: '1790508800', chain: '3' }
  }
  
  const typeText = async (currentText, targetText, setter) => {
    for (let i = currentText.length; i >= 0; i--) {
      setter(currentText.slice(0, i))
      await new Promise(r => setTimeout(r, 50))
    }
    let text = ''
    for (let i = 0; i <= targetText.length; i++) {
      text = targetText.slice(0, i)
      setter(text)
      await new Promise(r => setTimeout(r, 50))
    }
  }
  
  const playAnimation = async (num) => {
    if (isAnimating.value) return
    isAnimating.value = true
    
    const target = animations[num]
    await Promise.all([
      typeText(typedValue.value, target.value, (v) => typedValue.value = v),
      typeText(typedChain.value, target.chain, (v) => typedChain.value = v)
    ])
    
    isAnimating.value = false
  }
  </script>