import mediumZoom from 'medium-zoom'
import { DarkModeToggle } from './components/dark-mode-toggle'
import { MenuToggle } from './components/menu-toggle'
import { ASideMenu } from './components/aside-menu'
import { initGalleryCard } from './components/gallery-card'

// init
document.querySelectorAll('.dark-mode-toggle').forEach(element => {
  new DarkModeToggle().$mount(element)
})

document.querySelectorAll('.menu-toggle').forEach(element => {
  new MenuToggle().$mount(element)
})

document.querySelectorAll('.aside-menu').forEach(element => {
  new ASideMenu().$mount(element)
})

mediumZoom('.kg-image-card img, .kg-gallery-image img, .post-content img', {
  background: null
})

initGalleryCard()
