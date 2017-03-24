<template lang="jade">
  .perfect
    .invitation_title(:style="invitationStyle")
      h2
        img(src='../assets/images/logo.svg',alt='logo' class="inv_logo")
      p(class="text-explain")
        span 专业全面的互金理财市场数据和信息产品
      p.friend
        img(src="../assets/images/inv_body.png" class="inv_body")
      .inv_button
        button(@click="goInvitation()") 去邀请
      p.inv_foot 高级用户可享受PANO的最高权限,<br>使用网站的全部功能以及全域的数据检索等。
</template>

<script>
import wxMixin from '../mixins/wx-mixin'
export default {
  mixins: [wxMixin],
  ready() {
    const host = location.protocol + '//' + location.host
    const name = encodeURIComponent(this.$route.query._n)
    this.wxInit({
      title: '最全的互联网金融市场数据都在这儿了',
      desc: '现在还能在线对接资产项目',
      link: `${host}#!/shared_register?_u=${this.$route.query._u}&_n=${name}&inviteFromWebQR` // 分享链接
    })
  },
  methods: {
    goInvitation() {
      this.$root.showAlert({
        content: '点击右上角，马上分享给你的小伙伴吧！'
      })
    }
  },
  data() {
    return {
      invitationStyle: {
        height: window.innerHeight + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.invitation_title {
  background-image: url(../assets/images/invitation_bg.jpg);
  text-align: center;
  h2 {
    text-align: center;
    padding: 0.805153rem 0; //100px
  }
  .inv_logo {
    font-size: 0.402576rem; //50px
    color: #fff;
    width: 4.267311rem;
  }
  .text-explain {
    font-size: 0.402576rem; //50px
    color: #fff;
    padding-bottom: 10px;
    span {
      font-weight: 3.220612rem; //400px
      position: relative;
      margin: 0.483092rem 0; //60px
      &:before {
        content: '';
        width: 0.286473rem; //48px
        height: 0.286473rem;
        border-top: 0.016103rem solid #b6b4b5;
        border-left: 0.016103rem solid #b6b4b5;
        position: absolute;
        top: -0.081031rem;
        left: -10px;
      }
      &:after {
        content: '';
        width: 0.286473rem;
        height: 0.286473rem;
        border-right: 0.016103rem solid #b6b4b5;
        border-bottom: 0.016103rem solid #b6b4b5;
        position: absolute;
        bottom: -10px;
        right: -10px;
      }
    }
  }
  .friend {
    margin-top: 0.483092rem; //60px
  }
  .inv_body {
    margin-top: 0.161031rem;
    width: 7.689211rem; //955px
    height: 3.824477rem; //475px
  }
  .inv_button {
    margin-top: 2.173913rem; //270px
    button {
      height: 1.111111rem; //138px
      width: 8.373591rem; //1040px
      background: #007fd1;
      border-radius: 1.111111rem; //138px
      &:active {
        background: darken(#007fd1, 10%);
      }
    }
  }
  .inv_foot {
    margin-top: 0.845411rem; //105px
    color: #c5c9d2;
  }
}
</style>
