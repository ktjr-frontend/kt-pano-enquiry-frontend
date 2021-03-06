import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
// import createLogger from 'vuex/src/plugins/logger'
// let createLogger = require('babel-loader!vuex/src/plugins/logger')

const debug = process.env.NODE_ENV !== 'production'

const instBasicInfo = JSON.parse(localStorage.instBasicInfo || '[]')
const state = {
  title: '开通PANO',
  enquiryError: '很遗憾，根据目前提供的信息，系统尚未匹配到适合发行的互联网金融平台。您可通过以下方式提供更详细的信息，我们会安排专业的明星BD帮您评估资产，感谢您的理解与支持！',
  loadingStatus: false,
  tabVisible: false,
  assetTypes: [{
    name: '房地产类',
    value: 'eslate',
    component: 'enquiryAssetEslate',
    type: 'obligatory_right',
    icon: 'icon-house',
    color: '#a1b5cd'
  }, {
    name: '政信类',
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
    time: 1500,
    type: 'warn',
    text: '内容有误',
    show: false
  },
  alert: {
    show: false,
    title: '提示',
    buttonText: '知道了',
    onHide() {},
    onShow() {},
    content: ''
  },
  confirm: {
    show: false,
    title: '提示',
    confirmText: '确定',
    cancelText: '取消',
    onConfirm() {},
    onCancel() {},
    content: ''
  },
  message: {
    show: false,
    content: '',
    onClose() {}
  },
  user: JSON.parse(localStorage.user || '{}'),
  instBasicInfo: instBasicInfo
}

Vue.use(Vuex)
Vue.config.debug = debug

const store = new Vuex.Store({
  state,
  mutations
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
export default store
