import Vue from 'vue'

const eventBus = new Vue()

const EVENTS = {
  TOGGLE_MENU: 'TOGGLE_MENU'
}

export { eventBus, EVENTS }
