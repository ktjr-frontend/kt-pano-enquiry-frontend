<template lang="jade">
.form-container.register-container
  validator(name='validation')
    form(autocomplete='off', action='', novalidate='', @submit.prevent='onSubmit($event)')
      //- // <input type="password" class="dn" name="password" />
      .form-group(v-for='field in fields')
        .input(v-validate-class='', v-kt-toggle-onfucusblur='', child='input', toggle-class='focus', :class="{'not-empty': !!filter[field.name]}")
          i.icon-pano(:class='field.iconName')
          input(autocomplete='off', @input='validate(field.name)', initial='off', detect-change='off', detect-blur='off', :type='field.type', v-model='filter[field.name]', :name='field.name', :placeholder='field.placeholder', :field='field.name', v-validate='field.validate')
          .status
            //- 图形验证码
            img.img-captcha(:src='img_captcha_url', v-if="field.name === 'img_captcha'", @click.prevent='refreshImgCaptcha()')
            //- 短信验证码
            button.inset-button(:disabled='captchaCountdown.show', v-if="field.name === 'captcha'", @click.prevent='getCaptcha()')
              span(v-cloak='') {{captchaCountdown.text}}
              countdown(v-show='captchaCountdown.show', :start='captchaCountdown.start', :time.sync='captchaCountdown.time', @on-finish='resetCountDown()')
            i.weui_icon.weui_icon_clear(v-touch:tap='clearField(field.name, "filter")')
            i.weui_icon.weui_icon_warn(v-touch:tap='showError(field.name)')
            //- i.weui_icon.weui_icon_success
        .input-comment(v-if='field.comment', v-cloak='') {{field.comment}}
      .form-group
        button(@click="$root.log({name: '下一步'})") 下一步

</template>

<script>
import Countdown from 'vux-components/countdown'
import formMixin from '../../mixins/form-mixin'
import captchaMixin from '../../mixins/captcha-mixin'
import {
  recoveries
} from '../../common/resources'

export default {
  mixins: [formMixin, captchaMixin],

  components: {
    Countdown
  },

  ready() {
    this.refreshImgCaptcha()
  },

  methods: {
    // 获取短信验证码
    getCaptcha() {
      this.$validate('mobile', () => {
        if (this.$validation.mobile.invalid) { // 验证手机号
          this.$root.showToast({
            text: this.$validation.mobile.errors[0].message
          })
        } else {
          this.$validate('img_captcha', () => {
            if (this.$validation.img_captcha.invalid) { // 验证图形验证码
              this.$root.showToast(this.$validation.img_captcha.errors[0].message)
            } else {
              this.startCountDown()
              this.$root.log({
                name: '短信获取'
              })

              // 开始获取短信验证码
              recoveries.get({
                content: 'captcha',
                ...this.filter,
                channel: 'sms'
              }).catch((res) => {
                this.$root.showToast({
                  text: res.json().error || '获取失败'
                })
                this.resetCountDown()
                this.refreshImgCaptcha()
              })
            }
          })
        }
      })
    },

    onSubmit() {
      this.$validate(true, () => {
        if (this.$validation.invalid) {
          this.showFirstError()
        } else {
          this.$root.showLoadingStatus()
          recoveries.update({
            content: 'validate_captcha'
          }, this.filter).then(() => {
            this.$root.hideLoadingStatus()
            this.$router.go({
              name: 'forgetPassword2',
              query: {
                mobile: this.filter.mobile
              }
            })
          }, (res) => {
            this.$root.hideLoadingStatus()
            this.$root.showToast({
              text: res.json().error || '抱歉，验证失败！'
            })
          })
        }
      })
    }
  },

  data() {
    return {
      filter: {
        mobile: this.$route.query.mobile || '',
        img_captcha: '',
        img_captcha_key: '',
        captcha: ''
      },

      fields: [{
        name: 'mobile',
        placeholder: '您的手机号码',
        type: 'number',
        // comment: '为方便后期实名认证，请使用与名片信息一致的手机号。',
        iconName: 'icon-user',
        validate: {
          required: {
            rule: true,
            message: '请正确输入11位手机号码'
          },
          mobile: true
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
          required: true,
          pattern: {
            rule: '/^\\d{4}$/',
            message: '短信验证码错误'
          }
        }
      }]
    }
  }
}
</script>
