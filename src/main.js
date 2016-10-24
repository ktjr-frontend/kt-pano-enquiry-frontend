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
Vue.http.options.root = '/api/v1'
Vue.http.headers.common['Authorization'] = window.localStorage.token || ''

// 拦截器统一注入
interceptors.forEach((v) => {
  Vue.http.interceptors.push(v)
})

// 统一管理resource
setResources(Vue.resource)

// 激活ios设备上面css的active效果
document.body.addEventListener('touchstart', () => {})

// 启动路由
routerStart()
