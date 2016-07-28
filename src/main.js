import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Login from './views/login'
import Register from './views/register'
import Enquiry from './views/enquiry'
import App from './app'
import VueValidator from 'vue-validator'
import setValidators from './common/validators'
import setResources from './common/resources'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(VueValidator)

// http初始化
Vue.http.options.root = '/api/v1'
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
    component: Enquiry
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
  }
})

router.redirect({
  '*': '/enquiry'
    // '*': '/login'
})

router.beforeEach(function({ to, abort, next }) {
  if (to.needLogin && !App.store.state.user.name) {
    abort()
  }
  next()
})

router.afterEach(function({ to }) {
  document.title = to.title || document.title
})

router.start(App, 'body')
