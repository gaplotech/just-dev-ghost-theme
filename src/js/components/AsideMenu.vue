<template>
  <div class="bulma aside-menu">
    <div class="backdrop" :class="{ active: isToggle }" @click="toggle($event)"></div>
    <aside class="fixed-left-menu bulma menu" :class="{ active: isToggle }">
      <p class="menu-label">
        General
      </p>
      <ul class="menu-list">
        <li v-for="nav in navigation">
          <a class="full-nav" :class="{ 'nav-current': nav.current }" :href="nav.url" @click="toggle()">
            {{ nav.label }}
          </a>
        </li>
        <li v-if="isZh" v-for="nav in navigation_extra">
          <a>
            {{ nav.label }}
          </a>
          <ul>
            <li v-for="subnav in nav.navigation">
              <a :href="subnav.slug">{{ subnav.label }}</a>
            </li>
          </ul>
        </li>
      </ul>
      <p class="menu-label">
        Social
      </p>
      <ul class="menu-list">
        <li>
          <a class="social-link" href="https://github.com/gaplo917" title="GitHub" target="_blank" rel="noopener">
            <i class="ripple">
              <slot name="github"></slot>
            </i>
            GitHub
          </a>
        </li>
        <li>
          <a class="social-link" :href="facebook" title="Facebook" target="_blank" rel="noopener">
            <i class="ripple">
              <slot name="facebook"></slot>
            </i>
            Facebook
          </a>
        </li>
        <li>
          <a class="social-link" :href="twitter" title="Twitter" target="_blank" rel="noopener">
            <i class="ripple">
              <slot name="twitter"></slot>
            </i>
            Twitter
          </a>
        </li>
        <li>
          <a class="social-link" :href="rssHref" title="RSS" target="_blank" rel="noopener">
            <i class="ripple">
              <slot name="rss"></slot>
            </i>
            RSS
          </a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import { eventBus, EVENTS } from '../eventbus'

export default {
  name: 'aside-menu',
  data: function() {
    const { settings } = window['GHOST_INITIAL_DATA']
    const { navigation, facebook, twitter, url, navigation_extra, lang } = settings
    return {
      isToggle: false,
      navigation,
      facebook,
      twitter,
      url,
      navigation_extra,
      lang
    }
  },

  created() {
    eventBus.$on(EVENTS.TOGGLE_MENU, evt => {
      this.isToggle = evt.data.isToggle
    })
  },
  computed: {
    rssHref() {
      return `https://feedly.com/i/subscription/feed/${this.url}/rss/`
    },
    isZh() {
      return this.lang === 'zh'
    }
  },
  methods: {
    toggle(event) {
      this.publishToggleEvent(!this.isToggle)
      if (event) {
        event.preventDefault()
      }
    },

    publishToggleEvent(bool) {
      eventBus.$emit(EVENTS.TOGGLE_MENU, {
        data: {
          isToggle: bool
        }
      })
    }
  }
}
</script>

<style type="scss" scoped>
.aside-menu {
  .menu-list {
    li {
      i {
        margin-right: 8px;
        padding: 0;
      }
    }
    .full-nav {
      text-transform: capitalize;
    }
  }

  .nav-current::before {
    content: '•';
    position: absolute;
    left: 12px;
    color: var(--primary);
    font-size: 1.5em;
    margin-top: -0.1em;
  }

  .backdrop {
    display: none;
    &.active {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      z-index: 1199;
    }
  }
  .fixed-left-menu {
    position: fixed;
    background-color: var(--nav-bar-bg-color);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    width: 300px;
    height: calc(100vh - 48px);
    top: 48px;
    left: 0;
    z-index: 1400;
    padding: 1.5rem;
    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    transform: translateX(-300px);
    overflow-y: auto;
    font-size: 1.5rem;

    &.active {
      transform: translateX(0);
    }
  }
}
</style>
