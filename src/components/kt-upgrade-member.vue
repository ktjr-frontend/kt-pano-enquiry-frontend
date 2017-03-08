<template lang="jade">
.upgrade-to-vip
  .group
    kt-cell(title='升级高级会员')
      .way
        h3 方式一：邀请好友注册
        p
          | 每邀请一位金融相关用户注册并通过认证，您和好友均可获得
          b 30天高级会员
        .way-foot
          .default-content(@click="openShareTips()", @touchstart.stop='')
            i.icon-pano.icon-plus
            | 邀请好友
      .way
        h3 方式二：参与开通PANO用户体验计划（每月限量10人）
        p
          | 参与用户体验计划可获得30天高级会员。留下您的微信号，
          b PANO小助手
          | 会与您联系
        .way-foot
          .default-content(@click="popups.wxInput.show = true", @touchstart.stop='')
            i.icon-pano.icon-plus
            | 填写微信号
  //- 自定义标签
  a.vux-popup-mask(href='javascript:void(0)')
  popup(v-kt-prevent='', :show.sync='popups.wxInput.show', :height='popups.wxInput.height')
    .header
      a(@click='closeWxInput(true)', @touchstart.stop='', class='cancel') 取消
      a(@click='closeWxInput()', @touchstart.stop='', class='ok') 确定
    .popup-body
      .group
        kt-cell
          .weui_cell.weui_select_after
            .wrapper
              .weui_cell_hd
                label.weui_label
                  | 微信账号
              div(@touchstart.stop='')
                input.weui_input(placeholder='输入你的微信账号', v-model='user.wx')
</template>

<script>
import Popup from 'vux-components/popup'
import KtCell from './kt-cell.vue'
import {
  user
} from '../vuex/getters.js'
import {
  accounts
} from '../common/resources.js'

export default {
  components: {
    Popup,
    KtCell
  },
  vuex: {
    getters: {
      user
    }
  },
  methods: {
    // 分享提示
    openShareTips() {
      this.$root.showAlert({
        content: '点击右上角马上分享给你的小伙伴吧！'
      })
    },
    // 关闭微信输入框
    closeWxInput(cancelled) {
      if (cancelled) {
        this.$root.log({
          name: '取消输入微信'
        })

        this.popups.wxInput.show = false
        return
      }

      if (!this.user.wx.length || this.user.wx.length > 10) {
        this.$root.showToast({
          text: '您正确填写标签名称, 不能大于10个字符'
        })
        return
      }

      this.$root.log({
        name: '保存微信账号'
      })

      this.$root.showLoadingStatus()
      accounts.save({
        content: 'get_premium_by_wx'
      }, {
        wx: this.user.wx
      }).then(res => res.json()).then(data => {
        this.$root.hideLoadingStatus()
        this.$emit('submitWxSuccess')
        this.popups.wxInput.show = false
        this.$root.showAlert({
          content: '已提交，稍后工作人员会与您联系'
        })
      }).catch(res => {
        this.$root.hideLoadingStatus()
        this.$root.showToast({
          text: res.json().error || '抱歉，服务器繁忙！'
        })
      })
    }
  },

  data() {
    return {
      popups: {
        wxInput: {
          show: false,
          height: '100%'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.way {
  text-align: left;
  font-size: 0.289855rem; //36px
  border-bottom: 1px solid #eff2f7;
  margin-bottom: 0.322061rem; //40px
  &:last-child {
    border-bottom: 0;
    margin-bottom: 0;
  }
  h3 {
    color: #acb1bd;
    margin-bottom: 0.161031rem; //20px
  }
  p {
    color: #737e9c;
  }
  b {
    margin: 0 0.040258rem; //5px
    font-weight: normal;
    color: #29b9ae;
    font-size: 0.338164rem; //42px;
  }
}

.way-foot {
  text-align: center;
  padding: 0.402576rem 0; //50px
}
</style>
