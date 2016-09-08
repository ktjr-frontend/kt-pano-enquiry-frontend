<template lang="jade">
.form-container.register-container
  validator(name='validation')
    form(autocomplete='off', action='', novalidate='', @submit.prevent='onSubmit($event)')
      input.dn(type='password', name='password')
      .form-group(v-for='field in fields')
        .input(v-validate-class='', v-kt-toggle-onfucusblur='', child='input', toggle-class='focus', :class="{'not-empty': !!user[field.name]}")
          i.icon-pano(:class='field.iconName')
          input(autocomplete='off', @input='validate(field.name)', initial='off', detect-change='off', detect-blur='off', :type='field.type', v-model='user[field.name]', :name='field.name', :placeholder='field.placeholder', :field='field.name', v-validate='field.validate')
          .status
            button.inset-button(:disabled='captchaCountdown.show', v-if="field.name === 'captcha'", @click.prevent='getCaptcha()')
              span(v-cloak='') {{captchaCountdown.text}}
              countdown(v-show='captchaCountdown.show', :start='captchaCountdown.start', :time.sync='captchaCountdown.time', @on-finish='resetCountDown()')
            i.weui_icon.weui_icon_clear(v-touch:tap='clearField(field.name)')
            i.weui_icon.weui_icon_warn(v-touch:tap='showError(field.name)')
            i.weui_icon.weui_icon_success
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
                  a(href='/static/pano-agreement.htm', target='_blank' @click="$root.log({name: '开通PANO用户协议'})") 开通PANO用户协议


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
        button(@click="$root.log({name: '立即注册'})") 立即注册
      flexbox
        flexbox-item
          .text-right
            | 已有账号？
            em
              a(v-link="{name: 'login'}", @click="$root.log({name: '请登录'})") 请登录

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

  methods: {
    getCaptcha() {
      this.$root.log({
        name: '短信获取'
      })
      this.$validate('mobile', () => {
        if (this.$validation.mobile.invalid) {
          this.$root.showToast({
            text: '请正确输入11位手机号码'
          })
        } else {
          this.startCountDown()
          registrations.get({
            content: 'captcha',
            mobile: this.user.mobile,
            channel: 'sms'
          }).catch((res) => {
            this.$root.showToast({
              text: res.json().error || '获取失败'
            })
            this.resetCountDown()
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
    return {
      user: {
        // name: '',
        // company: '',
        // email: '',
        agreement: true,
        mobile: '',
        captcha: '',
        introducer: '',
        // likes: [],
        password: ''
      },

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
          placeholder: '您的手机号码',
          type: 'number',
          comment: '为方便后期实名认证，请使用与名片信息一致的手机号。',
          iconName: 'icon-user',
          validate: {
            required: true,
            mobile: true
          }
        }, {
          name: 'captcha',
          placeholder: '请输入验证码',
          type: 'number',
          iconName: 'icon-user',
          validate: {
            required: true,
            pattern: {
              rule: '/^\\d{4}$/',
              message: '验证码错误'
            }
          }
        }, {
          name: 'password',
          placeholder: '请输入密码（6~20位，包含字母和数字）',
          type: 'password',
          iconName: 'icon-lock',
          validate: {
            pattern: {
              rule: '/^(?=.*\\d)(?=.*[a-z]).{6,20}$/',
              message: '不能小于6个字符，需包含字母和数字'
            }
          }
        }, {
          name: 'introducer',
          placeholder: '邀请人（非必填）',
          type: 'text',
          iconName: 'icon-lock',
          validate: {
            maxlength: 50
          }
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.weui_cells {
  background: none;
  overflow: initial;
  .weui_cell {
    padding-left: 0.563607rem;
    a {
      pointer-events: initial;
    }
  }
  &:after,
  &:before {
    display: none;
  }
}
</style>
