<script>
import mediumZoom from 'medium-zoom'
import DarkModeToggle from './components/DarkModeToggle'
import MenuToggle from './components/MenuToggle'
import AsideMenu from './components/AsideMenu'
import CategoriesNav from './components/CategoriesNav'
import Prism from './prismjs/prism'
/**
 * Gallery card support
 * Used on any individual post/page
 *
 * Detects when a gallery card has been used and applies sizing to make sure
 * the display matches what is seen in the editor.
 */
const initGalleryCard = document => {
  const images = document.querySelectorAll('.kg-gallery-image img')
  images.forEach(image => {
    const container = image.closest('.kg-gallery-image')
    const width = image.attributes.width.value
    const height = image.attributes.height.value
    const ratio = width / height
    container.style.flex = `${ratio} 1 0%`
  })
}

const initMediumZoom = document => {
  mediumZoom(document.querySelectorAll('.post-content :not(.kg-bookmark-thumbnail) > img:not(.kg-bookmark-icon)'), {
    background: 'var(--bg-color)'
  })
}

const initPrism = document => {
  document
    .querySelectorAll(
      'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
    )
    .forEach(el => {
      if (!el.classList.contains('loaded')) {
        Prism.highlightElement(el, true, () => {
          el.classList.add('loaded')
        })
      }
    })
}

export default {
  el: '#app',
  components: {
    DarkModeToggle,
    MenuToggle,
    AsideMenu,
    CategoriesNav
  },
  mounted() {
    initGalleryCard(this.$el)
    initMediumZoom(this.$el)
    initPrism(this.$el)
  }
}
</script>
