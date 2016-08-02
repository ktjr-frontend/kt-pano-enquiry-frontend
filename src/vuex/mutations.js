const mutations = {
  UPDATE_USER(state, user) {
    state.user = user
  },
  SHOW_LOADING_STATUS(state) {
    state.loadingStatus = true
  },
  HIDE_LOADING_STATUS(state) {
    state.loadingStatus = false
  },
  LOG_OUT(state) {
    state.user = {}
  },
  SHOW_ALERT(state, alert) {
    state.alert = Object.assign({}, state.alert, alert, { show: true })
  },
  SHOW_TOAST(state, toast) {
    state.toast = Object.assign({}, state.toast, toast, { show: true })
  }
}
export default mutations
