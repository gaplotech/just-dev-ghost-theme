/* eslint-env browser */

/**
 * Nav/Title replacement
 * Used on invividual post pages, displays the post title in place of the nav
 * bar when scrolling past the title
 *
 * Usage:
 * ```
 * Casper.stickyTitle({
 *     navSelector: '.site-nav-main',
 *     titleSelector: '.post-full-title',
 *     activeClass: 'nav-post-title-active'
 * });
 * ```
 */

((window, document) => {
  // set up Casper as a global object
  if (!window.GapTheme) {
    window.GapTheme = {}
  }

  window.GapTheme.stickyNavTitle = function stickyNavTitle (options) {
    const nav = document.querySelector(options.navSelector)
    const title = document.querySelector(options.titleSelector)

    let lastScrollY = window.scrollY
    let ticking = false

    function onScroll () {
      lastScrollY = window.scrollY
      requestTick()
    }

    function requestTick () {
      if (!ticking) {
        requestAnimationFrame(update)
      }
      ticking = true
    }

    function update () {
      const trigger = title.getBoundingClientRect().top + window.scrollY
      const triggerOffset = title.offsetHeight + 35

      // show/hide post title
      if (lastScrollY >= trigger + triggerOffset) {
        nav.classList.add(options.activeClass)
      } else {
        nav.classList.remove(options.activeClass)
      }

      ticking = false
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    update()
  }
})(window, document)
