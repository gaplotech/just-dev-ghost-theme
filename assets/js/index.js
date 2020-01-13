
// NOTE: Scroll performance is poor in Safari
// - this appears to be due to the events firing much more slowly in Safari.
//   Dropping the scroll event and using only a raf loop results in smoother
//   scrolling but continuous processing even when not scrolling
$(document).ready(() => {
  const navs = document.querySelectorAll('.site-nav-main .site-nav, .site-nav-main .m-site-nav')
  const feed = document.querySelector('.post-feed')

  let lastScrollY = window.scrollY
  let ticking = false

  function onScroll () {
    lastScrollY = window.scrollY
    requestTick()
  }

  function onResize () {
    requestTick()
  }

  function requestTick () {
    if (!ticking) {
      requestAnimationFrame(update)
    }
    ticking = true
  }

  function update () {
    const trigger = feed.getBoundingClientRect().top + window.scrollY

    // show/hide nav
    if (lastScrollY >= trigger - 20) {
      navs.forEach(nav => {
        nav.classList.add('fixed-nav-active')
      })
    } else {
      navs.forEach(nav => {
        nav.classList.remove('fixed-nav-active')
      })
    }

    ticking = false
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, false)

  update()
})
