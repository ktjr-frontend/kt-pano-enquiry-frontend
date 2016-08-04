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
    state.toast = Object.assign({}, state.toast, { type: 'warn', time: 1000 }, toast, { show: true })
  },
  SHOW_SUCCESS_TOTAST(state, toast) {
    state.toast = Object.assign({}, state.toast, { time: 1000 }, toast, { show: true, type: 'success' })
  },
  SHOW_ERROR_TOTAST(state, toast) {
    state.toast = Object.assign({}, state.toast, { time: 1000 }, toast, { show: true, type: 'error' })
  },
  SHOW_TEXT_TOTAST(state, toast) {
    state.toast = Object.assign({}, state.toast, { time: 1000 }, toast, { show: true, type: 'text' })
  },
  UPDATE_ENQUIRY_ERROR(state, error) {
    state.enquiryError = error
  }
}
export default mutations
