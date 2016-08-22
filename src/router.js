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
    data: {
      title: '首页',
      logoBottomVisible: false,
      headVisible: false,
      tabVisible: false
    },
    name: 'home',
    // needLogin: true,
    component(resolve) {
      require(['./views/home'], resolve)
    }
  },
  '/enquiry': {
    data: {
      title: '选择类型',
      logoBottomVisible: true,
      headVisible: true,
      tabVisible: true
    },
    name: 'enquiry',
    needLogin: true,
    component(resolve) {
      require(['./views/enquiry/index'], resolve)
    }
  },
  'enquiry/:type': {
    data: {
      title: '请选择资产类型',
      logoBottomVisible: true,
      headVisible: true,
      tabVisible: true
    },
    name: 'enquiryAssetTypes',
    needLogin: true,
    component(resolve) {
      require(['./views/enquiry/enquiry-asset-types'], resolve)
    }
  },
  'enquiry/obligatory_right/eslate': {
    data: {
      title: '房地产类',
      logoBottomVisible: true,
      headVisible: true,
      tabVisible: false
    },
    name: 'enquiryAssetEslate',
    needLogin: true,
    component(resolve) {
      require(['./views/bond/enquiry-asset-eslate'], resolve)
    }
  },
  'enquiry/obligatory_right/government': {
    data: {
      title: '政信类',
      logoBottomVisible: true,
      headVisible: true,
      tabVisible: false
    },
    name: 'enquiryAssetGovernment',
    needLogin: true,
    component(resolve) {
      require(['./views/bond/enquiry-asset-government'], resolve)
    }
  },
  'enquiry/obligatory_right/enterprise': {
    data: {
      title: '企业借款类',
      logoBottomVisible: true,
      headVisible: true,
      tabVisible: false
    },
    name: 'enquiryAssetEnterprise',
    needLogin: true,
    component(resolve) {
      require(['./views/bond/enquiry-asset-enterprise'], resolve)
    }
  },
  'enquiry/obligatory_right/supply_chain': {
    data: {
      title: '供应链类',
      logoBottomVisible: true,
      headVisible: true,
      tabVisible: false
    },
    name: 'enquiryAssetSupplyChain',
    needLogin: true,
    component(resolve) {
      require(['./views/bond/enquiry-asset-supply-chain'], resolve)
    }
  },
  'enquiry/obligatory_right/mini_finance': {
    data: {
      title: '小微金融类',
      logoBottomVisible: true,
      headVisible: true,
      tabVisible: false
    },
    name: 'enquiryAssetMiniFinance',
    needLogin: true,
    component(resolve) {
      require(['./views/bond/enquiry-asset-mini-finance'], resolve)
    }
  },
  'enquiry/asset_manage/index': {
    data: {
      title: '资管类',
      logoBottomVisible: true,
      headVisible: true,
      tabVisible: false
    },
    name: 'enquiryAssetManage',
    needLogin: true,
    component(resolve) {
      require(['./views/asset-manage/index'], resolve)
    }
  },
  'enquiry/result': {
    data: {
      title: '询价结果',
      logoBottomVisible: true,
      headVisible: false,
      tabVisible: true
    },
    name: 'enquiryResult',
    needLogin: true,
    waitForData: true,
    component(resolve) {
      require(['./views/enquiry/enquiry-result'], resolve)
    }
  },
  'enquiry/result/am': {
    data: {
      title: '询价结果',
      logoBottomVisible: true,
      headVisible: true,
      tabVisible: true
    },
    name: 'enquiryAmResult',
    needLogin: true,
    waitForData: false,
    component(resolve) {
      require(['./views/enquiry/enquiry-am-result'], resolve)
    }
  },
  'enquiry/share': {
    data: {
      title: '开通金融PANO询价服务',
      logoBottomVisible: false,
      headVisible: false,
      tabVisible: false
    },
    name: 'enquiryShare',
    // needLogin: true,
    component(resolve) {
      require(['./views/enquiry/enquiry-share'], resolve)
    }
  },
  'enquiry/error': {
    data: {
      title: '询价结果',
      logoBottomVisible: true,
      headVisible: true,
      tabVisible: true
    },
    name: 'enquiryError',
    needLogin: true,
    component(resolve) {
      require(['./views/enquiry/enquiry-error'], resolve)
    }
  },
  'serivce_introduce': {
    data: {
      title: '开通服务介绍',
      logoBottomVisible: true,
      headVisible: true,
      tabVisible: true
    },
    name: 'serviceIntroduce',
    needLogin: true,
    component(resolve) {
      require(['./views/service-introduce'], resolve)
    }
  },
  '/settings': {
    data: {
      title: '我',
      logoBottomVisible: true,
      headVisible: true,
      tabVisible: true
    },
    name: 'settings',
    needLogin: true,
    component(resolve) {
      require(['./views/settings'], resolve)
    }
  },
  '/register': {
    name: 'register',
    data: {
      title: '注册',
      logoBottomVisible: true,
      headVisible: false,
      tabVisible: false
    },
    component(resolve) {
      require(['./views/register'], resolve)
    }
  },
  '/login': {
    name: 'login',
    data: {
      title: '登录',
      logoBottomVisible: true,
      headVisible: false,
      tabVisible: false
    },
    component(resolve) {
      require(['./views/login'], resolve)
    }
  },
  '/perfect': {
    needLogin: true,
    name: 'perfect',
    data: {
      title: '上传名片',
      logoBottomVisible: false,
      headVisible: false,
      tabVisible: false
    },
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
  document.title = to.data.title || document.title
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
    updateLogoBottomStyle()
  }, 10)
})

let updateLogoBottomStyle = function() {
  let wH = window.innerHeight
  let aH = document.querySelector('#app').offsetHeight
  if (aH + 150 >= wH) {
    document.body.classList.add('overflow-height')
  } else {
    document.body.classList.remove('overflow-height')
  }
  setTimeout(function() { document.querySelector('.logo-bottom').style.display = 'block' }, 10)
}

export default function routerStart() {
  // 启动路由
  router.start(App, 'body')
}

export { router, updateLogoBottomStyle }
