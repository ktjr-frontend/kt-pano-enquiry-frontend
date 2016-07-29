export function updateUser({ dispatch }, user) {
  window.localStorage.user = JSON.stringify(user)
  dispatch('UPDATE_USER', user)
}

export function showLoadingStatus({ dispatch }) {
  dispatch('SHOW_LOADING_STATUS')
}

export function hideLoadingStatus({ dispatch }) {
  dispatch('HIDE_LOADING_STATUS')
}
