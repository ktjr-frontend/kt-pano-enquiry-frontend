<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import store from './vuex/store'
import {
  updateUser
} from './vuex/actions'

export default {
  vuex: {
    actions: {
      updateUser
    }
  },
  ready: function() {
    this.updateUser(window.localStorage.user)
  },
  store,
  replace: false
}
</script>

<style lang="scss">
@import '~vux/dist/vux.css';
@import './assets/fonts/style.css';
@import './assets/scss/vux.scss';
@import './assets/scss/base.scss';
@import './assets/scss/form.scss';
</style>
