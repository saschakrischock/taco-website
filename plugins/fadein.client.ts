export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.vueApp.mixin({
      mounted() {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Add fade-in and remove fade-out immediately
              entry.target.classList.add('fade-in')
              entry.target.classList.remove('fade-out')
              
              // For elements with green-highlight class, add active class after a delay
              if (entry.target.classList.contains('green-highlight')) {
                setTimeout(() => {
                  entry.target.classList.add('active')
                }, 800) // Adjust delay time as needed
              }
            } else {
              // Remove both fade-in and active classes, add fade-out
              entry.target.classList.remove('fade-in')
              entry.target.classList.remove('active')
              entry.target.classList.add('fade-out')
            }
          })
        }, {
          threshold: 0.1,
          rootMargin: '0px'
        })

        // Observe both original elements and green-highlight elements
        document.querySelectorAll('h2, h3, .fade-element, .green-highlight').forEach(heading => {
          observer.observe(heading)
        })
      }
    })
  }
})