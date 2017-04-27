<template lang="jade">
.form-container.register-container
  small.tips 为方便后期实名认证，请使用与名片信息一致的手机号。
  validator(name='validation')
    form(autocomplete='off', action='', novalidate='', @submit.prevent='onSubmit($event)')
      input.dn(type='password', name='password')
      .form-group(v-for='field in fields')
        .input(v-validate-class='', v-kt-toggle-onfucusblur='', child='input', toggle-class='focus', :class="{'not-empty': !!user[field.name]}")
          i.icon-pano(:class='field.iconName')
          input(autocomplete='off', @input='validate(field.name)', initial='off', detect-change='off', detect-blur='off', :type='field.type', v-model='user[field.name]', :name='field.name', :placeholder='field.placeholder', :field='field.name', v-validate='field.validate')
          .status
            //- 图形验证码
            img.img-captcha(:src='img_captcha_url', v-if="field.name === 'img_captcha'", @click.prevent='refreshImgCaptcha()')
            //- 短信验证码
            button.inset-button(:disabled='captchaCountdown.show', v-if="field.name === 'captcha'", @click.prevent='getCaptcha()')
              span(v-cloak='') {{captchaCountdown.text}}
              countdown(v-show='captchaCountdown.show', :start='captchaCountdown.start', :time.sync='captchaCountdown.time', @on-finish='resetCountDown()')
            i.weui_icon.weui_icon_clear(v-touch:tap='clearField(field.name)')
            i.weui_icon.weui_icon_warn(v-touch:tap='showError(field.name)')
            //- i.weui_icon.weui_icon_success
        .input-comment(v-if='field.comment', v-cloak='') {{field.comment}}
      .form-group
        .weui_cells.weui_cells_checkbox
          label.weui_cell.weui_check_label(for='agreement')
            .weui_cell_hd
              input#agreement.weui_check(type='checkbox', v-model='user.agreement', v-validate:agreement="{required:{rule: true, message: '请确认阅读开通PANO用户服务协议'}}")
              i.weui_icon_checked
            .weui_cell_bd.weui_cell_primary
              p
                | 我已仔细阅读并同意
                em
                  a(href='/static/pano-agreement.htm', target='_blank' @click.prevent="checkAgreement()") 开通PANO用户协议


      //-
        <div class="form-group">
        <button @click.prevent="assetTypes.show = true" class="btn-left-right cell">
        <span class="left">关注金融资产类型</span>
        <span class="right">
        <span v-show="user.likes.length">{{'已选（' + user.likes.length + '）'}}</span>
        <i class="weui_icon weui_icon_warn" v-show="$validation.likes.invalid"></i>
        <i class="weui_cell_ft with_arrow"></i>
        </span>
        </button>
        <!~~ 金融资产类型 ~~>
        <popup :show.sync="assetTypes.show">
        <div class="popup">
        <div class="head">
        <h3 class="title">金融资产类型</h3>
        </div>
        <div class="body">
        <div class="form-group clfix">
        <div class="checkbox-label" v-for="assetType in assetTypes.list">
        <input @change="validate('likes')" initial="off" detect-change="off" detect-blur="off" v-model="user.likes" :value="assetType.value" :id="'as_' + assetType.value" v-validate:likes="assetTypes.validate" type="checkbox">
        <label :for="'as_' + assetType.value">{{assetType.name}}</label>
        </div>
        </div>
        </div>
        </div>
        </popup>
        </div>
      .form-group
        button(@click="$root.bdTrack(['注册页', '点击', '下一步'])") 下一步
      flexbox
        flexbox-item
          .text-right
            | 已有账号？
            em
              a(v-link="{name: 'login'}", @click="$root.bdTrack(['注册页', '点击', '请登录'])") 请登录

</template>

<script>
import Vue from 'vue'
import Flexbox from 'vux-components/flexbox'
import FlexboxItem from 'vux-components/flexbox-item'
import Popup from 'vux-components/popup'
import Countdown from 'vux-components/countdown'
import formMixin from '../mixins/form-mixin'
import captchaMixin from '../mixins/captcha-mixin'
import {
  sessions,
  registrations
} from '../common/resources'

