<template>
  <div id="app">
    <x-header v-show="headVisible" :left-options="header.leftOptions">{{title}}</x-header>
    <router-view></router-view>
    <div class="tabbar" v-show="tabVisible">
      <div class="tab" v-for="tab in tabs" :span="tab.span" :class="{'active': tab.active}">
        <a v-link="tab.link">
          <i class="icon-pano" :class="tab.icon"></i>{{tab.name}}
        </a>
      </div>
    </div>
  </div>
  <div class="logo" :class="{'no-tabbar': !tabVisible}">
    <img src="./assets/images/logo2.svg" alt="开通PANO">
  </div>

  <alert :show.sync="alert.show" :title="alert.title" :button-text="alert.buttonText">
    {{{alert.content}}}
  </alert>

  <toast :show.sync="toast.show" :time="toast.time" :type="toast.type">{{toast.text}}</toast>

  <loading :show="loadingStatus" :text="'加载中...'"></loading>
</template>

<script>
import store from './vuex/store'
import XHeader from 'vux-components/x-header'
import Loading from 'vux-components/loading'
import Alert from 'vux-components/alert'
import Toast from 'vux-components/toast'
import log from './common/log'
import {
  loadingStatus,
  toast,
  alert
} from './vuex/getters'
import _ from 'lodash'

import {
  updateUser,
  showAlert,
  showToast,
  showLoadingStatus,
  hideLoadingStatus
} from './vuex/actions'

export default {
  components: {
    XHeader,
    Loading,
    Alert,
    Toast
  },
  methods: {
    log
  },
  data() {
    return {
      header: {
        leftOptions: {
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
        icon: 'icon-man',
        link: {
          name: 'settings'
        }
      }]
    }
  },
  computed: {
    tabVisible() {
      return !_.includes(['home', 'login', 'register', 'perfect'], this.$route.name)
    },
    headVisible() {
      return !_.includes(['home', 'login', 'register', 'enquiryResult'], this.$route.name)
    },
    title() {
      return this.$route.title.text
    }
  },
  vuex: {
    getters: {
      loadingStatus,
      toast,
      alert
    },
    actions: {
      updateUser,
      showAlert,
      showToast,
      showLoadingStatus,
      hideLoadingStatus
    }
  },
  ready: function() {
    this.updateUser(JSON.parse(window.localStorage.user || '{}'))
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
@import './assets/scss/common.scss';
@import './assets/scss/form.scss';
@import './assets/scss/tabbar.scss';
@import './assets/scss/card.scss';
#app {
  z-index: 1;
  position: relative;
}

.logo {
  height: 0.724638rem;
  line-height: 0.724638rem; //90px
  text-align: center;
  position: absolute;
  z-index: 0;
  left: 0;
  right: 0;
  bottom: 2.012882rem; // 250px
  &.no-tabbar {
    border-top: 1px solid #c9cedc;
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
  .logo {
    position: static;
    margin: 0 0.402576rem; //0 50px
    margin-bottom: 1.288245rem;
    left: 0;
    right: 0;
    margin-top: 0.402576rem;
  }
}
</style>
