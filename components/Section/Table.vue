<!-- pages/index.vue -->
<template>
  <section class="hero bg-black min-h-[100dvh] flex justify-between pb-4 lg:pb-7 flex-col  is-primary is-fullheight">
    <div class="hero-body">
      <div class="lg:p-7 p-4 max-w-[90rem]">
        <h2 class="text-white font-headline lg:text-2xl text-mobile-2xl font-bold font-['ABC Diatype Unlicensed Trial']">
          <span class="text-[#909090]">The</span>
          <span class="text-white"> zero compromiss </span>
          <span class="text-[#909090]">solution.</span>
        </h2>
        <div class="max-lg:hidden relative" >
          <div class="font-mono mt-4 opacity-0 pointer-events-none">{{ featuresWithDescriptions[7].description }}</div>
        <transition name="fade-up">
          <div v-if="isHovering" class="hidden absolute top-0 transition-all duration-300 lg:block text-white font-mono  ">
            {{ currentHoverText }}
          </div>
        </transition>
      </div>
      </div>
    </div>

    <div class="relative lg:px-7 px-4 mb-0 ">
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
            <div class="text-white pr-1 h-[auto] w-[40%] text-[15px] lg:text-[20px] font-headline font-medium font-['ABC Diatype Medium'] leading-[20px]">
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
      <div class="hidden fade-element lg:grid grid-cols-6 gap-y-4 gap-x-4 overflow-hidden">
        <!-- Headers -->
        <div v-for="header in headers" :key="header"  @mouseenter="() => { isHovering = true; currentHoverText = header.description; }"
          @mouseleave="() => { isHovering = false; currentHoverText = ''; }" 
             class="text-white first-of-type:pointer-events-none hover:text-[#96FF5E] transition-all duration-300 cursor-default top text-center font-headline header text-[20px] font-medium mb-0 font-['ABC Diatype Medium'] leading-[18px]">
          {{ header.title }}
        </div>

        <!-- Desktop Content -->
        <template v-for="(feature, i) in featuresWithDescriptions" :key="i">
          <div 
            class="text-white hover:text-[#96FF5E] transition-all duration-300 cursor-default text-[20px] font-headline pr-2 font-medium font-['ABC Diatype Medium'] leading-[20px] pt-3 pb-2 border-t border-white"
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
const headers = [
  { title: 'Feature', description: '' },
  { title: 'TACo', description: 'Control data access via TACo, a general-purpose access control and secrets management protocol, that has been permissionless and decentralized from day one. ' },
  { title: 'LIT', description: 'Control data access via LIT Protocol, a threshold decryption-based service that relies on a permissioned group of servers running TEE environments.' },
  { title: 'Smart Contract', description: 'Control data access via smart contracts, which are self-executing programs that enable untrusted code execution, secured by a base blockchain (e.g. Ethereum).' },
  { title: 'Public Key Infra', description: 'Control data access via Public Key Infrastructure or asymmetric encryption, which involves encrypting for a recipient using their known public key, on the client/device of the data producer.' },
  { title: 'Cloud KMS', description: 'Control data access via a cloud service like AWS Key Management Service or Google Cloud Key Management, which involves trusting either the developer, cloud provider, or both – via a master key-oriented architecture.' }
]

const solutions = ['TACo', 'LIT', 'Smart Contract', 'PKI', 'Cloud KMS']

const isHovering = ref(false)
const currentHoverText = ref('')


const featuresWithDescriptions = [
  {
    name: 'End-to-end encrypted sharing',
    description: 'When private data is shared between devices, end-to-end encryption means the data cannot be decrypted in the middle. If there is a centralized authority managing access, whether this is a cloud provider, server manager or a permissioned group of service-providers, data can be viewed in plaintext form and the system cannot claim to be privacy-preserving. ',
    TACo: 'YES',
    LIT: 'YES',
    EVMContract: 'X',
    PKI: 'YES',
    CloudService: 'X'
  },
  {
    name: 'Scalable to millions of users',
    description: 'Scalable access control avoids the computational overhead of encrypting for each individual recipient locally on the data producer‘s device, and avoids the need to authenticate each recipient at the time of encryption – both of which place restriction on the size and complexity of intra-user data sharing. This is particularly restrictive in one-to-many and many-to-many systems, like social networks.',
    TACo: 'YES',
    LIT: 'YES',
    EVMContract: 'X',
    PKI: 'X',
    CloudService: 'YES'
  },
  {
    name: 'Arbitrary access logic',
    description: 'Arbitrary access logic refers to a highly expressive system for defining conditions that govern data access. It allows for the combination of multiple conditions into a structured set, enabling flexible and dynamic access policies. It‘s also possible to weave in IfThenElse logic, arbitrary calls to APIs, and composable authentication methods into the condition verification runtime.',
    TACo: 'YES',
    LIT: 'YES',
    EVMContract: 'X',
    PKI: 'X',
    CloudService: 'YES'
  },
  {
    name: 'Redundant & fault-tolerant',
    description: 'To reach parity with established cloud providers, access control services must be redundant (i.e. have built-in back-ups across a diverse network of service-providers), fault-tolerant (i.e. do not require all service-providers to be perfectly configured) and highly available (service-providers must be heavily incentivized for uptime and reliability).',
    TACo: 'YES',
    LIT: 'X',
    EVMContract: 'YES',
    PKI: 'X',
    CloudService: 'YES'
  },
  {
    name: 'Crypto\u00ADeconomically \u00ADsecure',
    description: 'Cryptoeconomic security adds an extra layer of resilience and safety to an access control service – service-providers are required to deposit collateral, subsidized with a native token, and can be economically penalized for errant behavior. This adds powerful disincentives and logistical friction to any attempts to collude.',
    TACo: 'YES',
    LIT: 'X',
    EVMContract: 'YES',
    PKI: 'X',
    CloudService: 'X'
  },
  {
    name: 'Battle-tested network',
    description: 'Battle-tested networks have been live on mainnet for a significant period (>3 years), with protocols that execute sensitive cryptographic operations, and have not suffered any breaches/exploits since launching with real-world customers and real-world sensitive data. This goes beyond smart contract audits, rather is a substantive track record for operationalizing and decentralizing cryptographic primitives.',
    TACo: 'YES',
    LIT: 'X',
    EVMContract: 'YES',
    PKI: 'X',
    CloudService: 'X'
  },
  {
    name: 'Transparent trust model',
    description: 'No third-party integration imposes zero additional trust burden onto the app‘s end-users. Transparent trust models explain, with sufficient nuance, the trust assumptions associated with using a given technology – including how these assumptions evolve over time, and how they can be tuned by adopting developers.',
    TACo: 'YES',
    LIT: 'X',
    EVMContract: 'YES',
    PKI: 'YES',
    CloudService: 'X'
  },
  {
    name: 'Off/multi-chain condition resolution',
    description: 'In conditions-based decryption, access to private data depends on computational/system state  – e.g. has a given viewer paid for access to a given livestream. This state can exist on a base chain (e.g. Ethereum), an L2 (e.g. Polygon), another chain (e.g. Solana), or in Web 2.0 state (e.g. a weather API,  DNS records for email account ownership). Off-chain and multichain condition resolution means that the system is compatible with multiple sources of truth.',
    TACo: 'YES',
    LIT: 'YES',
    EVMContract: 'X',
    PKI: 'X',
    CloudService: 'YES'
  }
]
</script>

<style>
.header:first-child::before {
  display: none;
}

.fade-element.white-text:first-child {
  pointer-events: none;
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