import Vue from 'vue/dist/vue.min'
import { EVENTS, eventBus } from '../eventbus'

const MenuToggle = Vue.extend({
  data: function() {
    return {
      isToggle: false
    }
  },

  created() {
    eventBus.$on(EVENTS.TOGGLE_MENU, evt => {
      console.log(evt)
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
})

export { MenuToggle }
