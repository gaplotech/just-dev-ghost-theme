import Vue from 'vue/dist/vue.min'
import { EVENTS, eventBus } from '../../../src/js/eventbus'

const ASideMenu = () =>
  new Vue({
    el: '#aside-menu',
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
  })

export { ASideMenu }
