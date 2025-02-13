<!-- pages/index.vue -->
<template>
    <section class="hero h-screen flex justify-between pb-7 flex-col bg-black is-primary is-fullheight">
      <div class="hero-body">
        <div class="p-7 max-w-[90rem]">
          <h1 class="text-white font-headline lg:text-2xl text-mobile-2xl font-bold font-['ABC Diatype Unlicensed Trial']">
            <span class="text-[#909090]">The</span>
            <span class="text-white"> zero compromiss </span>
            <span class="text-[#909090]">solution.</span>
          </h1>
          <h2 class="subtitle mt-6 font-headline text-black font-medium font-['ABC Diatype Medium Unlicensed Trial'] text-mobile-xl lg:text-xl">
            TACo is the only general-purpose access control plugin that works without trusting
            an intermediary so users aren't obliged to trust AWS your dev team or TACo.
          </h2>
        </div>
      </div>
  
      <div class="relative lg:px-7 px-4  bg-black">
        <div class="grid grid-cols-6 gap-y-4 gap-x-4">
          <!-- Headers -->
          <div v-for="header in headers" :key="header" 
               class="text-white top text-center header text-[20px] font-medium mb-0 font-['ABC Diatype Medium'] leading-[18px]">
            {{ header }}
          </div>
  
          <!-- Content -->
          <template v-for="(feature, i) in features" :key="i">
            <div  class="text-white text-[20px] pr-2  font-medium font-['ABC Diatype Medium'] leading-[20px] pt-3 pb-2 border-t border-white">
              {{ feature.name }}
            </div>
            <div v-for="(solution, index) in solutions" :key="solution" 
                 class="border-t border-white flex items-center justify-center pt-7 pb-2">
              <span :class="[
                      'font-mono text-[15px] text-center block',
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
  const headers = ['Feature', 'TACo', 'LIT', 'EVM Contract', 'PKI', 'Cloud Service']
  const solutions = ['TACo', 'LIT', 'EVMContract', 'PKI', 'CloudService']
  
  const features = [
    {
      name: 'Scalable to millions of users',
      TACo: 'YES',
      LIT: 'YES',
      EVMContract: 'X',
      PKI: 'X',
      CloudService: 'YES'
    },
    {
      name: 'Arbitrary Access Conditions',
      TACo: 'YES',
      LIT: 'YES',
      EVMContract: 'X',
      PKI: 'X',
      CloudService: 'YES'
    },
    {
      name: 'Redundant & highly available',
      TACo: 'YES',
      LIT: 'X',
      EVMContract: 'YES',
      PKI: 'X',
      CloudService: 'YES'
    },
    {
      name: 'Cryptoeconomically secure',
      TACo: 'YES',
      LIT: 'X',
      EVMContract: 'YES',
      PKI: 'X',
      CloudService: 'X'
    },
    {
      name: 'Battle-tested network',
      TACo: 'YES',
      LIT: 'X',
      EVMContract: 'YES',
      PKI: 'X',
      CloudService: 'X'
    },
    {
      name: 'Transparent trust model',
      TACo: 'YES',
      LIT: 'X',
      EVMContract: 'YES',
      PKI: 'YES',
      CloudService: 'X'
    },
    {
      name: 'Track record with infra',
      TACo: 'YES',
      LIT: 'X',
      EVMContract: 'YES',
      PKI: 'X',
      CloudService: 'X'
    },
    {
      name: 'Multi-chain',
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

  </style>