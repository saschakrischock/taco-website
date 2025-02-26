<template>
    <div class="relative" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <div ref="tacoTextRef" class="absolute kerning font-mono text-black text-lg font-normal">
        TACo
      </div>
      <SvgLogo ref="logoRef" />
    </div>
  </template>
  
  <script setup lang="ts">

  
  const tacoTextRef = ref<HTMLElement | null>(null)
  const logoRef = ref<any>(null)
  let stopMatrixEffect: (() => void) | null = null
  
  // Custom animation controller to replace Lottie
  const customAnim = {
    currentFrame: 0,
    totalFrames: 100,
    _interval: null as number | null,
    
    // Mock the Lottie progress for the matrix effect
    play() {
      this.currentFrame = 0;
      this._interval = window.setInterval(() => {
        if (this.currentFrame < this.totalFrames) {
          this.currentFrame += 1;
        } else {
          if (this._interval) clearInterval(this._interval);
        }
      }, 20) as unknown as number;
    },
    
    stop() {
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
    }
  }
  
  const { startMatrixEffect } = useTacoMatrixSync()
  
  const handleMouseEnter = () => {
    if (!tacoTextRef.value) return
    
    // Use our custom animation controller instead of Lottie
    customAnim.play();
    
    // Start matrix effect and store the stop function
    stopMatrixEffect = startMatrixEffect(tacoTextRef.value, customAnim)
  }
  
  const handleMouseLeave = () => {
    // Call the stop function when mouse leaves
    if (stopMatrixEffect) {
      stopMatrixEffect()
      stopMatrixEffect = null
    }
    
    // Also stop our custom animation timer
    customAnim.stop();
  }
  
  // Clean up on component unmount
  onBeforeUnmount(() => {
    if (stopMatrixEffect) {
      stopMatrixEffect()
    }
    customAnim.stop()
  })
  </script>
  
  <style scoped>
  .kerning {
    font-size: 1.2rem;
    letter-spacing: 0.95rem;
    margin-left: 0.52rem;
    margin-top: 0.39rem;
  }
  </style>