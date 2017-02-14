<template lang="jade">
.settings
  group
    cell(title='头像', is-link, @click='showAvatarPreview()')
      //- form(name='avatar')
      //-   input.file(v-model='model.avatarFile', @change="avatarOnChange($event)", type='file', name='file', accept='image/*')
      div.avatar
        .btn-file(:class='model.avatarDirection')
          img(:src='user.avatar_url', v-if='user.avatar_url', :style='model.avatarStyles')
          i.icon-pano.icon-man-simple(v-else)
  group(title='如需修改，请重新提交名片')
    cell(title='姓名', :value='user.name')
    cell(title='手机号码', :value='user.mobile.toString()', v-if="user.status !== 'passed'", is-link='', @click='changeUserMobile()')
    cell(title='手机号码', :value='user.mobile.toString()', v-if="user.status === 'passed'")
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
    cell(title='修改密码', is-link='', v-link="{name: 'changePassword'}", @click="$root.bdTrack(['个人信息页', '进入', '修改密码'])")
  .buttons
    button(@click='logOutWithLog()') 退出登录
  a.vux-popup-mask(href='javascript:void(0)')
  popup(:show.sync='model.avatarPreviewShow', height='100%')
    .preview-popup(v-kt-prevent)
      .preview-image(:style='model.previewImageStyles')
        img(:src='user.avatar_url', v-if='user.avatar_url')
        i.icon-pano.icon-man-simple(v-else)
      .buttons(@touchstart.stop='')
        form(name='avatar')
          .btn.pos-r
            input.file(v-if='isWeixin()', v-model='model.avatarFile', @change="avatarOnChange($event)", type='file', name='file', accept='image/*', capture)
            input.file(v-else, v-model='model.avatarFile', @change="avatarOnChange($event)", type='file', name='file', accept='image/*')
            span {{user.avatar_url ? '更换头像' : '上传头像'}}
          .btn.btn-simple(@click='cancelChangeAvatar()') 取消
  popup(:show.sync='model.avatarCropShow', height='100%')
    .header
      a(@click='closeCropperContainer(true)', class='cancel') 取消
      a(@click='closeCropperContainer()', class='ok') 确定
    .cropper-container(v-el:cropper, v-kt-prevent)
</template>

<script>
import Popup from 'vux-components/popup'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import lrz from 'lrz'
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
import ImgCropper from '../../libs/img_cropper_reverse'
import '../../libs/img_cropper_reverse/index.scss'

