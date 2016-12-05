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

// 拒绝的用户可访问的页面
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

// 未完善信息用户可访问的页面
let initializedUserPermits = ['login', 'perfect', 'register']

// 需要强制刷新的页面，避免ios上面bfcache
// let reloadPages = ['quotationDetail', 'myProjectDetail', 'profile', 'moreInstitutions', 'allInstitutions', 'myProjects', 'referProjects', 'referProjectDetail', 'interestProjectDetail']

router.map(routers)

router.redirect({
  '*': '/quotation/ob',
  '/quotation': '/quotation/ob'
})

router.beforeEach(({ from, to, abort, next }) => {
  let user = JSON.parse(window.localStorage.user || '{}')

  if (to.needLogin && !user.status) {
    router.replace({ name: 'login', query: { jump_to: to.path } })
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
  updateTabVisible(store, to.query.shared ? false : to.data.tabVisible)

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

  // 每页默认滚动到顶部
  // let app = document.getElementById('app')
  // app.scrollTop = 0

  window.scrollTo(0, 0)

  // 动态解决logo的位置问题
  if (to.data.logoBottomVisible) {
    setTimeout(() => {
      updateLogoBottomStyle()
    }, 10)
  }

  // 是否有tab
  let tabVisible = function() {
    if (_.includes(['quotationAM', 'quotationOB'], to.name) && to.query.shared) {
      return false
    }

    return to.data.tabVisible
  }

  document.body.classList.toggle('tab-visible', tabVisible())
})

// 底部logo控制
let updateLogoBottomStyle = function() {
  let wH = window.innerHeight
  let aH = document.querySelector('#app .child-view').offsetHeight
  if (aH + 60 >= wH) { // 60 logo-bottom 高度
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
