<script setup>
import { computed } from 'vue'
import { usePreferredDark, useFavicon } from '@vueuse/core'

// Create the reactive dark mode preference
const isDark = usePreferredDark()

// Create a computed property that changes when isDark changes
const favicon = computed(() => 
  isDark.value ? '/favicon_white.ico' : '/favicon_black.ico'
)

// Use the reactive favicon value
useFavicon(favicon)
</script>

<template>
  <div>
    <NavHeader/>
    <NuxtPage/>
    <SectionFooter/>
  </div>
</template>