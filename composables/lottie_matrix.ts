import { ref } from 'vue'

export const useTacoMatrixSync = () => {
  const matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#&*'
  let animationFrame: number | null = null
  
  const getRandomChar = () => {
    return matrixChars.charAt(Math.floor(Math.random() * matrixChars.length))
  }

  const startMatrixEffect = (element: HTMLElement, lottieAnim: any) => {
    const originalText = 'TACo'
    let shouldContinue = true
    let lastUpdate = 0
    
    // Start with opacity 0
    element.style.opacity = '0'
    
    // Fade in after a short delay
    setTimeout(() => {
      element.style.opacity = '1'
    }, 100)

    const animate = (timestamp: number) => {
      if (!shouldContinue) return

      // Get Lottie progress (0 to 1)
      const progress = lottieAnim.currentFrame / lottieAnim.totalFrames

      // Custom easing curve for roulette-like deceleration
      // Start very fast, then dramatically slow down
      const baseInterval = 10 // Even faster at start (30ms)
      const maxInterval = 250 // Faster maximum slowdown
      
      // Custom curve that starts slow and accelerates the slowdown
      const easeOutExpo = progress < 0.5
        ? Math.pow(progress * 2, 2) // Gentler curve in first half
        : 1 - Math.pow(2, -10 * (progress - 0.5)); // Sharper deceleration in second half

      const updateInterval = baseInterval + (maxInterval * easeOutExpo)

      // Only update if enough time has passed
      if (timestamp - lastUpdate > updateInterval) {
        // If we're near the end (at 65%), show the final text
        if (progress > 0.5) {
          element.textContent = originalText
          cancelAnimationFrame(animationFrame)
          return
        }

        // Create scrambled text
        const scrambledText = Array.from(originalText)
          .map((char) => {
            if (char === ' ') return ' '
            return getRandomChar()
          })
          .join('')

        element.textContent = scrambledText
        lastUpdate = timestamp
      }

      // Continue animation
      animationFrame = requestAnimationFrame(animate)
    }

    // Start animation
    animationFrame = requestAnimationFrame(animate)

    // Return stop function
    return () => {
      shouldContinue = false
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      element.textContent = originalText
    }
  }

  return {
    startMatrixEffect
  }
}