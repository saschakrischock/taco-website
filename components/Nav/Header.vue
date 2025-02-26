<template>
  <div>

    <button v-show="!isMenuOpen"   @click="toggleMenu" class="mobile-trigger lg:hidden z-[100] fixed top-4 cursor-pointer right-4 py-[0.8rem] px-[1rem]  bg-[#f4f4f4] rounded-xl flex-col justify-between items-center inline-flex">
<div class=" justify-center items-center flex">
<div class=" relative">
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="7.125" y="3.16" width="1.68" height="7" transform="rotate(90 7.125 3.16)" fill="black"/>
<rect x="4.46484" y="7.5" width="1.68" height="7" transform="rotate(-180 4.46484 7.5)" fill="black"/>
</svg>



</div>
</div>
</button>

<Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-show="isMenuOpen"
        class="mobile-menu lg:hidden flex fixed w-full h-full z-50 flex-col justify-center bg-opacity-80 bg-white"
      >
        <div class="flex flex-col h-1/2 justify-center gap-8 items-center">
          <!-- Close Button -->
          <button 
            @click="toggleMenu"
            class="hover:fill-[#96FF5E] duration-300 bg-[#f4f4f4] p-8 rounded-[30px]"
          >
            <svg 
              class="rotate-45 block" 
              width="8" 
              height="8" 
              viewBox="0 0 8 8" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="7.125" y="3.16" width="1.68" height="7" transform="rotate(90 7.125 3.16)" fill="black"/>
              <rect x="4.46484" y="7.5" width="1.68" height="7" transform="rotate(-180 4.46484 7.5)" fill="black"/>
            </svg>
          </button>
          
          <!-- Navigation Items -->
          <a target="_blank"
            v-for="item in navItems" 
            :key="item.href"
            :href="item.href"
            :class="[
              'transition-colors text-black bg-[#f4f4f4] p-8 rounded-[30px] duration-300 text-lg font-normal font-mono mono-text hover:text-[#96FF5E]',
            
            ]"
            @click="toggleMenu"
          >
            {{ item.text }}
          </a>
        </div>
      </div>
    </Transition>

    <nav 
      :class="[
        'flex z-30 p-4 lg:p-7 w-full fixed top-0 justify-between items-center transition-all duration-300',
        { 'translate-y-0': isVisible, '-translate-y-full': !isVisible },
      ]"
    >
    
      <button 
        @click="scrolltoTop"
        :class="[
          'w-12 h-[1.7rem] transition-[filter] duration-300',
          { 'invert': isOverDarkSection }
        ]"
      >
        <NavLogo />
      </button>
     <!-- <NavLocalwidget :class="[
        'transition-[filter] duration-300',
        { 'invert': isOverDarkSection }
      ]"/>-->
      <div class="h-[11px] max-lg:hidden justify-start items-center gap-8 inline-flex">
        <a target="_blank"
          v-for="item in navItems" 
          :key="item.href"
          :href="item.href"
          :class="[
            'transition-colors duration-300 text-lg font-normal font-mono mono-text hover:text-[#96FF5E]',
            isOverDarkSection ? 'text-white' : 'text-black'
          ]"
        >
          {{ item.text }}
        </a>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const isVisible = ref(true)
const atTop = ref(true)
const lastScrollPosition = ref(0)
const scrollThreshold = 50
const isOverDarkSection = ref(false)

const navItems = [
  { href: 'https://docs.taco.build/', text: 'Build' },
 // { href: '#editorials', text: 'Editorials' },
  { href: 'https://github.com/nucypher/taco-web', text: 'Repos' },
  { href: 'https://playground.nucypher.io/', text: 'Playground' },
  { href: 'https://discord.gg/buildwithtaco', text: 'Contact' }
]


const scrolltoTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Toggle menu function
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  
  // Toggle body scroll when menu is open
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}

// Function to check the background color of an element
const isElementDark = (element) => {
  const bgcolor = window.getComputedStyle(element).backgroundColor
  const rgb = bgcolor.match(/\d+/g)
  if (!rgb) return false
  
  // Calculate relative luminance
  const [r, g, b] = rgb.map(x => {
    x = parseInt(x) / 255
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
  })
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  
  return luminance < 0.5
}

// Create intersection observer for dark/light section detection
const createSectionObserver = () => {
  const header = document.querySelector('nav')
  const headerHeight = header?.offsetHeight || 0
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const isDark = isElementDark(entry.target)
          if (entry.boundingClientRect.top <= headerHeight) {
            isOverDarkSection.value = isDark
          }
        }
      })
    },
    {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: `-${headerHeight}px 0px 0px 0px`
    }
  )

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section)
  })

  return observer
}

const handleScroll = () => {
  const currentScrollPosition = window.scrollY
  atTop.value = currentScrollPosition < 10

  if (Math.abs(currentScrollPosition - lastScrollPosition.value) < scrollThreshold) {
    return
  }

  isVisible.value = 
    currentScrollPosition < lastScrollPosition.value ||
    currentScrollPosition < 50

  lastScrollPosition.value = currentScrollPosition
}

let ticking = false
const throttledScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll()
      ticking = false
    })
    ticking = true
  }
}

let sectionObserver = null

onMounted(() => {
  window.addEventListener('scroll', throttledScroll)
  sectionObserver = createSectionObserver()
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledScroll)
  if (sectionObserver) {
    sectionObserver.disconnect()
  }
})
</script>