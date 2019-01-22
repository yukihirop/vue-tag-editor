import Vue from 'vue'
import VueTagEditor from 'vue-tag-editor'
import App from './App'

console.log(module.exports)

Vue.component('tag-editor', VueTagEditor)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})