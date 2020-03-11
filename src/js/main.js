import Vue from 'vue'
import App from './App'

const initVueApp = () => {
  new Vue({
    el: '#app',
    ...App
  }).$mount('#app')
}

if (typeof document === 'object') {
  document.addEventListener('DOMContentLoaded', initVueApp)
}
