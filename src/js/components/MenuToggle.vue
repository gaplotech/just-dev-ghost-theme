<template>
  <div class="menu-toggle" :class="{ 'fixed-nav-active': isIndex }">
    <a class="menu-toggle-btn ripple" @click="toggle()">
      <slot name="icon"></slot>
    </a>
  </div>
</template>
<script>
import { eventBus, EVENTS } from '../eventbus'

export default {
  name: 'menu-toggle',
  props: ['isIndex'],
  data: function() {
    return {
      isToggle: false
    }
  },

  created() {
    eventBus.$on(EVENTS.TOGGLE_MENU, evt => {
      this.isToggle = evt.data.isToggle
    })
  },
  methods: {
    toggle() {
      this.publishToggleEvent(!this.isToggle)
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
<style type="scss">
.menu-toggle {
  display: none;

  .menu-toggle-btn {
    filter: invert(100%);
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }

  @media (max-width: 700px) {
    &.fixed-nav-active {
      display: flex;
      margin: 8px 0 0;
    }
  }
}
</style>
