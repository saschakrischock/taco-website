// plugins/fadeInElements.ts
export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.vueApp.mixin({
      mounted() {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('fade-in')
              entry.target.classList.remove('fade-out')
            } else {
              entry.target.classList.remove('fade-in')
              entry.target.classList.add('fade-out')
            }
          })
        }, {
          threshold: 0.1,
          rootMargin: '0px'
        })

        document.querySelectorAll('h2').forEach(heading => {
          observer.observe(heading)
        })
      }
    })
  }
})