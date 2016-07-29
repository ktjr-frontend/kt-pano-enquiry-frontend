import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Login from './views/login'
import Register from './views/register'
import Perfect from './views/perfect'
import Enquiry from './views/enquiry'
import Settings from './views/settings'
import App from './app'
import VueValidator from 'vue-validator'
import setValidators from './common/validators'
import setResources from './common/resources'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(VueValidator)

// http初始化
Vue.http.options.root = '/api/v1'
Vue.http.options.before = (request) => {
  // abort previous request, if exists
  if (this.previousRequest) {
    this.previousRequest.abort()
  }
  // set previous request on Vue instance
  this.previousRequest = request
}
Vue.http.headers.common['Authorization'] = window.localStorage.token

// 自定义validator
setValidators(Vue.validator)

// 统一管理resource
setResources(Vue.resource)

let router = new Router({
  history: true
})

router.map({
  '/enquiry': {
    title: '开通pano',
    name: 'enquiry',
    needLogin: true,
    component: Enquiry,
    subRoutes: {}
  },
  '/settings': {
    title: '我',
    name: 'settings',
    needLogin: true,
    component: Settings
  },
  '/register': {
    name: 'register',
    title: '注册',
    component: Register
  },
  '/login': {
    name: 'login',
    title: '登录',
    component: Login
  },
  '/perfect': {
    name: 'perfect',
    title: '上传名片',
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
  document.title = to.title || document.title
  document.querySelector('.logo').style.display = 'none'
  setTimeout(function() {
    let wH = window.innerHeight
    let aH = document.querySelector('#app').offsetHeight
    if (aH + 100 >= wH) {
      document.body.classList.add('overflow-height')
    } else {
      document.body.classList.remove('overflow-height')
    }
    document.querySelector('.logo').style.display = 'none'
  }, 100)
})

router.start(App, 'body')
