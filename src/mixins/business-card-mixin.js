import {
  cardFront,
  cardBack
} from '../common/resources'
import Utils from '../common/utils'
import lrz from 'lrz'
import {
  user
} from '../vuex/getters'
import _ from 'lodash'

const FILE_NOT_EMPTY = 'has_file'

export default {
  vuex: {
    getters: {
      user
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
  ready() {
    this.isUpdated = !!this.$route.query.update
    this.certifyApplication = this.$route.query.certifyApplication
    this.cardFront.previewUrl = this.user.card_url
    this.cardFront.file = this.user.card_url ? FILE_NOT_EMPTY : null
    this.cardBack.previewUrl = this.user.card_back_url
  },
  methods: {
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
          cardsPromise.then((res) => {
            this.$root.hideLoadingStatus()
            if (_.isArray(res)) {
              this.$root.updateUser(Object.assign({}, this.user, res[0].json().user, res[1].json().user))
            } else {
              this.$root.updateUser(Object.assign({}, this.user, res.json().user))
            }

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
            console.log(res)
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
        uploading: false,
        visible: true,
        canEdit: true
      },
      cardBack: { // 反面
        rst: {},
        img: null, // 供压缩用
        file: null,
        previewUrl: '',
        previewImgStyle: {},
        uploading: false,
        visible: true,
        canEdit: true
      }
    }
  }
}
