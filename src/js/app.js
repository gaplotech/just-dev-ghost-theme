import mediumZoom from 'medium-zoom'
import { DarkModeToggle } from './components/dark-mode-toggle'
import { initGalleryCard } from './components/gallery-card'
import { initInfiniteScroll } from './components/infinite-scroll'

// init
document.querySelectorAll('.dark-mode-toggle').forEach(element => {
  new DarkModeToggle().$mount(element)
})

mediumZoom('.kg-image-card img, .kg-gallery-image img, .post-content img', {
  background: null
})

initGalleryCard()
initInfiniteScroll()
