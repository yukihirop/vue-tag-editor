import Vue from 'vue'
import VueTagEditor from 'vue-tag-editor'
import App from './App'

Vue.component('tag-editor', VueTagEditor)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})