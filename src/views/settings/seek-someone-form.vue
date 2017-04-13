<template lang="jade">
.seek-someone-form
  kt-loading(:visible='$loadingRouteData')
  .header(:style="headerStyle")

  .head-tip 请认真填写以下信息，您的信息越精确，越容易找到想找的人：
  validator(name='validation')
    form(action='', novalidate='', @submit.prevent='onSubmit($event)')
      .group
        kt-cell(title='*想要找的人')
          .textarea(v-validate-class='', :class='{"not-empty": model.search_whom}', v-kt-textarea-count='model.search_whom', display-into='.count-box', :max-length='validator.search_whom.maxlength.rule')
            textarea(placeholder='举例：能够对接小微金融类资产的互金平台相关负责人', v-model='model.search_whom', v-validate:search_whom='validator.search_whom', rows="3")
            i.weui_icon.weui_icon_clear(v-touch:tap='clearModel("search_whom")')
            i.weui_icon.weui_icon_warn(v-touch:tap='showError("search_whom")')
            span.count-box 0/{{validator.search_whom.maxlength.rule}}
        kt-cell(title='*找人需求')
          .textarea(v-validate-class='', :class='{"not-empty": model.search_target}', v-kt-textarea-count='model.search_target', display-into='.count-box', :max-length='validator.search_target.maxlength.rule')
            textarea(placeholder='举例：XX公司XX项目寻求资金合作，总需求量X元，寻找对小微资产感兴趣的互金平台合作。', v-model='model.search_target', v-validate:search_target='validator.search_target', rows="3")
            i.weui_icon.weui_icon_clear(v-touch:tap='clearModel("search_target")')
            i.weui_icon.weui_icon_warn(v-touch:tap='showError("search_target")')
            span.count-box 0/{{validator.search_target.maxlength.rule}}
        kt-cell(title='微信号：')
          .textarea(v-validate-class='', :class='{"not-empty": model.wx}', v-kt-textarea-count='model.wx', display-into='.count-box', :max-length='validator.wx.maxlength.rule')
            textarea(placeholder='我们将优先通过微信与您联系', v-model='model.wx', v-validate:wx='validator.wx', rows="1")
            i.weui_icon.weui_icon_clear(v-touch:tap='clearModel("wx")')
            i.weui_icon.weui_icon_warn(v-touch:tap='showError("wx")')
            span.count-box 0/{{validator.wx.maxlength.rule}}
        kt-cell(title="名片：")
          .form-container
            .form-group.card-container(:class="{'preview': cardFront.previewUrl}", v-if='cardFront.visible')
              .card-body
                span.card-note
                  | 正面
                .btn-file
                  input#file(v-el:card-front-input, @change="cardOnChange(null, $event)", type='file', name='frontfile', accept='image/*')
                  input(type="hidden", v-model='cardFront.file')
                .business-card-preview(v-el:card-front)
                  .img-wrapper
                    img(alt='名片预览', :src='cardFront.previewUrl', :style="cardFront.previewImgStyle")
                    i.icon-pano.icon-plus(v-if='cardFront.canEdit', @click.prevent='resetInput()')
            .form-group.card-container(:class="{'preview': cardBack.previewUrl}", v-if='cardBack.visible')
              .card-body
                span.card-note 反面
                .btn-file
                  input#file(v-el:card-back-input, @change="cardOnChange(null, $event, 'cardBack')", type='file', name='backfile', accept='image/*')
                //- .comment(v-show='!cardBack.file')
                  //- p
                    //- | 请上传与注册手机号一致的名片信息
                    //- br
                    | 如名片信息分布在正反两面，请将正反两张名片摆在一起拍照
                .business-card-preview(v-el:card-back)
                  .img-wrapper
                    img(alt='名片预览', :src='cardBack.previewUrl', :style="cardBack.previewImgStyle")
                    i.icon-pano.icon-plus(v-if='cardBack.canEdit', @click.prevent="resetInput('cardBack')")
      .buttons
        button 确定
</template>

<script>
import KtCell from '../../components/kt-cell.vue'
import KtLoading from '../../components/kt-loading.vue'
import _ from 'lodash'
import {
  peopleSearch
} from '../../common/resources.js'
import {
  user
} from '../../vuex/getters.js'
import {
  updateUser
} from '../../vuex/actions.js'
import CardMixin from '../../mixins/business-card-mixin.js'
import Utils from '../../common/utils.js'

