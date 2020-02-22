import Vue from 'vue/dist/vue.min'
import { EVENTS, eventBus } from '../../../src/js/eventbus'

const MenuToggle = () =>
  new Vue({
    el: '#menu-toggle',
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
  })

export { MenuToggle }
