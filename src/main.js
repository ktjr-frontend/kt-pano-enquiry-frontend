import Vue from 'vue'
import routerStart from './router'
import VueResource from 'vue-resource'
import setResources from './common/resources'
import interceptors from './common/interceptors'
import VueTouch from 'vue-touch'
import Filters from './filters'
import Directives from './directives'
import Transions from './common/transitions'
import Pollyfill from './common/pollyfill'

Pollyfill.setup()

Vue.use(VueResource)
Vue.use(VueTouch)
Vue.use(Filters)
Vue.use(Directives)
Vue.use(Transions)

// http初始化
let envApiPaths = {
  'development': '/api/v1',
  'production': '/api/v1',
  'app-dev': 'http://dev-pano.ktjr.com/api/v1',
  'app-prod': 'http://pano.ktjr.com/api/v1'
}
Vue.http.options.root = envApiPaths[process.env.NODE_ENV] || '/api/v1'
Vue.http.headers.common['Authorization'] = window.localStorage.token || ''

// 拦截器统一注入
interceptors.forEach((v) => {
  Vue.http.interceptors.push(v)
})

// 统一管理resource
setResources(Vue.resource)

// 激活ios设备上面css的active效果
document.body.addEventListener('touchstart', () => {})

// 避免bfcache导致的问题
window.onpageshow = function(event) {
  if (event.persisted) {
    window.location.reload()
  }
}

// 启动路由
if (process.env.NODE_ENV.indexOf('app') > -1) {
  document.addEventListener('deviceready', e => {
    routerStart()
  })
} else {
  routerStart()
}
