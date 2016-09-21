<template lang="jade">
.settings
  group
    cell(title='头像', is-link)
      form(name='avatar')
        input.file(v-model='model.avatarFile', @change="avatarOnChange($event)", type='file', name='file')
        span.avatar
          .btn-file(:class='model.avatarDirection')
            img(:src='user.avatar_url', v-if='user.avatar_url', :style='model.avatarStyles')
            i.icon-pano.icon-man-simple(v-else)
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
} from '../../vuex/getters'
import {
  logOut
} from '../../vuex/actions'
import moment from 'moment'
import Utils from '../../common/utils'
import {
  accounts
} from '../../common/resources'

export default {
  components: {
    Group,
    Cell
  },

  vuex: {
    getters: {
      user
    },
    actions: {
      logOut
    }
  },

  ready() {
    this.showMessage(this.user.status)
  },

  watch: {
    'user.avatar_url': {
      handler: function(val) {
        Utils.getImageInfo(val).then((res) => {
          this.model.avatarDirection = res.direction

          // 保证头像的cover居中
          this.model.avatarStyles = {
            transform: ` ${res.direction === 'portrait' ? 'translateY(-' : 'translateX(-'}${res.widthHeightDiffPercent * 100 / 2}%)`
          }
        })
      },
      immediate: true
    },
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

    avatarOnChange(event) {
      let file = event.target
        // let reader = new FileReader()

      // // fileread 加载完成
      // reader.addEventListener('load', () => {
      //   let url = reader.result
      //   let img = new Image()
      //   img.src = url

      //   // 图片加载完
      //   img.onload = () => {
      let formData = new FormData()
        // let fileName = Utils.uniqeId(8)

      formData.append('file', file.files[0])
      this.$root.showLoadingStatus()

      // 更新头像
      accounts.update({
        content: 'avatar'
      }, formData).then(res => {
        this.$root.hideLoadingStatus()
        this.user.avatar_url = res.json().user.avatar_url
      }).catch(res => {
        this.$root.hideLoadingStatus()
        this.$root.showToast({
          text: '抱歉，服务器繁忙！'
        })
        document.forms.namedItem('avatar').reset()
      })

      //   } // })

      // if (file.files[0]) {
      //   this.$root.showLoadingStatus()
      //   reader.readAsDataURL(file.files[0])
      // }
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
  },

  data() {
    return {
      model: {
        avatarStyles: {},
        avatarDirection: 'portrait',
        avatarFile: null
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/scss/mixins.scss';
form {
  display: inline-block;
  background: none;
  height: 100%;
  input {
    position: absolute;
    opacity: 0;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
  }
}

.avatar {
  display: inline-block;
  border-radius: 50%;
  border: 1px solid #d9deea;
  height: 2.012882rem;
  width: 2.012882rem; //250px
  overflow: hidden;
  vertical-align: middle;
  .btn-file {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 9;
    @include flex();
    .icon-man-simple {
      font-size: 0.644122rem; //80px
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
    }
    &.portrait {
      img {
        width: 100%;
        transform: translateY(-20%);
      }
    }
    &.landscape {
      img {
        transform: translateX(-20%);
        height: 100%;
      }
    }
  }
}

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
