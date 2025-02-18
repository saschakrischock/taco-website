<!-- pages/index.vue -->
<template>
  <section class="hero bg-black min-h-[100svh] flex justify-between pb-4 lg:pb-7 flex-col  is-primary is-fullheight">
    <div class="hero-body">
      <div class="lg:p-7 p-4 max-w-[90rem]">
        <h2 class="text-white font-headline lg:text-2xl text-mobile-2xl font-bold font-['ABC Diatype Unlicensed Trial']">
          <span class="text-[#909090]">The</span>
          <span class="text-white"> zero compromiss </span>
          <span class="text-[#909090]">solution.</span>
        </h2>
        <transition name="fade-up">
          <div v-if="isHovering" class="hidden lg:block text-white font-mono mt-4 mb-4 h-6">
            {{ currentHoverText }}
          </div>
        </transition>
      </div>
    </div>

    <div class="relative lg:px-7 px-4 ">
      <!-- Mobile View -->
      <div class="lg:hidden">
        <!-- Headers -->
        <div class="flex items-center justify-between mb-2">
          <div class="text-white text-[15px] lg:text-[20px] font-medium font-headline font-['ABC Diatype Medium'] leading-[18px]">
            Feature
          </div>
          <div class="flex items-center w-[60%]">
            <span class="text-white w-1/2 text-center text-15px lg:text-[20px] font-medium font-headline font-['ABC Diatype Medium'] leading-[18px]">
              TACo
            </span>
            <div class="relative w-1/2 inline-block">
              <select 
                v-model="selectedCompetitor"
                class="appearance-none bg-[#333] w-full text-white px-3 py-1 rounded-full text-[15px] lg:text-[20px] font-headline font-medium font-['ABC Diatype Medium'] min-w-[100px]"
              >
                <option v-for="solution in solutions.slice(1)" :key="solution" :value="solution">
                  {{ solution }}
                </option>
              </select>
              <div class="absolute height-[1.7rem] right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <span class="text-white text-[0.6rem]">▼</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Content -->
        <div class="lg:space-y-4">
          <div v-for="(feature, i) in featuresWithDescriptions" :key="i" 
               class="flex border-t border-white py-1">
            <div class="text-white pr-1 h-[40px] w-[40%] text-[15px] lg:text-[20px] font-headline font-medium font-['ABC Diatype Medium'] leading-[20px]">
              {{ feature.name }} 
            </div>
            <div class="flex items-center w-[60%] mobile-border justify-around">
              <span :class="[
                'font-mono text-[15px] mono-text text-center w-1/2 min-w-[40px]',
                feature.TACo === 'YES' ? 'text-[#96FF5E]' : 'text-gray-400'
              ]">
                {{ feature.TACo }}
              </span>
              <span :class="[
                'font-mono text-[15px] mono-text text-center w-1/2 min-w-[40px]',
                feature[selectedCompetitor] === 'YES' ? 'text-[#96FF5E]' : 'text-gray-400'
              ]">
                {{ feature[selectedCompetitor] }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop View -->
      <div class="hidden fade-element lg:grid grid-cols-6 gap-y-4 gap-x-4">
        <!-- Headers -->
        <div v-for="header in headers" :key="header" 
             class="text-white top text-center font-headline header text-[20px] font-medium mb-0 font-['ABC Diatype Medium'] leading-[18px]">
          {{ header }}
        </div>

        <!-- Desktop Content -->
        <template v-for="(feature, i) in featuresWithDescriptions" :key="i">
          <div 
            class="text-white hover:text-[#96FF5E] cursor-default text-[20px] font-headline pr-2 font-medium font-['ABC Diatype Medium'] leading-[20px] pt-3 pb-2 border-t border-white"
            @mouseenter="() => { isHovering = true; currentHoverText = feature.description; }"
            @mouseleave="() => { isHovering = false; currentHoverText = ''; }"
          >
            {{ feature.name }}
          </div>
          <div v-for="(solution, index) in solutions" :key="solution" 
               class="border-t border-white flex items-center justify-center pt-7 pb-2">
            <span :class="[
              'font-mono text-[15px] mono-text text-center block',
              index === 0 && feature[solution] === 'YES' ? 'text-[#96FF5E]' : 'text-gray-400'
            ]">
              {{ feature[solution] }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
const selectedCompetitor = ref('LIT')
const headers = ['Feature', 'TACo', 'LIT', 'EVM Contract', 'PKI', 'Cloud Service']
const solutions = ['TACo', 'LIT', 'EVMContract', 'PKI', 'CloudService']

const isHovering = ref(false)
const currentHoverText = ref('')

const featuresWithDescriptions = [
  {
    name: 'Scalable to millions of users',
    description: 'Infrastructure designed to handle massive concurrent user loads while maintaining consistent performance',
    TACo: 'YES',
    LIT: 'YES',
    EVMContract: 'X',
    PKI: 'X',
    CloudService: 'YES'
  },
  {
    name: 'Arbitrary Access Conditions',
    description: 'Customize and implement any access control logic without limitations or predefined constraints',
    TACo: 'YES',
    LIT: 'YES',
    EVMContract: 'X',
    PKI: 'X',
    CloudService: 'YES'
  },
  {
    name: 'Redundant & highly available',
    description: 'Distributed system architecture ensures continuous operation even during partial outages',
    TACo: 'YES',
    LIT: 'X',
    EVMContract: 'YES',
    PKI: 'X',
    CloudService: 'YES'
  },
  {
    name: 'Cryptoeconomically secure',
    description: 'Security model backed by economic incentives and cryptographic guarantees',
    TACo: 'YES',
    LIT: 'X',
    EVMContract: 'YES',
    PKI: 'X',
    CloudService: 'X'
  },
  {
    name: 'Battle-tested network',
    description: 'Production-proven infrastructure with extensive real-world deployment history',
    TACo: 'YES',
    LIT: 'X',
    EVMContract: 'YES',
    PKI: 'X',
    CloudService: 'X'
  },
  {
    name: 'Transparent trust model',
    description: 'Fully auditable security assumptions with verifiable trust relationships',
    TACo: 'YES',
    LIT: 'X',
    EVMContract: 'YES',
    PKI: 'YES',
    CloudService: 'X'
  },
  {
    name: 'Track record with infra',
    description: 'Proven history of reliable infrastructure development and maintenance at scale',
    TACo: 'YES',
    LIT: 'X',
    EVMContract: 'YES',
    PKI: 'X',
    CloudService: 'X'
  },
  {
    name: 'Multi-chain',
    description: 'Support for multiple blockchain networks with seamless cross-chain compatibility',
    TACo: '',
    LIT: 'YES',
    EVMContract: 'X',
    PKI: 'X',
    CloudService: 'X'
  }
]
</script>

<style>
.header:first-child::before {
  display: none;
}

.mobile-border {
  position: relative;
}

.mobile-border::before {
  content: '';
  display: block;
  width: 1px;
  left: 0;
  margin-left: 0;
  position: absolute;
  height: calc(100%);
  margin-top: 0;
  background-color: white;
  margin-bottom: 0;
}

.mobile-border::after {
  content: '';
  display: block;
  width: 1px;
  left: 50%;
  margin-left: 0;
  position: absolute;
  height: calc(100%);
  margin-top: 0;
  background-color: white;
  margin-bottom: 0;
}

.header::before {
  content: '';
  display: block;
  width: 1px;
  margin-left: -9px;
  position: absolute;
  height: calc(100% - 2.1rem);
  margin-top: 2.6rem;
  background-color: white;
  margin-bottom: 1rem;
}

.top:first-child {
  text-align: left;
}

.top:first-child:after {
  content: '';
  position: absolute;
  left: 30px;
  width: calc(100vw - 60px);
  height: 1px;
  top: 34px;
  z-index: 100;
  background-color: #fff;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.7s ease-out;
  transform: translateY(0);
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(3px);
}

.fade-up-enter-to,
.fade-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>