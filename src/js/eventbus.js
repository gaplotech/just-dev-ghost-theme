import Vue from 'vue/dist/vue.min'

const eventBus = new Vue()

const EVENTS = {
  TOGGLE_MENU: 'TOGGLE_MENU'
}

export { eventBus, EVENTS }
