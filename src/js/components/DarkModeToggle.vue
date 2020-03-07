<template>
  <img id="dark-mode-toggle" class="dark-mode-toggle ripple" :src="src" @click="toggle()" />
</template>
<script>
/**
 * Inspired by https://github.com/GoogleChromeLabs/dark-mode-toggle/blob/master/src/dark-mode-toggle.mjs
 * The origin abstraction is too leaky(difficult to change UI's padding/margin) and required modern browser version to load the modules
 * just rewrite the concept in vuejs components
 */
const { LIGHT, DARK, getInitialMode, updateExternal } = window.theme

export default {
  name: 'dark-mode-toggle',
  props: ['dark-src', 'light-src'],
  data: function() {
    return {
      mode: getInitialMode()
    }
  },

  computed: {
    src() {
      return this.mode === LIGHT ? this.darkSrc : this.lightSrc
    }
  },

  methods: {
    toggle() {
      const mode = this.mode === LIGHT ? DARK : LIGHT
      updateExternal(mode)
      this.mode = mode
    }
  }
}
</script>
<style type="scss">
.dark-mode-toggle {
  z-index: 1100;
  padding: 0.6rem;
  margin-right: 0.5rem;
  opacity: 0.7;
  border-radius: 10rem;
  height: 3rem;
  width: 3rem;
  filter: invert(100%);
  &:hover {
    opacity: 1;
  }
}
</style>
