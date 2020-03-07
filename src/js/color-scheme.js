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
const darkCss = document.querySelectorAll(
  `${LINK_REL_STYLESHEET}[${MEDIA}*=${PREFERS_COLOR_SCHEME}][${MEDIA}*="${DARK}"]`
)
const lightCss = document.querySelectorAll(
  `${LINK_REL_STYLESHEET}[${MEDIA}*=${PREFERS_COLOR_SCHEME}][${MEDIA}*="${LIGHT}"],${LINK_REL_STYLESHEET}[${MEDIA}*=${PREFERS_COLOR_SCHEME}][${MEDIA}*="${NO_PREFERENCE}"]`
)

const enableLink = link => {
  link.media = ALL
  link.disabled = false
}

const disableLink = link => {
  link.media = NOT_ALL
  link.disabled = true
}

const getInitialMode = () => {
  const hasNativePrefersColorScheme = matchMedia(MQ_DARK).media !== NOT_ALL
  const modeInStore = localStorage.getItem(PERMANENT_COLOR_SCHEME)
  if (modeInStore) {
    return modeInStore
  } else if (hasNativePrefersColorScheme) {
    return matchMedia(MQ_LIGHT).matches ? LIGHT : DARK
  } else {
    return LIGHT
  }
}

const updateExternal = mode => {
  if (mode === LIGHT) {
    lightCss.forEach(enableLink)
    darkCss.forEach(disableLink)
  } else {
    darkCss.forEach(enableLink)
    lightCss.forEach(disableLink)
  }

  // persist
  localStorage.setItem(PERMANENT_COLOR_SCHEME, mode)
}

const init = () => {
  updateExternal(getInitialMode())
}

window['theme'] = {
  init,
  getInitialMode,
  updateExternal,
  LIGHT,
  DARK
}

window.theme.init()
