import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import createLogger from 'vuex/logger'

const debug = process.env.NODE_ENV !== 'production'
const state = {
  title: '开通PANO',
  loadingStatus: false,
  assetTypes: [{
    name: '房地产类',
    value: 'eslate',
    component: 'enquiryAssetEslate',
    type: 'obligatory_right',
    icon: 'icon-house',
    color: '#a1b5cd'
  }, {
    name: '政府投资平台类',
    value: 'government',
    component: 'enquiryAssetGovernment',
    type: 'obligatory_right',
    icon: 'icon-mans',
    color: '#f0c57c'
  }, {
    name: '企业借款类',
    value: 'enterprise',
    component: 'enquiryAssetEnterprise',
    type: 'obligatory_right',
    icon: 'icon-money',
    color: '#b0d2d1'
  }, {
    name: '供应链类',
    value: 'supply_chain',
    component: 'enquiryAssetSupplyChain',
    type: 'obligatory_right',
    icon: 'icon-link',
    color: '#b5bbcb'
  }, {
    name: '小微金融类',
    value: 'mini_finance',
    component: 'enquiryAssetMiniFinance',
    type: 'obligatory_right',
    icon: 'icon-key',
    color: '#ecbfab'
  }],
  toast: {
    time: 1000,
    type: 'warn',
    text: '内容有误',
    show: false
  },
  alert: {
    show: false,
    title: '提示',
    buttonText: '知道了',
    content: ''
  },
  user: {
    mobile: '',
    name: '',
    password: ''
  }
}

Vue.use(Vuex)
Vue.config.debug = debug

const store = new Vuex.Store({
  state,
  mutations,
  // strict: debug,
  plugins: debug ? [createLogger()] : []
})
export default store
