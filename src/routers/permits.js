import _ from 'lodash'
import store from '../vuex/store.js'

export default function(route) {
  let passed = false
  let redirect = { name: 'quotationOB' }
  let showToast = true
  const { group, status } = store.state.user
  if (route.data.skipAuth) {
    passed = true
  } else {
    if (!status) {
      redirect = { name: 'login', query: { jump_to: route.path } }
      showToast = false
    } else if (status === 'rejected') {
      redirect = { name: 'settings' }
    } else {
      passed = _.some(route.data.permits, (v, k) => {
        return k === group && _.includes(v, status)
      })
    }
  }
  return {
    showToast: showToast,
    passed: passed,
    redirect: redirect
  }
}
