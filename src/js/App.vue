<script>
import mediumZoom from 'medium-zoom'
import DarkModeToggle from './components/DarkModeToggle'
import MenuToggle from './components/MenuToggle'
import AsideMenu from './components/AsideMenu'
import CategoriesNav from './components/CategoriesNav'
import TelegramComment from './components/TelegramComment'
import { initGhostCards } from './ghostcards'
import GapStyleTheme from './gapstyle.shiki.json'

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
    background: 'var(--bg-color)',
    scrollOffset: 100
  })
}

const initShiki = document => {
  const nodes = Array.from(document
      .querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code, pre > code')
  )

  if(nodes.length > 0) {
    // fallback to markdown if no language specified
    const nodeLangTuples = nodes.map(el => [el, el.className.match(/^language-.*|^lang-.*/)?.[0]?.split('-')?.[1] ?? 'markdown'])
    shiki.getHighlighter({
      theme: GapStyleTheme,
      langs: nodeLangTuples.map(it => it[1])
    }).then(highlighter => {
      nodeLangTuples.forEach(([el, language]) => {
        el.parentNode.outerHTML = highlighter.codeToHtml(el.textContent, { lang: language })
      })
    })
  }

}

export default {
  el: '#app',
  components: {
    DarkModeToggle,
    MenuToggle,
    AsideMenu,
    CategoriesNav,
    TelegramComment
  },
  mounted() {
    if(!this.INIT_SCRIPTS) {
      this.INIT_SCRIPTS = (() => {
        initGalleryCard(this.$el)
        initMediumZoom(this.$el)
        initShiki(this.$el)
        initGhostCards()
        return true
      })()
    }
  }
}
</script>
