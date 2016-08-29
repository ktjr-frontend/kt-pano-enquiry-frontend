<template src="../_parts/cell-form-template.html"></template>

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

  methods: {
    getCaptcha() {
      this.startCountDown()
      this.$root.log({
        name: '短信获取'
      })

      accounts.get({
        content: 'prev_captcha',
        channel: 'sms',
        mobile: this.user.mobile
      }, (res) => {
      }).catch((res) => {
        this.$root.showToast({
          text: res.json().error || '获取失败'
        })
        this.resetCountDown()
      })
    },
    onSubmit() {
      this.$validate(true, () => {
        if (this.$validation.invalid) {
          this.showFirstError()
        } else {
          this.$root.showLoadingStatus()

          accounts.udpate({
            content: 'validate_prev_captcha'
          }, {
            ...this.filter
          }).then(() => {
            this.$root.hideLoadingStatus()

            this.$root.showToast({
              text: '密码修改成功',
              type: 'text'
            })

            this.$router.go({
              name: 'settings'
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
    let user = {
      captcha: ''
    }

    return {
      buttonText: '完成',
      // buttonComment: '',
      visible: {},
      filter: user,
      fields: [{
        name: '',
        group: 'group1',
        key: 'captcha',
        placeholder: '请输入验证码',
        type: 'input',
        subType: 'text',
        iconName: 'icon-user',
        validate: {
          required: {
            rule: true,
            message: '请输入验证码'
          },
          pattern: {
            rule: '/^\\d{4}$/',
            message: '验证码错误'
          }
        }
      }]
    }
  }
}
</script>
