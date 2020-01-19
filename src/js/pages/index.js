// NOTE: Scroll performance is poor in Safari
// - this appears to be due to the events firing much more slowly in Safari.
//   Dropping the scroll event and using only a raf loop results in smoother
//   scrolling but continuous processing even when not scrolling
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site-nav')
  const spacer = document.querySelector('.nav-spacer')
  const navWrapper = document.querySelector('.nav-wrapper')
  let lastScrollY = window.scrollY
  let direction = 0
  let ticking = false

  function onScroll() {
    direction = window.scrollY - lastScrollY
    lastScrollY = window.scrollY
    requestTick()
  }

  function onResize() {
    requestTick()
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update)
    }
    ticking = true
  }

  function update() {
    const trigger = navWrapper.getBoundingClientRect().top + window.scrollY

    if (direction >= 0) {
      if (lastScrollY >= trigger) {
        nav.classList.add('fixed-nav-active')
        spacer.classList.add('active')
      }
    } else {
      if (lastScrollY <= trigger) {
        nav.classList.remove('fixed-nav-active')
        spacer.classList.remove('active')
      }
    }

    ticking = false
  }

  window.addEventListener('scroll', onScroll, { passive: false })
  window.addEventListener('resize', onResize, false)

  update()
})
