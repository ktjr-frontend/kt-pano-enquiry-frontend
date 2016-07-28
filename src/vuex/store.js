import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import createLogger from 'vuex/logger'

const debug = process.env.NODE_ENV !== 'production'
const state = {
  user: {
    mobile: '',
    name: '',
    email: '',
    password: ''
  }
}

Vue.use(Vuex)
Vue.config.debug = debug

export default new Vuex.Store({
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
