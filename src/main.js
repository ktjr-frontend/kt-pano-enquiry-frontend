import Vue from 'vue'
import routerStart from './router'
import VueResource from 'vue-resource'
import setResources from './common/resources'
import interceptors from './common/interceptors'
import VueTouch from 'vue-touch'

Vue.use(VueResource)
Vue.use(VueTouch)

// http初始化
Vue.http.options.root = '/api/v1'

// Vue.http.options.before = (request) => {
//   // abort previous request, if exists

//   if (this.previousRequest) {
//     this.previousRequest.abort()
//   }
//   // set previous request on Vue instance
//   this.previousRequest = request
// }
Vue.http.headers.common['Authorization'] = window.localStorage.token

// 拦截器统一注入
interceptors.forEach(function(v) {
  Vue.http.interceptors.push(v)
})

// 统一管理resource
setResources(Vue.resource)

// 启动路由
routerStart()
