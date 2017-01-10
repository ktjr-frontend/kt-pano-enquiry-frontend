<template src="../_parts/cell-form-template.jade" lang="jade"></template>

<script>
import Countdown from 'vux-components/countdown'
import cellFormMixin from '../../mixins/cell-form-mixin'
import captchaMixin from '../../mixins/captcha-mixin'
import {
  user
} from '../../vuex/getters'
import {
  accounts
} from '../../common/resources'

export default {
  mixins: [cellFormMixin, captchaMixin],

  vuex: {
    getters: {
      user
    }
  },

  components: {
    Countdown
  },

  ready() {
    this.refreshImgCaptcha()
  },

  methods: {
    // 获取短信验证码
    getCaptcha() {
      // 先校验图形验证码
      this.$validate('img_captcha', () => {
        if (!this.$validation.img_captcha.invalid) {
          this.startCountDown()
          this.$root.log({
            name: '短信获取'
          })

          accounts.get({
            content: 'prev_captcha',
            channel: 'sms',
            mobile: this.user.mobile,
            ...this.filter
          }).catch((res) => {
            this.$root.showToast({
              text: res.json().error || '获取失败'
            })
            this.resetCountDown()
            this.refreshImgCaptcha()
          })
        } else {
          this.$root.showToast(this.$validation.img_captcha.errors[0].message)
        }
      })
    },

    onSubmit() {
      this.$validate(true, () => {
        if (this.$validation.invalid) {
          this.showFirstError()
        } else {
          this.$root.showLoadingStatus()

          accounts.update({
            content: 'validate_prev_captcha'
          }, {
            ...this.filter
          }).then(() => {
            this.$root.hideLoadingStatus()

            this.$router.go({
              name: 'changeMobile2'
            })
          }, (res) => {
            this.$root.hideLoadingStatus()
            this.$root.showToast({
              text: res.json().error || '抱歉，服务器繁忙！'
            })
          })
        }
      })
    }
  },

  data() {
    let model = {
      img_captcha_key: '',
      img_captcha: '',
      captcha: ''
    }

    return {
      buttonText: '下一步',
      // buttonComment: '',
      visible: {},
      filter: model,
      fields: [{
        name: '',
        group: 'group1',
        key: 'img_captcha',
        placeholder: '请输入图形验证码',
        type: 'input',
        subType: 'text',
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
        name: '',
        group: 'group1',
        key: 'captcha',
        placeholder: '请输入短信验证码',
        type: 'input',
        subType: 'number',
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
      }]
    }
  }
}
</script>
