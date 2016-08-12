import store from '../vuex/store'
import {
  logOut,
  showAlert,
  showToast
} from '../vuex/actions'

export default [(request, next) => {
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
    }
  })
}]
