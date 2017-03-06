<template lang="jade">
.perfect
  .form-title
    .left
      small *请上传与注册手机号一致的名片信息
    .right
      button.btn.btn-simple(@click='skipOver()') 跳过
  validator(name='cardValidation')
    form(name='cardForm', novalidate='', @submit='onSubmit($event)')
      .form-container
        .form-group.card-container(:class='containerClass')
          .card-body
            .btn-file
              input#file(v-model='card.file', @change="cardOnChange('file', $event)", type='file', v-validate:file='{required: {rule: true, message: "请长传名片"}}', name='file', accept='image/*')
            .comment(v-show='!card.file')
              p
                //- | 请上传与注册手机号一致的名片信息
                //- br
                | 如名片信息分布在正反两面，请将正反两张名片摆在一起拍照
            .business-card-preview
              img(alt='名片预览', :src='card.previewUrl')
      .form-footer
        flexbox
          flexbox-item
            button.btn(@click="$root.log({name: '下一步'})") 下一步
          flexbox-item(v-show='card.file')
            button.btn.btn-gray(@click.prevent='resetForm()') 重新上传

</template>

<script>
import Flexbox from 'vux-components/flexbox'
import FlexboxItem from 'vux-components/flexbox-item'
import Utils from '../common/utils'
import lrz from 'lrz'
import {
  user
} from '../vuex/getters'
import {
  cards
} from '../common/resources'

