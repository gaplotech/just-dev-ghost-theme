import mediumZoom from 'medium-zoom'
import * as Components from '../../partials/components'
import { initGalleryCard } from './components/gallery-card'

// auto init
for (const key of Object.keys(Components)) {
  const Comp = Components[key]
  Comp()
}

mediumZoom('.kg-image-card img, .kg-gallery-image img, .post-content img', {
  background: null
})

initGalleryCard()
