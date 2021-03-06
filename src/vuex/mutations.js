import Utils from '../common/utils'

const mutations = {
  UPDATE_USER(state, user) {
    state.user = user
  },
  UPDATE_TABVISIBLE(state, visible) {
    state.tabVisible = visible
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
    state.alert = Object.assign({}, state.alert, {
      title: '提示',
      buttonText: '知道了',
      onShow() {},
      onHide() {}
    }, alert, { show: true })
  },
  SHOW_CONFIRM(state, confirm) {
    state.confirm = Object.assign({}, state.confirm, {
      title: '提示',
      confirmText: '确定',
      cancelText: '取消',
      onConfirm() {},
      onCancel() {}
    }, confirm, { show: true })
  },
  SHOW_TOAST(state, toast) {
    state.toast = Object.assign({}, state.toast, { type: 'warn', time: Utils.getReadTime(toast.text) }, toast, { show: true })
  },
  SHOW_SUCCESS_TOTAST(state, toast) {
    state.toast = Object.assign({}, state.toast, { time: Utils.getReadTime(toast.text) }, toast, { show: true, type: 'success' })
  },
  SHOW_ERROR_TOTAST(state, toast) {
    state.toast = Object.assign({}, state.toast, { time: Utils.getReadTime(toast.text) }, toast, { show: true, type: 'error' })
  },
  SHOW_TEXT_TOTAST(state, toast) {
    state.toast = Object.assign({}, state.toast, { time: Utils.getReadTime(toast.text) }, toast, { show: true, type: 'text' })
  },
  SHOW_MESSAGE(state, message) {
    state.message = Object.assign({}, state.message, { onClose() {} }, message, { show: true })
  },
  HIDE_MESSAGE(state) {
    state.message.show = false
  },
  UPDATE_ENQUIRY_ERROR(state, error) {
    state.enquiryError = error
  },
  UPDATE_INST_BASIC_INFO(state, instBasicInfo) {
    state.instBasicInfo = instBasicInfo
  }
}
export default mutations
