import store from '../vuex/store'
import {
  logOut,
  showAlert,
  showToast
} from '../vuex/actions'
import Vue from 'vue'
import _ from 'lodash'

const CACHE_URLS = ['inquiries/search_am', 'inquiries/search']

export default [
  // 请求超时
  function(request, next) {
    let timeout
    if (request._timeout) {
      timeout = setTimeout(() => {
        if (request.onTimeout) request.onTimeout(request)
        request.abort()
      }, request._timeout)
    }

    next(res => {
      clearTimeout(timeout)
    })
  },

  // 缓存ajax
  function(request, next) {
    let key = Vue.url(request.url, request.params)

    request.cache = _.includes(CACHE_URLS, key.split('?')[0])

    if (!request.cache) { // 不缓存的url强制加随机数
      request.params._r = Math.random().toString().slice(2)
    }

    if (!request.params.no_cache && sessionStorage.getItem(key)) {
      next({
        status: 200,
        ok: true,
        headers: {},
        statusText: 'OK',
        data: sessionStorage.getItem(key) || '{}',
        body: sessionStorage.getItem(key) || '{}',
        json() {
          return JSON.parse(sessionStorage.getItem(key) || '{}')
        }
      })
    } else {
      next()
    }
  },

  // 状态拦截
  function(request, next) {
    next((res) => {
      if (res.status === 419 || res.status === 401) {
        if (!request.params.noNeedLogin) {
          showAlert(store, {
            content: '登录超时，请重新登录后再试！'
          })
          logOut(store)
        } else {
          logOut(store, true)
        }
      } else if (res.status === 403) {
        showToast(store, {
          text: res.json().error || '您无此权限'
        })
      } else if (res.status === 500 || res.status === 502) { // 注释掉是为了接部分接口
        showToast(store, {
          text: '抱歉！服务器忙。'
        })
      } else if (res.status === 200) {
        if (request.cache) {
          let key = Vue.url(request.url, request.params)
          let body = _.isObject(res.body) ? JSON.stringify(res.body) : res.body
          sessionStorage.setItem(key, body)
        }
      }
    })
  }
]
