const mutations = {
  UPDATE_USER(state, user) {
    state.user = user
  },
  SHOW_LOADING_STATUS(state) {
    state.loadingStatus = true
  },
  HIDE_LOADING_STATUS(state) {
    state.loadingStatus = false
  }
}
export default mutations
