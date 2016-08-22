import Vue from 'vue'
import Router from 'vue-router'
import App from './app'
import VueValidator from 'vue-validator'
import setValidators from './common/validators'
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
    component(resolve) {
      require(['./views/home'], resolve)
    }
  },
  '/enquiry': {
    title: { text: '选择类型' },
    name: 'enquiry',
    needLogin: true,
    component(resolve) {
      require(['./views/enquiry/index'], resolve)
    }
  },
  'enquiry/:type': {
    title: { text: '请选择资产类型' },
    name: 'enquiryAssetTypes',
    needLogin: true,
    component(resolve) {
      require(['./views/enquiry/enquiry-asset-types'], resolve)
    }
  },
  'enquiry/obligatory_right/eslate': {
    title: { text: '房地产类' },
    name: 'enquiryAssetEslate',
    needLogin: true,
    component(resolve) {
      require(['./views/bond/enquiry-asset-eslate'], resolve)
    }
  },
  'enquiry/obligatory_right/government': {
    title: { text: '政信类' },
    name: 'enquiryAssetGovernment',
    needLogin: true,
    component(resolve) {
      require(['./views/bond/enquiry-asset-government'], resolve)
    }
  },
  'enquiry/obligatory_right/enterprise': {
    title: { text: '企业借款类' },
    name: 'enquiryAssetEnterprise',
    needLogin: true,
    component(resolve) {
      require(['./views/bond/enquiry-asset-enterprise'], resolve)
    }
  },
  'enquiry/obligatory_right/supply_chain': {
    title: { text: '供应链类' },
    name: 'enquiryAssetSupplyChain',
    needLogin: true,
    component(resolve) {
      require(['./views/bond/enquiry-asset-supply-chain'], resolve)
    }
  },
  'enquiry/obligatory_right/mini_finance': {
    title: { text: '小微金融类' },
    name: 'enquiryAssetMiniFinance',
    needLogin: true,
    component(resolve) {
      require(['./views/bond/enquiry-asset-mini-finance'], resolve)
    }
  },
  'enquiry/asset_manage/index': {
    title: { text: '资管类' },
    name: 'enquiryAssetManage',
    needLogin: true,
    component(resolve) {
      require(['./views/asset-manage/index'], resolve)
    }
  },
  'enquiry/result': {
    title: { text: '询价结果' },
    name: 'enquiryResult',
    needLogin: true,
    waitForData: true,
    component(resolve) {
      require(['./views/enquiry/enquiry-result'], resolve)
    }
  },
  'enquiry/result/am': {
    title: { text: '询价结果' },
    name: 'enquiryAmResult',
    needLogin: true,
    waitForData: true,
    component(resolve) {
      require(['./views/enquiry/enquiry-am-result'], resolve)
    }
  },
  'enquiry/share': {
    title: { text: '开通金融PANO询价服务' },
    name: 'enquiryShare',
    // needLogin: true,
    component(resolve) {
      require(['./views/enquiry/enquiry-share'], resolve)
    }
  },
  'enquiry/error': {
    title: { text: '询价结果' },
    name: 'enquiryError',
    needLogin: true,
    component(resolve) {
      require(['./views/enquiry/enquiry-error'], resolve)
    }
  },
  'serivce_introduce': {
    title: { text: '开通服务介绍' },
    name: 'serviceIntroduce',
    needLogin: true,
    component(resolve) {
      require(['./views/service-introduce'], resolve)
    }
  },
  '/settings': {
    title: { text: '我' },
    name: 'settings',
    needLogin: true,
    component(resolve) {
      require(['./views/settings'], resolve)
    }
  },
  '/register': {
    name: 'register',
    title: { text: '注册' },
    component(resolve) {
      require(['./views/register'], resolve)
    }
  },
  '/login': {
    name: 'login',
    title: { text: '登录' },
    component(resolve) {
      require(['./views/login'], resolve)
    }
  },
  '/perfect': {
    needLogin: true,
    name: 'perfect',
    title: { text: '上传名片' },
    component(resolve) {
      require(['./views/perfect'], resolve)
    }
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
  log({
    path: to.path
  })

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
  }, 300)
})

export default function routerStart() {
  // 启动路由
  router.start(App, 'body')
}

export { router }
