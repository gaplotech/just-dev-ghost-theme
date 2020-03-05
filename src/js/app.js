import mediumZoom from 'medium-zoom'
import Vue from 'vue'
import App from '../App'

/**
 * Gallery card support
 * Used on any individual post/page
 *
 * Detects when a gallery card has been used and applies sizing to make sure
 * the display matches what is seen in the editor.
 */
const initGalleryCard = () => {
  const images = document.querySelectorAll('.kg-gallery-image img')
  images.forEach(image => {
    const container = image.closest('.kg-gallery-image')
    const width = image.attributes.width.value
    const height = image.attributes.height.value
    const ratio = width / height
    container.style.flex = `${ratio} 1 0%`
  })
}

const initMediumZoom = () => {
  mediumZoom('.kg-image-card img, .kg-gallery-image img, .post-content img', {
    background: null
  })
}

const initVueApp = () => {
  new Vue({
    el: '#app',
    ...App
  }).$mount('#app')
}

// init
initVueApp()
initGalleryCard()
initMediumZoom()
