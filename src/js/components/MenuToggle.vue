<template>
  <div id="menu-toggle" class="menu-toggle" :class="{ 'fixed-nav-active': isIndex }">
    <a class="menu-toggle-btn ripple" @click="toggle()">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
        <title>ionicons-v5-j</title>
        <line
          x1="80"
          y1="160"
          x2="432"
          y2="160"
          style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:16px"
        />
        <line
          x1="80"
          y1="256"
          x2="432"
          y2="256"
          style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:16px"
        />
        <line
          x1="80"
          y1="352"
          x2="432"
          y2="352"
          style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:16px"
        />
      </svg>
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

  &.fixed-nav-active {
    display: block;
  }
}
</style>
