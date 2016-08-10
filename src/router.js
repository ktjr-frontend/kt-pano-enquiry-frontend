import Vue from 'vue'
import Router from 'vue-router'
import App from './app'
import VueValidator from 'vue-validator'
import setValidators from './common/validators'
import Login from './views/login'
import Register from './views/register'
import Perfect from './views/perfect'
import Home from './views/home'
import Enquiry from './views/enquiry/enquiry'
import EnquiryAssetTypes from './views/enquiry/enquiry-asset-types'
import EnquiryResult from './views/enquiry/enquiry-result'
import EnquiryShare from './views/enquiry/enquiry-share'
import EnquiryError from './views/enquiry/enquiry-error'
import EnquiryAssetEslate from './views/asset-sub-views/enquiry-asset-eslate'
import EnquiryAssetGovernment from './views/asset-sub-views/enquiry-asset-government'
import EnquiryAssetEnterprise from './views/asset-sub-views/enquiry-asset-enterprise'
import EnquiryAssetSupplyChain from './views/asset-sub-views/enquiry-asset-supply-chain'
import EnquiryAssetMiniFinance from './views/asset-sub-views/enquiry-asset-mini-finance'
import Settings from './views/settings'
import ServiceIntroduce from './views/service-introduce'
import _ from 'lodash'
import log from './common/log'

// 自定义validator
Vue.use(Router)
Vue.use(VueValidator) //这个插件的注入要和路由放到一起 不然报错 reqiure is not defined
setValidators(Vue.validator)

let router = new Router({
  // history: true // 打开以后再ios上面会导致微信jssdk config不成功
})

router.map({
  '/index': {
    title: { text: '首页' },
    name: 'home',
    // needLogin: true,
    component: Home
  },
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
    title: { text: '政信类' },
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
  'enquiry/result': {
    title: { text: '询价结果' },
    name: 'enquiryResult',
    needLogin: true,
    component: EnquiryResult
  },
  'enquiry/share': {
    title: { text: '开通金融PANO询价系统' },
    name: 'enquiryShare',
    // needLogin: true,
    component: EnquiryShare
  },
  'enquiry/error': {
    title: { text: '询价结果' },
    name: 'enquiryError',
    needLogin: true,
    component: EnquiryError
  },
  'serivce_introduce': {
    title: { text: '开通服务介绍' },
    name: 'serviceIntroduce',
    needLogin: true,
    component: ServiceIntroduce
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
    needLogin: true,
    name: 'perfect',
    title: { text: '上传名片' },
    component: Perfect
  }
})

router.redirect({
  '*': '/index'
    // '*': '/login'
})

router.beforeEach(function({ from, to, abort, next }) {
  let user = JSON.parse(window.localStorage.user || '{}')
  if (to.needLogin && !user.status) {
    router.go({ name: 'login' })
      // abort()
  } else if (to.needLogin && user.status === 'initialized' && !_.includes(['login', 'perfect', 'register'], to.name)) {
    router.go({ name: 'perfect' })
      // abort()
  } else {
    next()
  }
})

router.afterEach(function({ to }) {
  document.title = to.title.text || document.title
  document.querySelector('.logo-bottom').style.display = 'none'

  // hack ios title not update bug
  let iframe = document.createElement('iframe')
  iframe.classList.add('dn')
  iframe.src = require('./assets/images/weixin.jpg')
  document.body.appendChild(iframe)
  iframe.onload = () => {
    setTimeout(() => {
      iframe.onload = null
      document.body.removeChild(iframe)
    }, 10)
  }

  // url跟踪
  // if (to.name !== 'enquiryShare') {
  log()
    // }

  // 动态解决logo的位置问题
  setTimeout(function() {
    window.scrollTo(0, 0)
    let wH = window.innerHeight
    let aH = document.querySelector('#app').offsetHeight
    if (aH + 150 >= wH) {
      document.body.classList.add('overflow-height')
    } else {
      document.body.classList.remove('overflow-height')
    }
    document.querySelector('.logo-bottom').style.display = 'block'
  }, 100)
})

export default function routerStart() {
  // 启动路由
  router.start(App, 'body')
}

export { router }
