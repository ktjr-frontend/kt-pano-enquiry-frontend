import Vue from 'vue'
import Router from 'vue-router'
import App from './app'
import VueValidator from 'vue-validator'
import setValidators from './common/validators'
import Login from './views/login'
import Register from './views/register'
import Perfect from './views/perfect'
import Enquiry from './views/enquiry'
import EnquiryAssetTypes from './views/enquiry-asset-types'
import EnquiryAssetEslate from './views/asset-sub-views/enquiry-asset-eslate'
import EnquiryAssetGovernment from './views/asset-sub-views/enquiry-asset-government'
import EnquiryAssetEnterprise from './views/asset-sub-views/enquiry-asset-enterprise'
import EnquiryAssetSupplyChain from './views/asset-sub-views/enquiry-asset-supply-chain'
import EnquiryAssetMiniFinance from './views/asset-sub-views/enquiry-asset-mini-finance'
import Settings from './views/settings'

// 自定义validator
Vue.use(Router)
Vue.use(VueValidator) //这个插件的注入要和路由放到一起 不然报错 reqiure is not defined
setValidators(Vue.validator)

let router = new Router({
  history: true
})

router.map({
  '/enquiry': {
    title: { text: '选择类型' },
    name: 'enquiry',
    needLogin: true,
    component: Enquiry
  },
  'enquiry/:type': {
    title: { text: '请选择资产类型' },
    name: 'enquiryAssetTypes',
    needLogin: true,
    component: EnquiryAssetTypes
  },
  'enquiry/obligatory_right/eslate': {
    title: { text: '房地产类' },
    name: 'enquiryAssetEslate',
    needLogin: true,
    component: EnquiryAssetEslate
  },
  'enquiry/obligatory_right/government': {
    title: { text: '政府投资平台类' },
    name: 'enquiryAssetGovernment',
    needLogin: true,
    component: EnquiryAssetGovernment
  },
  'enquiry/obligatory_right/enterprise': {
    title: { text: '企业借款类' },
    name: 'enquiryAssetEnterprise',
    needLogin: true,
    component: EnquiryAssetEnterprise
  },
  'enquiry/obligatory_right/supply_chain': {
    title: { text: '供应链类' },
    name: 'enquiryAssetSupplyChain',
    needLogin: true,
    component: EnquiryAssetSupplyChain
  },
  'enquiry/obligatory_right/mini_finance': {
    title: { text: '小微金融类' },
    name: 'enquiryAssetMiniFinance',
    needLogin: true,
    component: EnquiryAssetMiniFinance
  },
  '/settings': {
    title: { text: '我' },
    name: 'settings',
    needLogin: true,
    component: Settings
  },
  '/register': {
    name: 'register',
    title: { text: '注册' },
    component: Register
  },
  '/login': {
    name: 'login',
    title: { text: '登录' },
    component: Login
  },
  '/perfect': {
    name: 'perfect',
    title: { text: '上传名片' },
    component: Perfect
  }
})

router.redirect({
  '*': '/enquiry'
    // '*': '/login'
})

router.beforeEach(function({ to, abort, next }) {
  let user = JSON.parse(window.localStorage.user || '{}')

  if (to.needLogin && !user.name) {
    router.go({ name: 'login' })
    abort()
  } else if (user.status === 'initialized') {
    router.go({ name: 'perfect' })
    abort()
  } else {
    next()
  }
})

router.afterEach(function({ to }) {
  document.title = to.title.text || document.title
  document.querySelector('.logo').style.display = 'none'

  // 动态解决logo的位置问题
  setTimeout(function() {
    let wH = window.innerHeight
    let aH = document.querySelector('#app').offsetHeight
    if (aH + 150 >= wH) {
      document.body.classList.add('overflow-height')
    } else {
      document.body.classList.remove('overflow-height')
    }
    document.querySelector('.logo').style.display = 'block'
  }, 100)
})

export default function routerStart() {
  // 启动路由
  router.start(App, 'body')
}

export { router }
