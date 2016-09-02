<template lang="jade">
#app
  x-header(v-show='$route.data.headVisible', :left-options='header.leftOptions', @on-click-back='onClickBack()') {{title}}
  router-view
  .tabbar(v-show='$route.data.tabVisible')
    .tab(v-for='tab in tabs', :span='tab.span', :class="{'active': tab.active}")
      a(v-link='tab.link', @click='log({name: tab.name})')
        i.icon-pano(:class='tab.icon', :style='tab.style')
        | {{tab.name}}
.logo-bottom(:class="{'no-tabbar': !$route.data.tabVisible, 'dn-imp': !$route.data.logoBottomVisible}")
  img(src='./assets/images/logo2.svg', alt='开通PANO')
alert(:show.sync='alert.show', :title='alert.title', :button-text='alert.buttonText')
  | {{{alert.content}}}
confirm(:show.sync='confirm.show', :title='confirm.title', :confirm-text='confirm.confirmText', :cancel-text='confirm.cancelText', @on-confirm='confirm.onConfirm()', @on-cancel='confirm.onCancel()')
  | {{{confirm.content}}}
toast(:show.sync='toast.show', :time='toast.time', :type='toast.type') {{toast.text}}
loading(:show='loadingStatus', :text="'加载中...'")
kt-message(:content='message.content', :show.sync='message.show')

</template>

<script>
import store from './vuex/store'
import XHeader from 'vux-components/x-header'
import Loading from 'vux-components/loading'
import Alert from 'vux-components/alert'
import Confirm from 'vux-components/confirm'
import Toast from 'vux-components/toast'
import KtMessage from './components/kt-message'
import log from './common/log'
import {
  sessions
} from './common/resources'
import {
  loadingStatus,
  toast,
  alert,
  confirm,
  message
} from './vuex/getters'
import {
  updateUser,
  showAlert,
  showConfirm,
  showToast,
  showLoadingStatus,
  hideLoadingStatus,
  showMessage,
  hideMessage
} from './vuex/actions'

export default {
  components: {
    XHeader,
    Loading,
    Alert,
    Confirm,
    Toast,
    KtMessage
  },
  vuex: {
    getters: {
      loadingStatus,
      toast,
      alert,
      confirm,
      message
    },
    actions: {
      updateUser,
      showAlert,
      showConfirm,
      showToast,
      showLoadingStatus,
      hideLoadingStatus,
      showMessage,
      hideMessage
    }
  },
  methods: {
    onClickBack() {
      this.log({
        name: '返回'
      })
      history.back()
    },
    log
  },
  data() {
    return {
      header: {
        leftOptions: {
          preventGoBack: true,
          backText: '',
          showBack: !!window.history.length
        }
      },
      tabs: [{
        active: true,
        span: 2,
        name: '询价',
        icon: 'icon-search',
        link: {
          name: 'enquiry'
        }
      }, {
        active: false,
        span: 1,
        name: '我',
        icon: 'icon-man2',
        link: {
          name: 'settings'
        },
        style: {
          fontWeight: 'bolder'
        }
      }]
    }
  },
  computed: {
    title() {
      return this.$route.data.title
    }
  },
  created() {
    // 获取用户信息
    sessions.get({
      noNeedLogin: !this.$route.needLogin
    }).then((res) => {
      let user = res.json().account
      this.updateUser(user)
    })
  },
  store,
  replace: false
}
</script>

<style lang="scss">
@import '~vux/dist/vux.css';
@import './assets/fonts/style.css';
@import './assets/scss/animate.scss';
@import './assets/scss/vux.scss';
@import './assets/scss/base.scss';
@import './assets/scss/common.scss';
@import './assets/scss/form.scss';
@import './assets/scss/tabbar.scss';
@import './assets/scss/card.scss';
#app {
  z-index: 1;
  position: relative;
}

.logo-bottom {
  height: 0.724638rem;
  line-height: 0.724638rem; //90px
  text-align: center;
  position: absolute;
  z-index: 0;
  left: 0;
  right: 0;
  bottom: 2.012882rem; // 250px
  &.no-tabbar {
    border-top: 1px solid #d9deea;
    left: 0.402576rem; //50px
    right: 0.402576rem;
    bottom: 0; // 90px
    padding: 0.402576rem 0;
  }
  img {
    width: 4.267311rem; // 530px
  }
}

body.overflow-height {
  .logo-bottom {
    position: static;
    margin: 0 0.402576rem; //0 50px
    margin-bottom: 1.588245rem;
    left: 0;
    right: 0;
    margin-top: 0.402576rem;
    &.no-tabbar {
      margin-bottom: 0;
    }
  }
}
</style>
