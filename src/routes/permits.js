import _ from 'lodash'
import store from '../vuex/store.js'

export default function(route) {
  let passed = false
  let redirect = null
  let showToast = true
  const { group, status } = store.state.user
  if (route.data.skipAuth) {
    passed = true
  } else {
    if (!status) { // 没状态说明没登录
      redirect = { name: 'login', query: { jump_to: route.path } }
      showToast = false
    } else {
      passed = _.some(route.data.permits, (v, k) => {
        return k === group && _.includes(v, status)
      })
    }

    // 被拒绝的用户主动去设置页面
    // if (!passed && status === 'rejected') {
    //   redirect = { name: 'settings' }
    // }
  }
  return {
    showToast: showToast,
    passed: passed,
    redirect: redirect
  }
}
