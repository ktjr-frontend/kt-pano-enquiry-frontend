<template lang="jade">
.perfect
  .form-title
    .left
      small *请上传与注册手机号一致的名片信息
    .right
      button.btn.btn-simple(@click='skipOver()', v-if="!isUpdated && !certifyApplication") 跳过
  validator(name='cardValidation')
    form(name='cardForm', novalidate='', @submit.prevent='onSubmit()')
      .form-container
        .form-group.card-container(:class="{'preview': cardFront.previewUrl}")
          .card-body
            span.card-note
              i.blank
              | 正面
              i.blank
            .btn-file
              input#file(v-el:card-front-input,  @change="cardOnChange('frontfile', $event)", type='file', name='frontfile', accept='image/jpeg,image/png,image/jpg,image/gif')
              input(type="hidden", v-model='cardFront.file', v-validate:frontfile='{required: {rule: true, message: "请上传名片正面"}}')
            .business-card-preview(v-el:card-front)
              .img-wrapper
                img(alt='名片预览', :src='cardFront.previewUrl', :style="cardFront.previewImgStyle")
                i.icon-pano.icon-plus(@click.prevent='resetInput()')
        .form-group.card-container(:class="{'preview': cardBack.previewUrl}")
          .card-body
            span.card-note 反面<br/>（可选）
            .btn-file
              input#file(v-el:card-back-input, @change="cardOnChange(null, $event, 'cardBack')", type='file', name='backfile', accept='image/jpeg,image/png,image/jpg,image/gif')
            //- .comment(v-show='!cardBack.file')
              //- p
                //- | 请上传与注册手机号一致的名片信息
                //- br
                | 如名片信息分布在正反两面，请将正反两张名片摆在一起拍照
            .business-card-preview(v-el:card-back)
              .img-wrapper
                img(alt='名片预览', :src='cardBack.previewUrl', :style="cardBack.previewImgStyle")
                i.icon-pano.icon-plus(@click.prevent="resetInput('cardBack')")
      .form-footer
        flexbox
          flexbox-item
            button.btn(v-if="!isUpdated", @click="$root.log({name: '下一步'})") 下一步
            button.btn(v-if="isUpdated", @click="$root.log({name: '确定'})") 确定
          //- flexbox-item(v-show='cardFront.file')
            button.btn.btn-gray(@click.prevent='resetInput()') 重新上传

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
  cardFront,
  cardBack
} from '../common/resources'
const FILE_NOT_EMPTY = 'has_file'

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

  ready() {
    this.isUpdated = !!this.$route.query.update
    this.certifyApplication = this.$route.query.certifyApplication
    this.cardFront.previewUrl = this.user.card_url
    this.cardFront.file = this.user.card_url ? FILE_NOT_EMPTY : null
    this.cardBack.previewUrl = this.user.card_back_url
  },

  data() {
    return {
      cardFrontResource: cardFront,
      cardBackResource: cardBack,
      certifyApplication: false, // false 注册流程，true 真正流程
      isUpdated: false, // 默认不是更新名片
      cardFront: { // 正面
        rst: {},
        img: null, // 供压缩用
        file: null,
        previewUrl: '',
        previewImgStyle: {},
        uploading: false
      },
      cardBack: { // 反面
        rst: {},
        img: null, // 供压缩用
        file: null,
        previewUrl: '',
        previewImgStyle: {},
        uploading: false
      }
    }
  },

  watch: {
    'cardBack.previewUrl' (value) {
      if (value) {
        this.$nextTick(() => {
          this.cardBack.previewImgStyle = {
            maxWidth: `${this.$els.cardBack.getBoundingClientRect().width}px`
          }
        })
      }
    },
    'cardFront.previewUrl' (value) {
      if (value) {
        this.$nextTick(() => {
          this.cardFront.previewImgStyle = {
            maxWidth: `${this.$els.cardFront.getBoundingClientRect().width}px`
          }
        })
      }
    }
  },

  methods: {
    // 跳过
    skipOver() {
      const _self = this
      this.$root.bdTrack(['上传名片页', '点击', '跳过'])
      this.$root.showConfirm({
        confirmText: '马上去传',
        cancelText: '残忍拒绝',
        content: '上传名片才能完成认证哦',
        onCancel() {
          _self.$root.bdTrack(['上传名片页', '点击', '残忍拒绝'])
          _self.$router.go({
            name: 'prefer',
            query: _self.$route.query
          })
        },
        onConfirm() {
          _self.$root.bdTrack(['上传名片页', '点击', '马上去传'])
        }
      })
    },

    // 预览名片
    showPreview(url, ns = 'cardFront') {
      const img = new Image()
      img.src = url
      img.onload = () => {
        this[ns].previewUrl = url
          // this[ns].previewing = false
        this[ns].img = img
        const maxW = this.$els[ns].getBoundingClientRect().width
        this[ns].previewImgStyle = {
          maxWidth: `${maxW}px`
        }
      }
    },

    // 选择新照片
    cardOnChange(name, event, ns = 'cardFront') {
      if (name) this.validate(name)
      const file = event.target.files[0]
      this.$root.bdTrack(['上传名片页', ns === 'cardFront' ? '正面' : '背面', '上传', '十字加号'])
      this.$root.showLoadingStatus()

      lrz(file, {
        quality: 0.7 //1 的话方向会错
      }).then(rst => {
        this.$root.hideLoadingStatus()
        this[ns].rst = rst
        this.showPreview(rst.base64, ns)
        this[ns].file = FILE_NOT_EMPTY
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

    // 重新上传名片,删除
    resetInput(ns = 'cardFront') {
      const _self = this
      this.$root.showConfirm({
        content: '确定删除吗？',
        onConfirm() {
          // 重置
          function reset() {
            _self[ns].previewUrl = ''
            _self[ns].file = null
            _self[ns].rst = {}
            _self.$els[`${ns}Input`].value = ''
              // document.forms.namedItem('cardForm').reset()
            _self.$root.log({
              name: '重新上传'
            })
          }

          if (!_self[ns].previewUrl.match(/^data:image/g)) { // 如果不是本地预览的图片
            _self.$root.showLoadingStatus()
            _self[`${ns}Resource`].delete().then(() => { // 调用后端的删除接口
              _self.$root.hideLoadingStatus()
              reset()
              if (ns === 'cardFront') {
                _self.user.card_url = ''
                _self.user.status = 'rejected'
                _self.user.reason = '未上传名片正面信息'
                _self.user.solution = '请在下方上传名片信息'
              } else {
                _self.user.status = 'pended'
                _self.user.card_back_url = ''
              }
            }).catch(res => {
              _self.$root.hideLoadingStatus()
              _self.$root.showToast({
                text: '删除失败！'
              })
            })
          } else {
            reset()
          }
        }
      })
    },

    validate(name) {
      if (this.$cardValidation[name].invalid && this.$cardValidation[name].touched) {
        this.$validate(name)
      }
    },

    onSubmit(event) {
      this.$validate(true, () => {
        if (this.$cardValidation.invalid) {
          this.$root.showToast({
            text: '请上传名片正面'
          })
        } else {
          // let form = document.forms.namedItem('cardForm')
          const formDataFront = new FormData()
          const fileNameFront = Utils.uniqeId(8)
          formDataFront.append('file', this.cardFront.rst.file, `${fileNameFront}.jpeg`)
          let cardsPromise
          if (this.cardBack.rst.file) {
            const formDataBack = new FormData()
            const fileNameBack = Utils.uniqeId(8)
            formDataBack.append('file', this.cardBack.rst.file, `${fileNameBack}.jpeg`)
            if (this.cardFront.rst.file) { // 如果前面存在
              cardsPromise = Promise.all([this.cardFrontResource.save(formDataFront), this.cardBackResource.save(formDataBack)])
            } else {
              cardsPromise = this.cardBackResource.save(formDataBack)
            }
          } else if (this.cardFront.rst.file) {
            cardsPromise = this.cardFrontResource.save(formDataFront)
          }

          if (!cardsPromise) {
            this.$router.go({
              name: this.isUpdated ? 'settings' : 'prefer',
              query: this.$route.query
            })
            return
          }

          this.$root.showLoadingStatus()
          cardsPromise.then(() => {
            return this.cardFrontResource.update({
              content: 'confirm'
            }, {})
          }).then((res) => {
            this.$root.hideLoadingStatus()
            this.$root.updateUser(Object.assign({}, this.user, res.json().account))

            if (!this.$route.query.update) { // 不是更新操作，注册后的上传名片
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
          }).catch((res) => {
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
  padding: 0.885668rem 0.402576rem; //110px
  background: white;
}

.form-group {
  margin-bottom: 1.127214rem; //140px
  &:last-of-type {
    margin-bottom: 0;
  }
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
  .business-card-preview {
    height: 4rem;
    margin: 0 auto;
    // border: 1px solid #dbe0e7;
    background: #dbe0e7;
    border-radius: 0.080515rem;
    position: relative;
    flex: 1;
    .img-wrapper {
      max-width: 100%;
      // overflow: hidden;
      max-height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    img {
      vertical-align: top;
      max-width: 8rem;
      max-height: 4rem;
    }
    .icon-plus {
      position: absolute;
      top: 0;
      right: 0;
      background: #adb1bc;
      padding: 5px;
      border-radius: 50%;
      color: white;
      transform: translateX(50%) translateY(-50%) rotate(45deg);
      &:active {
        background: red;
      }
    }
  }
  .card-body {
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    .card-note {
      width: 4em;
      // position: absolute;
      // left: 50%;
      // top: 50%;
      // transform: translateY(-50%) translateX(-3.623188rem);
    }
    .btn-file {
      flex: 1;
      height: 3.623188rem;
      // width: 3.623188rem;
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
  }
  .comment {
    margin-top: 0.402576rem; //50px
    line-height: 1.5em;
    color: #adb1bc;
    font-size: 0.289855rem; //36px
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