export default {
  mixins: [formMixin, captchaMixin],

  components: {
    Flexbox,
    FlexboxItem,
    Countdown,
    Popup
  },

  ready() {
    this.refreshImgCaptcha()
    this.user.inviter_account_id = this.$route.query._u || null
  },

  methods: {
    // 用户协议
    checkAgreement() {
      this.$root.log({
        name: '开通PANO用户协议'
      })

      window.sessionStorage.registerUserCache = JSON.stringify(this.user)
      window.open('/static/pano-agreement.htm', '_blank')
    },

    // 获取短信验证码
    getCaptcha() {
      this.$root.bdTrack(['注册页', '点击', this.captchaCountdown.text])
      this.$validate('mobile', () => {
        if (this.$validation.mobile.invalid) {
          this.$root.showToast({
            text: this.$validation.mobile.errors[0].message
          })
        } else {
          this.$validate('img_captcha', () => {
            if (this.$validation.img_captcha.invalid) { // 验证图形验证码
              this.$root.showToast(this.$validation.img_captcha.errors[0].message)
            } else {
              this.$root.log({
                name: '短信获取'
              })
              this.startCountDown()

              registrations.get({
                content: 'captcha',
                img_captcha: this.user.img_captcha,
                mobile: this.user.mobile,
                ...this.filter,
                channel: 'sms'
              }).catch((res) => {
                this.$root.showToast({
                  text: res.json().error || '获取失败'
                })
                this.refreshImgCaptcha()
                this.resetCountDown()
              })
            }
          })
        }
      })
    },
    /*onRegisterSuccess() {
      sessions.save({
        mobile: this.user.mobile,
        password: this.user.password
      }).then((res) => {
        let user = res.json().account
        this.$root.updateUser(user)

        this.$router.go({
          name: 'enquiry'
        })
      })
    },*/
    onSubmit() {
      this.$validate(true, () => {
        if (this.$validation.invalid) {
          this.showFirstError()
        } else {
          this.$root.showLoadingStatus()
          registrations.save({
            content: 'simplify'
          }, this.user).then(() => {
            return sessions.save(this.user)
          }).then((res) => {
            let token = window.localStorage.token = res.json().token
            Vue.http.headers.common['Authorization'] = token

            sessions.get().then((res) => {
              this.$root.hideLoadingStatus()
              let user = res.json().account
              this.$root.updateUser(user)
              this.$router.go({
                name: 'perfect'
              })
            })
          }).catch((res) => {
            this.$root.hideLoadingStatus()
            this.$root.showToast({
              text: res.json().error || '抱歉，注册失败！'
            })
          })
        }
      })
    }
  },

  data() {
    let cachedUser = JSON.parse(window.sessionStorage.registerUserCache || '{}')
    return {
      filter: {
        // img_captcha: '',
        img_captcha_key: ''
      },
      user: Object.assign({
        agreement: true,
        mobile: '',
        captcha: '',
        introducer: '',
        img_captcha: '',
        inviter_account_id: null,
        // likes: [],
        password: ''
      }, cachedUser),

      /*assetTypes: {
        show: false,
        validate: {
          required: {
            rule: true,
            message: '请选择您关注的资产类型'
          }
        },
        // checkedList: [],
        list: [{
          name: '票 据',
          value: 0
        }, {
          name: '房地产债权',
          value: 1
        }, {
          name: '政府平台债权',
          value: 2
        }, {
          name: '上市公司债权',
          value: 3
        }, {
          name: '信 托',
          value: 4
        }, {
          name: '银行理财',
          value: 5
        }, {
          name: '券商资管',
          value: 6
        }, {
          name: '保险资管',
          value: 7
        }, {
          name: '应收账款',
          value: 8
        }, {
          name: '小微贷',
          value: 9
        }, {
          name: '其 他',
          value: 10
        }]
      },*/

      fields: [
        /*{ name: 'name', placeholder: '您的真实姓名（提交后不可修改）', type: 'text', iconName: 'icon-user', validate: { required: true, maxlength: 30 } }, { name: 'company', placeholder: '您的公司名称', type: 'text', iconName: 'icon-user', validate: { required: true, maxlength: 30 } }, { name: 'email', placeholder: '您的邮箱', type: 'text', iconName: 'icon-user', validate: { required: true, email: true, maxlength: 60 } },*/
        {
          name: 'mobile',
          placeholder: '请输入手机号',
          type: 'number',
          comment: '',
          iconName: 'icon-user',
          validate: {
            required: {
              rule: true,
              message: '请正确输入11位手机号码'
            },
            mobile: true
          }
        }, {
          name: 'email',
          placeholder: '请输入邮箱（选填）可获取数据周报',
          type: 'text',
          comment: '',
          iconName: 'icon-user',
          validate: {
            // required: {
            //   rule: true,
            //   message: '请正确输入11位手机号码'
            // },
            pattern: {
              rule: '/^([^@]+@.+|)$/',
              message: '邮箱地址有误'
            }
          }
        }, {
          name: 'img_captcha',
          placeholder: '请输入图形验证码',
          type: 'text',
          iconName: 'icon-user',
          validate: {
            required: {
              rule: true,
              message: '请输入图形验证码'
            },
            pattern: {
              rule: '/^[A-Za-z0-9]{4}$/',
              message: '图形验证码错误'
            }
          }
        }, {
          name: 'captcha',
          placeholder: '请输入短信验证码',
          type: 'number',
          iconName: 'icon-user',
          validate: {
            required: {
              rule: true,
              message: '请输入短信验证码'
            },
            pattern: {
              rule: '/^\\d{4}$/',
              message: '短信验证码错误'
            }
          }
        }, {
          name: 'password',
          placeholder: '请输入密码（6~20位，包含字母和数字）',
          type: 'password',
          iconName: 'icon-lock',
          validate: {
            password: true
          }
        }
        /*, {
          name: 'introducer',
          placeholder: '邀请人（非必填）',
          type: 'text',
          iconName: 'icon-lock',
          validate: {
            maxlength: 50
          }
        }*/
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.weui_cells {
  background: none;
  overflow: initial;
  .weui_cell.weui_check_label {
    padding-left: 0;
    p {
      font-size: 0.289855rem;
    }
    a {
      pointer-events: initial;
    }
    .weui_check:checked+.weui_icon_checked {
      &:before {
        color: #737e9c;
      }
    }
    .weui_icon_checked {
      &:before {
        font-size: 1em;
        color: #c9cdd5;
      }
    }
  }
  &:after,
  &:before {
    display: none;
  }
}
</style>
