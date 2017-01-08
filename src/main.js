import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import store from './mixins/store'
import utils from './mixins/utils'

Vue.use(VueResource)
Vue.mixin(store)
Vue.mixin(utils)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
