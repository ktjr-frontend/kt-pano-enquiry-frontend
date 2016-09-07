<template lang="jade">
.settings
  group
    cell(title='姓名', :value='user.name')
    cell(title='手机号码', :value='user.mobile.toString()', v-if="user.status !== 'passed'", is-link='', @click='changeUserMobile()')
    cell(title='手机号码', :value='user.mobile.toString()', v-if="user.status === 'passed'")
  group
    cell(title='工作邮箱', :value='user.email')
    cell(title='公司名称', :value='user.company')
    cell(title='部门', :value='user.department')
    cell(title='职位', :value='user.job')
    cell(title='地址', :value='user.address')
  group.user-card
    cell(title='名片', is-link='', @click='changeUserCard()')
      .user-card-box(slot='after-title')
        img(:src='user.card_url', alt='您的名片')
  group
    cell(title='修改密码', is-link='', v-link="{name: 'changePassword'}")
  .buttons
    //- <button v-if="user.status === 'rejected'" @click="submitForCheck()">提交审核</button>
    button(@click='logOutWithLog()') 退出登录
</template>

<script>
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import {
  user
} from '../vuex/getters'
import {
  logOut
} from '../vuex/actions'
import moment from 'moment'

export default {
  components: {
    Group,
    Cell
  },

  ready() {
    this.showMessage(this.user.status)
  },

  watch: {
    'user.status': function(val) {
      this.showMessage(val)
    }
  },

  methods: {
    showMessage(status) {
      if (status === 'pended' || status === 'rejected') {
        this.$root.showMessage({
          content: this.title
        })
      }
    },

    changeUserMobile() {
      let _self = this
      this.$root.log({
        name: '修改手机'
      })

      _self.$router.go({
        name: 'changeMobile1'
      })

      /*this.$root.showConfirm({
        content: '修改手机号后需要重新审核，确定修改手机号吗？',

        onConfirm() {
          _self.$root.log({
            name: '确定修改手机'
          })

          _self.$router.go({
            name: 'changeMobile1'
          })
        },

        onCancel() {
          _self.$root.log({
            name: '取消修改手机'
          })
        }
      })*/
    },

    changeUserCard() {
      let _self = this
      this.$root.log({
        name: '重新上传名片'
      })

      this.$root.showConfirm({
        content: '上传名片后需要重新审核，确定重新上传吗？',

        onConfirm() {
          _self.$root.log({
            name: '确定重新上传名片'
          })

          _self.$router.go({
            name: 'perfect',
            query: {
              update: true
            }
          })
        },

        onCancel() {
          _self.$root.log({
            name: '取消重新上传名片'
          })
        }
      })
    },

    logOutWithLog() {
      this.$root.log({
        name: '退出登录'
      })
      this.logOut()
    }
  },

  vuex: {
    getters: {
      user
    },
    actions: {
      logOut
    }
  },

  computed: {
    title() {
      let user = this.user
      let title = ''
      user.pended_at_locale = moment(user.pended_at).format('YYYY-MM-DD HH:mm:ss')

      switch (user.status) {
        case 'pended':
          title = `您在<em>${user.pended_at_locale}</em>提交的信息正在审核，审核结果会在1个工作日内以邮件的形式通知，如有问题可联系PANO微信小秘书：kaitongpano。`
          break
        case 'rejected':
          title = `很抱歉，您所提交的信息因<em>${user.reason}</em>未能通过认证审核。<em>${user.solution}</em>，感谢您对开通PANO的关注！`
          break
        default:
          title = ''
      }
      return title
    }
  }
}
</script>

<style scoped lang="scss">
.user-card {
  .user-card-box {
    padding: 0.241546rem 0.080515rem; //20px
    text-align: center;
    img {
      // max-height: 2.415459rem;
      max-width: 100%;
    }
  }
}

.buttons {
  padding: 0.322061rem; //40px
  button {
    &:first-child {
      background: #194373;
      &:active {
        background: darken(#194373, 10%)
      }
    }
    margin-bottom: 0.322061rem;
    background: #b7bed1;
    &:active {
      background: darken(#b7bed1, 10%)
    }
  }
}
</style>
