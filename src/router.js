import Vue from 'vue'
import Router from 'vue-router'
import App from './app'
import VueValidator from 'vue-validator'
import setValidators from './common/validators'
import _ from 'lodash'
import log from './common/log'
import routers from './routers'
import { showToast, updateTabVisible } from './vuex/actions'
import store from './vuex/store'

// 自定义validator
Vue.use(Router)
Vue.use(VueValidator) //这个插件的注入要和路由放到一起 不然报错 reqiure is not defined
setValidators(Vue.validator)

let router = new Router({
  // history: true // 打开以后再ios上面会导致微信jssdk config不成功
})

let rejectedUserPermits = [
  'home',
  'login',
  'perfect',
  'settings',
  'register',
  'changePassword',
  'forgetPassword1',
  'forgetPassword2',
  'changeMobile1',
  'changeMobile2'
]

let initializedUserPermits = ['login', 'perfect', 'register']

router.map(routers)

router.redirect({
  '*': '/quotation/ob',
  '/quotation': '/quotation/ob'
})

router.beforeEach(({ from, to, abort, next }) => {
  let user = JSON.parse(window.localStorage.user || '{}')

  updateTabVisible(store, to.query.shared ? false : to.data.tabVisible)

  if (to.needLogin && !user.status) {
    router.go({ name: 'login' })
      // abort()
  } else if (to.needLogin && user.status === 'rejected' && !_.includes(rejectedUserPermits, to.name)) {
    showToast(store, {
      text: '由于您未通过认证审核，无权访问该页面！'
    })

    // abort()
    router.go({ name: 'settings' })
  } else if (to.needLogin && user.status === 'initialized' && !_.includes(initializedUserPermits, to.name)) {
    router.go({ name: 'perfect' })
      // abort()
  } else {
    next()
  }
})

router.afterEach(({ to }) => {
  let getTitle = function(to) {
    if (_.includes(['quotationDetail'], to.name)) { // 报价板详情 定制化title
      return to.query.asset_type
    }
    return to.data.title
  }

  document.title = getTitle(to) || document.title
  document.querySelector('.logo-bottom').style.display = 'none'
  document.body.setAttribute('page', to.name)

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
  window.scrollTo(0, 0)
  setTimeout(() => {
    updateLogoBottomStyle()
  }, 10)
})

// 底部logo控制
let updateLogoBottomStyle = function() {
  let wH = window.innerHeight
  let aH = document.querySelector('#app').offsetHeight
  if (aH + 150 >= wH) {
    document.body.classList.add('overflow-height') // 判断内容是否高于超过窗口
  } else {
    document.body.classList.remove('overflow-height')
  }

  setTimeout(() => { document.querySelector('.logo-bottom').style.display = 'block' }, 10)
}

// 启动路由
export default function routerStart() {
  router.start(App, 'body')
}

export { router, updateLogoBottomStyle }
