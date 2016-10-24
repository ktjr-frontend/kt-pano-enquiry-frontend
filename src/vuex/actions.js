import { router } from '../router'

export function updateUser({ dispatch }, user, soft) {
  if (!soft) {
    localStorage.user = JSON.stringify(user)
    localStorage.userMobile = user.mobile
  }
  dispatch('UPDATE_USER', user)
}

export function logOut({ dispatch }, soft) {
  if (!soft) {
    router.go({ name: 'login' })
  }

  dispatch('HIDE_MESSAGE') //隐藏消息
  localStorage.user = '{}'

  sessionStorage.clear() // 清楚相关session数据缓存

  delete localStorage.token
  dispatch('LOG_OUT')
}

export function updateTabVisible({ dispatch }, visible) {
  dispatch('UPDATE_TABVISIBLE', visible)
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

export function showConfirm({ dispatch }, confirm) {
  let confirmObj = confirm
  if (typeof confirm === 'string') {
    confirmObj = {
      content: confirm
    }
  }
  dispatch('SHOW_CONFIRM', confirmObj)
}

export function showMessage({ dispatch }, message) {
  let messageObj = message
  if (typeof message === 'string') {
    messageObj = {
      content: message
    }
  }

  if (message) {
    dispatch('SHOW_MESSAGE', messageObj)
  }
}

export function hideMessage({ dispatch }) {
  dispatch('HIDE_MESSAGE')
}

export function updateEnquiryError({ dispatch }, error) {
  if (error) {
    dispatch('UPDATE_ENQUIRY_ERROR', error)
  }
}
