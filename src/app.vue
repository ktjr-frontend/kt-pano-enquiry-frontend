<template lang="jade">
#app(:class='{"head-visible": $route.data.headVisible}')
  x-header(v-show='$route.data.headVisible', :left-options='header.leftOptions', @on-click-back='onClickBack()')
    | {{title}}
    a.button(slot='right' v-show='$route.data.shareButtonVisible && isWeixin()' @click='wxShare()') 分享
  router-view.child-view
  .tabbar(v-show='tabVisible')
    .tab(v-for='tab in tabs', :span='tab.span')
      a(v-if='tab.link.name', @click='tabClick(tab)', :class="{'active': judgeActive(tab)}")
        i.icon-pano(:class='tab.icon', :style='tab.style')
        span {{tab.name}}
      a(v-if='tab.link.jump === "market"', @click='goToPano()')
        i.icon-pano(:class='tab.icon', :style='tab.style')
        span {{tab.name}}
.logo-bottom(:class="{'no-tabbar': !tabVisible, 'dn-by-h': !$route.data.logoBottomVisible}")
  img(src='./assets/images/logo2.svg', alt='开通PANO')
alert(:show.sync='alert.show', :title='alert.title', :button-text='alert.buttonText', @on-show='alert.onShow()', @on-hide='alert.onHide()')
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
// import log from './common/log'
import log, {
  bdTrack
} from './common/log'
import {
  sessions
} from './common/resources'
import {
  user,
  tabVisible,
  loadingStatus,
  toast,
  alert,
  confirm,
  message,
  instBasicInfo
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
import instDetail from './mixins/inst-detail-mixin.js'
import _ from 'lodash'
import Utils from './common/utils.js'

export default {
  mixins: [instDetail],
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
      user,
      tabVisible,
      loadingStatus,
      toast,
      alert,
      confirm,
      message,
      instBasicInfo
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
    isWeixin: Utils.isWeixin,
    routerGo(route, track) {
      this.$router.go(route)
      if (track) {
        this.bdTrack(track)
      }
    },
    onClickBack() {
      this.log({
        name: '返回'
      })
      history.back()
    },

    goToPano() {
      // if (this.user.status === 'rejected') {
      //   this.showToast({
      //     text: '由于您未通过认证审核，无权访问该页面！'
      //   })
      //   return
      // }
      this.goOverview()
    },

    // 判断的当前tab是否激活
    judgeActive(tab) {
      const routeName = this.$route.name
      if (tab.link.name === routeName) {
        return true
      } else if (tab.link.activeIncludes) {
        return _.includes(tab.link.activeIncludes, routeName)
      }
      return false
    },

    tabClick(tab) {
      // if (tab.reload) { // reload 强制刷新，避免在ios微信内被缓存的问题
      //   tab.link.query = tab.link.query || {}
      //   tab.link.query._r = Math.random().toString().slice(2)
      // }

      this.$router.go(tab.link)
      this.log({
        name: tab.name
      })
    },

    wxShare() {
      this.showAlert({
        content: '点击右上角，马上分享给你的小伙伴吧！'
      })
    },
    bdTrack,
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
        span: 1,
        name: '行情',
        icon: 'icon-market',
        link: {
          name: 'quotation',
          activeIncludes: ['quotationAM', 'quotationOB']
        }
      }, {
        active: false,
        span: 1,
        name: '对接项目',
        icon: 'icon-project',
        link: {
          name: 'joinInst',
          query: {
            redirect_to: '/quotation/ob'
          },
          params: {
            type: 'add'
          },
          activeIncludes: [
            'projectInfo'
          ]
        }
      }, {
        active: false,
        span: 1,
        name: '市场数据',
        icon: 'icon-price',
        link: {
          jump: 'market'
        }
      }, {
        active: false,
        span: 1,
        name: '我的',
        icon: 'icon-man2',
        reload: true,
        link: {
          name: 'profile',
          activeIncludes: [
            'myProjects', 'myProjectDetail', 'referProjects', 'referProjectDetail',
            'interestProjects', 'interestProjectDetail', 'settings', 'moreInstitutions', 'allInstitutions'
          ]
        }
      }]
    }
  },

  computed: {
    title() {
      return this.$route.data.title
    }
  },
  /*ready() {
    window.addEventListener('scroll', () => {
      this.$route.data.scrollY = window.scrollY
      console.log(this.$route.data.scrollY)
    })
  },*/
  created() {
    // 获取用户信息
    sessions.get({
      skipAuth: true
    }).then((res) => {
      const user = res.json().account
      this.updateUser(user)
    })
  },
  store,
  replace: false
}
</script>

<style lang="scss">
@import '~vux/dist/vux.css';
@import './assets/scss/mixins.scss';
@import './assets/fonts/style.css';
@import './assets/scss/animate.scss';
@import './assets/scss/vux.scss';
@import './assets/scss/base.scss';
@import './assets/scss/common.scss';
@import './assets/scss/form.scss';
@import './assets/scss/tabbar.scss';
@import './assets/scss/card.scss';
@import './assets/scss/icons.scss';
@import './assets/scss/list.scss';
#app {
  z-index: 1;
  position: relative;
  &.head-visible {
    padding-top: 50px;
  }
}

body[page="projectInfo"] {
  #app {
    position: static; // 避免vux-popup-mask 层级问题
  }
}

body {
  &.overflow-height {
    .logo-bottom {
      position: static;
      margin: 0 0.402576rem; //0 50px
      // margin-bottom: 1.588245rem;
      left: 0;
      right: 0;
      margin: 0.402576rem 0;
      &.no-tabbar {
        margin-bottom: 0;
      }
    }
  }
  &.tab-visible {
    // -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 1.932367rem; //240px
  }
  .logo-bottom {
    // height: 0.724638rem;
    // line-height: 0.724638rem; //90px
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
      &.dn-by-h {
        border: 0;
      }
    }
    img {
      width: 4.267311rem; // 530px
    }
  }
}

.button-fixed-placeholder {
  opacity: 0;
  padding: 0.362319rem 0.402576rem; // 45px 50px;
}

.buttons-footer {
  background: white;
  padding: 0.362319rem 0.402576rem; // 45px 50px;
  @include flex;
  // border-top: 1px solid #eff2f7;
  &.fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  &.more-than-one {
    button {
      margin: 0 0.201288rem; //25px
    }
  }
  .icon-arrow-right {
    &:after {
      border-color: white;
    }
  }
  button {
    flex: 1;
    display: block;
    &.green {
      background: #89d7cb;
      &:active {
        background: darken(#89d7cb, 10%);
      }
    }
    &.gray {
      background: rgba(128, 128, 128, 0.45);
    }
  }
}
</style>
