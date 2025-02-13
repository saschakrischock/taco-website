<template>
   <Blottie 
      ref="blottieRef"
      class=" w-full h-full object-cover transition-opacity duration-300"
      :lottie="{
        player: 'svg',
        loop: false,
        autoplay: true,
        renderer: 'svg',
        path: '/lottie/data_logo_boxes.json',
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }"
    />
</template>

<script lang="ts" setup>
import { Blottie } from 'blottie'
</script>