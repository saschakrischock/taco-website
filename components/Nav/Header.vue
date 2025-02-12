<template>
  <div>
    <nav 
      :class="[
        'flex z-30 p-4 lg:p-7 w-full fixed top-0 justify-between items-center transition-all duration-300',
        { 'translate-y-0': isVisible, '-translate-y-full': !isVisible },
      ]"
    >
      <SvgLogo :class="[
        'w-12 h-[1.7rem] transition-[filter] duration-300',
        { 'invert': isOverDarkSection }
      ]"/>
      <NavLocalwidget :class="[
        'transition-[filter] duration-300',
        { 'invert': isOverDarkSection }
      ]"/>
      <div class="h-[11px] max-lg:hidden justify-start items-center gap-8 inline-flex">
        <a 
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

const isVisible = ref(true)
const atTop = ref(true)
const lastScrollPosition = ref(0)
const scrollThreshold = 50
const isOverDarkSection = ref(false)

const navItems = [
  { href: '#build', text: 'Build' },
  { href: '#editorials', text: 'Editorials' },
  { href: '#contact', text: 'Contact' }
]

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