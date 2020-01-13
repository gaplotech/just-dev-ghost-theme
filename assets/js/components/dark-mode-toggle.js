/**
 * Inspired by https://github.com/GoogleChromeLabs/dark-mode-toggle/blob/master/src/dark-mode-toggle.mjs
 * The origin abstraction is too leaky(difficult to change UI's padding/margin) and required modern browser version to load the modules
 * rewrite the concept in es5 for better backward compatibility
 * @author GapLoTech
 */
((window, document) => {
  const doc = document
  const store = localStorage
  const PREFERS_COLOR_SCHEME = 'prefers-color-scheme'
  const MEDIA = 'media'
  const LIGHT = 'light'
  const DARK = 'dark'
  const NO_PREFERENCE = 'no-preference'
  const MQ_DARK = `(${PREFERS_COLOR_SCHEME}:${DARK})`
  const MQ_LIGHT = `(${PREFERS_COLOR_SCHEME}:${LIGHT}),(${PREFERS_COLOR_SCHEME}:${NO_PREFERENCE})`
  const LINK_REL_STYLESHEET = 'link[rel=stylesheet]'
  const PERMANENT_COLOR_SCHEME = 'permanentcolorscheme'
  const ALL = 'all'
  const NOT_ALL = 'not all'
  const CLASS_NAME = '.dark-mode-toggle'

  const _darkCSS = doc.querySelectorAll(`${LINK_REL_STYLESHEET}[${MEDIA}*=${PREFERS_COLOR_SCHEME}][${MEDIA}*="${DARK}"]`)
  const _lightCSS = doc.querySelectorAll(`${LINK_REL_STYLESHEET}[${MEDIA}*=${PREFERS_COLOR_SCHEME}][${MEDIA}*="${LIGHT}"],${LINK_REL_STYLESHEET}[${MEDIA}*=${PREFERS_COLOR_SCHEME}][${MEDIA}*="${NO_PREFERENCE}"]`)

  const hasNativePrefersColorScheme = matchMedia(MQ_DARK).media !== NOT_ALL
  const modeInStore = store.getItem(PERMANENT_COLOR_SCHEME)
  let mode
  if (modeInStore) {
    mode = modeInStore
  } else if (hasNativePrefersColorScheme) {
    mode = matchMedia(MQ_LIGHT).matches ? LIGHT : DARK
  } else {
    mode = LIGHT
  }

  function updateMode (element) {
    if (mode === LIGHT) {
      _lightCSS.forEach(link => {
        link.media = ALL
        link.disabled = false
      })
      _darkCSS.forEach(link => {
        link.media = NOT_ALL
        link.disabled = true
      })
      element.setAttribute('src', element.attributes.getNamedItem('data-dark-src').value)
    } else {
      _darkCSS.forEach(link => {
        link.media = ALL
        link.disabled = false
      })
      _lightCSS.forEach(link => {
        link.media = NOT_ALL
        link.disabled = true
      })
      element.setAttribute('src', element.attributes.getNamedItem('data-light-src').value)
    }
  }

  const _toggles = document.querySelectorAll(CLASS_NAME)
  _toggles.forEach(element => {
    element.addEventListener('click', () => {
      mode = mode === LIGHT ? DARK : LIGHT
      store.setItem(PERMANENT_COLOR_SCHEME, mode)
      _toggles.forEach(updateMode)
    })
    updateMode(element)
  })
})(window, document)
