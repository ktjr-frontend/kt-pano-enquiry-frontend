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
  function(request, next) {
    let key = Vue.url(request.url, request.params)

    request.cache = _.includes(CACHE_URLS, key.split('?')[0])

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
  function(request, next) {
    next((res) => {
      if (res.status === 419 || res.status === 401) {
        showAlert(store, {
          content: '登录超时，请重新登录后再试！'
        })
        logOut(store)
      } else if (res.status === 403) {
        showToast(store, {
          text: res.json().error || '您无此权限'
        })
      } else if (res.status === 500 || res.status === 502) { // 注释掉是为了接部分接口
        showToast(store, {
          text: res.json().error || '抱歉！服务器忙。'
        })
      } else if (res.status === 200) {
        if (request.cache) {
          let key = Vue.url(request.url, request.params)
          sessionStorage.setItem(key, res.data)
        }
      }
    })
  }
]
