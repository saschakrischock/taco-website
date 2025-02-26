<template>
    <div class="overflow-hidden w-[100vw]">
      <p class="absolute bottom-[4.25rem] lg:hidden text-[15px] text-center w-full font-mono mono-text text-[#909090]">TACo is used (but NOT TRUSTED) by</p>
      <div class="lg:h-10 z-30 w-[100%] lg:w-[calc(60rem)] lg:max-w-[80vw] left-1/2 overflow-y-hidden -translate-x-1/2 absolute bottom-4 lg:bottom-8 p-3 bg-[#F4F4F4] lg:rounded-[10px] justify-between items-center">
        <div class="gap-4 font-mono justify-between items-center">
          <div class="text-[#909090] max-lg:hidden pr-12 absolute bg-[#F4F4F4] z-10 whitespace-nowrap text-lg font-normal mono-text" style="background: linear-gradient(to right, #F4F4F4 90%, transparent);">TACo is used (but NOT TRUSTED) by</div>
          <Vue3Marquee :clone="true">
            <div class="flex items-center gap-4 mr-4  overflow-hidden">
              <div v-for="(partner, index) in partners" :key="index" class="text-black text-[15px] lg:text-lg font-normal">
                <a v-if="partner.url" :href="partner.url" target="_blank" rel="noopener noreferrer" class="duration-300 hover:hover:text-[#96FF5E]">
                  {{ partner.name }}
                </a>
                <span v-else>{{ partner.name }}</span>
              </div>
            </div>
          </Vue3Marquee>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Define partners data with optional URLs
  const partners = [
    { name: 'Ceramic', url: '' },
    { name: 'Waku', url: '' },
    { name: 'Textile', url: '' },
    { name: 'Marlin', url: '' }, 
    { name: 'Irys', url: '' },
    { name: 'Zuzalu', url: '' },
    { name: 'Holonym', url: '' }, // No URL, will render as plain text
    { name: 'Masterfile', url: '' }
  ];
  </script>