import { router } from '../router'

export function updateUser({ dispatch }, user, soft) {
  if (!soft) {
    window.localStorage.user = JSON.stringify(user)
  }
  dispatch('UPDATE_USER', user)
}

export function logOut({ dispatch }, soft) {
  if (!soft) {
    router.go({ name: 'login' })
  }
  window.localStorage.user = '{}'
  delete window.localStorage.token
  dispatch('LOG_OUT')
}

export function showLoadingStatus({ dispatch }) {
  dispatch('SHOW_LOADING_STATUS')
}

export function hideLoadingStatus({ dispatch }) {
  dispatch('HIDE_LOADING_STATUS')
}

// 默认的toast warn类型
export function showToast({ dispatch }, toast) {
  let toastObj = toast
  if (typeof toast === 'string') {
    toastObj = {
      text: toast
    }
  }
  dispatch('SHOW_TOAST', toastObj)
}

export function showSuccessToast({ dispatch }, toast) {
  let toastObj = toast
  if (typeof toast === 'string') {
    toastObj = {
      text: toast
    }
  }
  dispatch('SHOW_SUCCESS_TOTAST', toastObj)
}

export function showErrorToast({ dispatch }, toast) {
  let toastObj = toast
  if (typeof toast === 'string') {
    toastObj = {
      text: toast
    }
  }
  dispatch('SHOW_ERROR_TOTAST', toastObj)
}

export function showTextToast({ dispatch }, toast) {
  let toastObj = toast
  if (typeof toast === 'string') {
    toastObj = {
      text: toast
    }
  }
  dispatch('SHOW_TEXT_TOTAST', toastObj)
}

export function showAlert({ dispatch }, alert) {
  let alertObj = alert
  if (typeof alert === 'string') {
    alertObj = {
      content: alert
    }
  }
  dispatch('SHOW_ALERT', alertObj)
}

export function updateEnquiryError({ dispatch }, error) {
  dispatch('UPDATE_ENQUIRY_ERROR', error)
}
