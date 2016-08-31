import Vue from 'vue'
import Router from 'vue-router'
import App from './app'
import VueValidator from 'vue-validator'
import setValidators from './common/validators'
import _ from 'lodash'
import log from './common/log'
import routers from './routers'
import { showToast } from './vuex/actions'
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
  '*': '/index'
})

router.beforeEach(({ from, to, abort, next }) => {
  let user = JSON.parse(window.localStorage.user || '{}')

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
  setTimeout(() => {
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
  setTimeout(() => { document.querySelector('.logo-bottom').style.display = 'block' }, 10)
}

export default function routerStart() {
  // 启动路由
  router.start(App, 'body')
}

export { router, updateLogoBottomStyle }
