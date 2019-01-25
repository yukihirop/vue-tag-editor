import Vue from 'vue'
import { VueTagEditor, VueTagEditorBulma } from 'vue-tag-editor-set'
import App from './App'

Vue.component('tag-editor', VueTagEditor)
Vue.component('tag-editor-bulma', VueTagEditorBulma)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})