export default {
  components: {
    Popup,
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
      // this.$els.cropper.addEventListener('touchstart', e => {
      //   e.preventDefault()
      //   return false
      // })

    this.imgCropper = new ImgCropper({
      container: this.$els.cropper
    })

    // this.$els.previewPop.addEventListener('touchstart', e => {
    //   e.preventDefault()
    //   return false
    // })
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
    isWeixin: Utils.isWeixin,
    showMessage(status) {
      if (status === 'pended' || status === 'rejected') {
        this.$root.showMessage({
          content: this.message
        })
      }
    },

    // 预览头像
    showAvatarPreview() {
      this.$root.bdTrack(['个人信息页', '预览', '我的头像'])
      this.model.avatarPreviewShow = true
    },

    // 取消预览
    cancelChangeAvatar() {
      this.model.avatarPreviewShow = false
      this.$root.bdTrack(['个人信息页', '取消预览', '我的头像'])
    },

    // 从相册选择图片时触发
    avatarOnChange(event) {
      let file = event.target.files[0]
      this.$root.showLoadingStatus()
      this.$root.bdTrack(['个人信息页', '上传', '我的头像'])

      lrz(file, {
        quality: 0.7
      }).then(rst => {
        this.lrzFile = rst.file
        this.previewAvatar()
      }).catch(err => {
        this.$root.log({
          name: '用户修改头像失败:' + err
        })

        this.$root.showTotast({
          text: err || '抱歉，图片处理失败！'
        })
      })
    },

    // 预览并截图
    previewAvatar() {
      this.model.avatarPreviewShow = false
      this.model.avatarCropShow = true
      let fr = new FileReader()

      fr.addEventListener('load', () => {
        this.$root.hideLoadingStatus()
        this.imgCropper.setImage(fr.result)
      })

      fr.readAsDataURL(this.lrzFile)
    },

    // 关闭截图容器
    closeCropperContainer(cancel) {
      this.model.avatarFile = null
      if (cancel) {
        this.model.avatarCropShow = false
        this.$root.bdTrack(['个人信息页', '取消截图', '我的头像'])
        return
      } else {
        // 更新头像
        this.$root.showLoadingStatus()
        this.$root.bdTrack(['个人信息页', '确定截图', '我的头像'])
        let formData = new FormData()
        let fileName = Utils.uniqeId(8)
        let file = Utils.compressImage(this.$els.cropper.querySelector('img'), this.imgCropper.getInfo())

        formData.append('file', file, `${fileName}.jpeg`)

        accounts.update({
          content: 'avatar'
        }, formData).then(res => {
          this.$root.hideLoadingStatus()
          this.user.avatar_url = res.json().user.avatar_url

          this.$root.log({
            name: '用户修改头像成功'
          })

          this.$root.showToast({
            text: '头像修改成功',
            type: 'text'
          })

          this.model.avatarCropShow = false
        }).catch(res => {
          this.$root.hideLoadingStatus()
          this.$root.showToast({
            text: '抱歉，服务器繁忙！'
          })
          document.forms.namedItem('avatar').reset()

          this.$root.log({
            name: '用户修改头像失败'
          })
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
    },

    changeUserCard() {
      let _self = this
      this.$root.log({
        name: '重新上传名片'
      })

      this.$root.bdTrack(['个人信息页', '提示', '名片上传'])
      this.$root.showConfirm({
        content: '上传名片后需要重新审核，确定重新上传吗？',

        onConfirm() {
          _self.$root.log({
            name: '确定重新上传名片'
          })
          _self.$root.bdTrack(['个人信息页', '确认提示', '名片上传'])

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
      this.$root.bdTrack(['个人信息页', '点击', '退出登录'])
      this.logOut()
    }
  },

  computed: {
    message() {
      let user = this.user
      let message = ''
      user.pended_at_locale = moment(user.pended_at).format('YYYY-MM-DD HH:mm:ss')

      switch (user.status) {
        case 'pended':
          message = `您在<em>${user.pended_at_locale}</em>提交的信息正在审核，审核结果会在1个工作日内以邮件的形式通知，如有问题可联系PANO微信小秘书：kaitongpano。`
          break
        case 'rejected':
          message = `很抱歉，您所提交的信息因<em>${user.reason}</em>未能通过认证审核。<em>${user.solution}</em>，感谢您对开通PANO的关注！`
          break
        default:
          message = ''
      }
      return message
    }
  },

  data() {
    let winW = window.innerWidth
    return {
      ic: null,
      lrzFile: null,
      model: {
        avatarPreviewShow: false,
        avatarCropShow: false,
        previewImageStyles: {
          width: `${winW}px`,
          height: `${winW}px`
        },
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
#cropperContainer {
  overflow: hidden;
}

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
  height: 2rem;
  width: 2rem; //250px
  vertical-align: middle;
  margin-bottom: 2px;
  .btn-file {
    border-radius: 50%;
    border: 1px solid #d9deea;
    overflow: hidden;
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
      border-radius: 50%;
    }
    &.portrait {
      img {
        width: 100%;
        // transform: translateY(-20%);
      }
    }
    &.landscape {
      img {
        // transform: translateX(-20%);
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
      width: 100%;
      // max-width: 100%;
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

.cropper-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.preview-popup {
  height: 100%;
  background: #f5f5f5;
  .preview-image {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ddd;
    .icon-man-simple {
      font-size: 2.415459rem; //300px
    }
    img {
      width: 100%;
      vertical-align: top;
    }
  }
  form {
    width: 100%;
  }
  .buttons {
    // padding-top: 0.805153rem; //100px
    .btn {
      // height: 0.933977rem; //116
      // line-height: 0.933977rem; //116
      // font-size: 0.394525rem; //49px
      &:first-child {
        margin-bottom: 0.241546rem; //30px
      }
    }
  }
}

.vux-popup-dialog {
  background: black;
  .header {
    background: none;
    position: absolute;
    z-index: 100;
    left: 0;
    right: 0;
  }
}
</style>