export default {
  mixins: [CardMixin],
  components: {
    KtCell,
    KtLoading
  },

  ready() {
    this.model.wx = this.user.wx
    this.cardFront.canEdit = !this.user.card_url
    this.cardBack.canEdit = !this.user.card_back_url
    this.cardFront.visible = this.user.card_url || (this.cardFront.canEdit && this.cardBack.canEdit)
    this.cardBack.visible = this.user.card_back_url || (this.cardFront.canEdit && this.cardBack.canEdit)
  },

  vuex: {
    getters: {
      user
    },
    actions: {
      updateUser
    }
  },

  route: {
    activate({
      to,
      from,
      next
    }) {
      this.submitRedirect = to.query.redirect_to ? decodeURIComponent(to.query.redirect_to) : '/my_seeks'
      next()
    },

    canDeactivate({
      next,
      abort
    }) {
      if (this.$validation.touched && !this.submitted) {
        this.$root.showConfirm({
          content: '数据还没有提交，确定离开吗？',
          onConfirm() {
            next()
          },
          onCancel() {
            abort()
          }
        })
      } else {
        next()
      }
    }
  },

  methods: {
    // 清空表单
    clearModel(name) {
      this.model[name] = ''
    },

    clearPreRouteCache() {
      if (this.$route.params.type === 'add' && this.$router._prevTransition) {
        // this.$router._prevTransition.to 上一个路由
        delete window.sessionStorage[this.$router._prevTransition.to.path]
      }
    },

    showError(name) {
      let error = _.find(this.$validation.errors, e => e.field === name)
      error && this.$root.showToast(error.message)
    },

    showFirstError() {
      this.$root.showToast(this.$validation.errors[0].message)
    },

    onSubmit() {
      this.$validate(true, () => {
        if (this.$validation.invalid) {
          this.showFirstError()
        } else {
          this.$root.showLoadingStatus()

          // 保存找人信息
          peopleSearch.save(this.model).then(res => {
            if (!this.user.wx) {
              this.user.wx = this.model.wx
                // this.updateUser(this.user)
            }

            this.clearPreRouteCache()
            this.submitted = true
            this.$root.hideLoadingStatus()

            // 保存名片信息
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

            if (!cardsPromise) return

            cardsPromise.then((res, res2) => {
              if (_.isArray(res)) {
                this.$root.updateUser(Object.assign({}, this.user, res[0].json().user, res[1].json().user))
              } else {
                this.$root.updateUser(Object.assign({}, this.user, res.json().user))
              }

              this.$root.showAlert({
                content: 'PANO微信小秘书将在2个工作日内为您精准推荐',
                onHide: function() {
                  this.$router.go({
                    path: this.submitRedirect.replace(/(\?|&){1}_r=\d+/g, '') || '/my_seeks',
                    query: {
                      _r: Math.random().toString().slice(2)
                    }
                  })
                  this.user.wx = this.model.wx
                }.bind(this)
              })
            }).catch((res) => {
              this.$root.log({
                path: this.$route.path,
                name: '用户提交名片失败'
              })
            })
          }).catch(res => {
            this.$root.showToast(res.json().error || '抱歉，服务器繁忙！')
            this.$root.hideLoadingStatus()
          })
        }
      })
    }
  },

  data() {
    return {
      model: {
        search_whom: '',
        search_target: '',
        source: 'wx', // 默认来源
        wx: ''
      },
      submitRedirect: '', // 提交表单后的跳转路径
      submitted: false, // 确认已经提交，正常跳转离开
      headerStyle: {
        height: `${window.innerWidth * 0.39371980676328505}px` // 0.39371980676328505 是设计稿的高宽比
      },
      validator: {
        search_whom: {
          required: {
            rule: true,
            message: '请填写想要找的人'
          },
          maxlength: {
            rule: 500,
            message: '不能大于500字符'
          }
        },
        search_target: {
          required: {
            rule: true,
            message: '请填写找人需求'
          },
          maxlength: {
            rule: 500,
            message: '不能大于500字符'
          }
        },
        wx: {
          maxlength: {
            rule: 50,
            message: '请填写微信账号，2-50个字符'
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/business-card.scss';
.header {
  height: 3.94525rem; //490px
  background: url('../../assets/images/seek-someone-form-header.jpg');
  background-position: center;
  background-size: cover;
}

.head-tip {
  line-height: 1.5em;
  font-size: 0.289855rem;
  color: #adb1bc;
  padding: 0.241546rem 0.402576rem;
  margin-bottom: -0.362319rem;
}

.form-container {
  padding: 0 0.402576rem;
}

.buttons {
  padding: 0.402576rem; // 50px
}

.wx-group {
  .weui_icon_warn {
    position: absolute;
    display: none;
    /*font: 14px;*/
    right: 0;
    line-height: 0;
    top: 50%;
    transform: translateY(-50%);
    &:before {
      font-size: 0.33816425120772947rem;
    }
  }
  input.invalid.touched ~ .weui_icon_warn {
    display: block;
  }
}
</style>