export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  vuex: {
    getters: {
      user
    }
  },
  data() {
    return {
      rst: {},
      card: {
        img: null, // 供压缩用
        file: null,
        previewUrl: '',
        previewing: false,
        uploading: false
      }
    }
  },
  computed: {
    containerClass: {
      cached: false,
      get() {
        let cssClass = ''
        switch (true) {
          case this.card.previewing:
            cssClass = 'preparing'
            break
          case !!this.card.previewUrl:
            cssClass = 'preview'
            break
          case this.card.uploading:
            cssClass = 'pending'
            break
          default:
            cssClass = ''
        }
        return cssClass
      }
    }
  },
  methods: {
    // 跳过
    skipOver() {
      const _self = this
      this.$root.showConfirm({
        confirmText: '马上去传',
        cancelText: '残忍拒绝',
        content: '上传名片才能完成认证哦',
        onCancel() {
          _self.$router.go({
            name: 'prefer',
            query: _self.$route.query
          })
        }
      })
    },

    // 预览名片
    showPreview(url) {
      let img = new Image()
      img.src = url
      img.onload = () => {
        this.card.previewUrl = url
        this.card.previewing = false
        this.card.img = img
      }
    },

    // 选择新照片
    cardOnChange(name, event) {
      this.validate(name)
      let file = event.target.files[0]

      this.$root.showLoadingStatus()
      lrz(file, {
        quality: 0.7 //1 的话方向会错
      }).then(rst => {
        this.$root.hideLoadingStatus()
        this.rst = rst
        this.showPreview(rst.base64)

        this.$root.log({
          name: '用户预览名片成功'
        })
      }).catch(err => {
        this.$root.hideLoadingStatus()
        this.$root.log({
          name: '用户预览名片失败:' + err
        })

        this.$root.showToast(err || '抱歉，图片加载失败！')
      })

      /*
      let reader = new FileReader()

      reader.addEventListener('load', () => {
        this.$root.hideLoadingStatus()
        this.showPreview(reader.result)
        this.$root.log({
          name: '上传名片'
        })
      })

      if (file.files[0]) {
        this.$root.showLoadingStatus()
        this.previewing = true
        setTimeout(() => {
          reader.readAsDataURL(file.files[0])
        }, 50)
      }*/
    },

    // 重新上传名片
    resetForm() {
      this.card.previewUrl = ''
      this.card.file = null
      document.forms.namedItem('cardForm').reset()
      this.$root.log({
        name: '重新上传'
      })
    },

    validate(name) {
      if (this.$cardValidation[name].invalid && this.$cardValidation[name].touched) {
        this.$validate(name)
      }
    },

    onSubmit(event) {
      event.preventDefault()
      this.$validate(true, () => {
        if (this.$cardValidation.invalid) {
          this.$root.showToast({
            text: '请先上传名片'
          })
        } else {
          this.$root.showLoadingStatus()
            // let form = document.forms.namedItem('cardForm')
          let formData = new FormData()
          let fileName = Utils.uniqeId(8)
          formData.append('file', this.rst.file, `${fileName}.jpeg`)

          cards.save(formData)
            .then((res) => {
              return cards.update({
                content: 'confirm'
              }, {})
            })
            .then((res) => {
              this.$root.hideLoadingStatus()
              this.$root.updateUser(Object.assign({}, this.user, res.json().account))

              if (!this.$route.query.update) { // 不是更新操作，注册后的上传名片
                // this.$root.showAlert({
                //   content: '名片上传成功，快去开启您的询价之旅吧！'
                // })

                this.$router.go({
                  name: 'prefer',
                  query: this.$route.query
                })
              } else { // 如果是更新名片
                this.$root.showToast({
                  text: '名片修改成功!',
                  type: 'text'
                })

                this.$router.go({
                  name: 'settings'
                })
              }

              this.$root.log({
                name: '用户提交名片成功'
              })
            })
            .catch((res) => {
              this.$root.hideLoadingStatus()
              this.$root.showToast({
                text: res.json().error || '抱歉，服务器繁忙！'
              })

              this.$root.log({
                name: '用户提交名片失败'
              })
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-title {
  padding: 0 0.362319rem; //45px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.207729rem; //150px
  .left {
    flex: 1;
    font-size: 0.289855rem; //36px
  }
  .right {
    width: 40%;
    text-align: right;
  }
  .btn {
    font-size: 0.354267rem; //44px
    height: 0.644122rem; //80px;
    line-height: 0.644122rem; //80px;
    width: 1.449275rem; //180px
    border-radius: 100px;
    color: #626d8b;
    color: #626d8b;
  }
  .btn-simple {
    color: #adb1bc;
    background: none;
    border: 0;
    padding: 0;
    width: auto;
  }
}

.form-container {
  background: white;
}

.form-footer {
  padding: 0.644122rem 0.402576rem; //80px 50px
}

form {
  background: none;
}

.card-container {
  $dotSize: 0.040258rem;
  text-align: center;
  .dotting {
    display: inline-block;
    min-width: $dotSize;
    min-height: $dotSize;
    margin-right: 0.064412rem;
  }
  .title {
    font-size: 0.523349rem;
    margin: 0.805153rem auto;
  }
  .card-body {
    margin: 0 auto;
    .business-card-preview {
      height: 4.025765rem;
      margin: 0 auto;
      border: 1px solid #dbe0e7;
      position: relative;
      img {
        max-width: 98%;
        max-height: 98%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
    .btn-file {
      height: 3.623188rem;
      width: 3.623188rem;
      line-height: 3.623188rem;
      margin: 0 auto;
      position: relative;
      background: #dbe0e7;
      border-radius: 0.080515rem;
      text-align: center;
      font-size: 300px;
      color: white;
      overflow: hidden;
      &:after {
        height: 1.851852rem;
        width: 0.177134rem;
      }
      &:before {
        width: 1.851852rem;
        height: 0.177134rem;
      }
      &:after,
      &:before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        background: white;
        border-radius: 0.080515rem;
        pointer-events: none;
      }
      &:active {
        &:before,
        &:after {
          background: #4380dd;
        }
      }
      input {
        position: absolute;
        opacity: 0;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .business-card-preview {
      display: none;
    }
    .buttons {
      margin-top: 1.207729rem;
    }
    /* .btn {
      height: 0.764895rem;
      width: 3.381643rem;
      font-size: 0.442834rem;
      color: white;
      border: 0;
      border-radius: 0.080515rem;
      &.btn-submit {
        background: #626b81;
        &:active {
          background: darken(#626b81, 10%);
        }
        margin-right: 10px;
      }
      &.btn-redo {
        width: 2.713366rem;
        background: #82899c;
        &:active {
          background: darken(#82899c, 10%);
        }
      }
      &.pending {
        .dotting {
          animation: dot 2s infinite step-start both;
        }
      }
    } */
  }
  .comment {
    margin-top: 0.402576rem; //50px
    line-height: 1.5em;
    color: #adb1bc;
    font-size: 0.289855rem; //36px
  }
  &.preparing {
    .card-body {
      .status {
        display: block;
      }
    }
  }
  &.preview {
    .card-body {
      .business-card-preview {
        display: block;
      }
      .btn-file {
        display: none;
      }
    }
  }
  &.done {
    .title {
      display: none;
    }
    .card-body {
      .business-card-preview,
      .btn-file {
        display: none;
      }
    }
    .success {
      display: block;
    }
  }
}
</style>
