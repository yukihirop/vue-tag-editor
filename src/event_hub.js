const EventHub = {
  install: function(Vue, options) {
    Vue.prototype.$eventHub = new Vue()
  }
}

export default EventHub