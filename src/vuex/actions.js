import { router } from '../router'

export function updateUser({ dispatch }, user) {
  window.localStorage.user = JSON.stringify(user)
  dispatch('UPDATE_USER', user)
}

export function logOut({ dispatch }) {
  router.go({ name: 'login' })
  window.localStorage.user = '{}'
  dispatch('LOG_OUT')
}

export function showLoadingStatus({ dispatch }) {
  dispatch('SHOW_LOADING_STATUS')
}

export function hideLoadingStatus({ dispatch }) {
  dispatch('HIDE_LOADING_STATUS')
}

export function showToast({ dispatch }, toast) {
  dispatch('SHOW_TOAST', toast)
}

export function showAlert({ dispatch }, alert) {
  dispatch('SHOW_ALERT', alert)
}
