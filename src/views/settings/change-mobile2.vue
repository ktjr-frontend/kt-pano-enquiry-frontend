<template src="../_parts/cell-form-template.jade" lang="jade"></template>

<script>
import Countdown from 'vux-components/countdown'
import cellFormMixin from '../../mixins/cell-form-mixin'
import captchaMixin from '../../mixins/captcha-mixin'
import {
  user
} from '../../vuex/getters'
import {
  accounts,
  cards
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
      this.$validate('mobile', () => {
        if (this.$validation.mobile.invalid) {
          this.$root.showToast({
            text: '请正确输入11位手机号码'
          })
        } else {
          this.$root.log({
            name: '短信获取'
          })

          this.startCountDown()
          accounts.get({
            content: 'captcha',
            mobile: this.filter.mobile,
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

    onSubmit() {
      this.$validate(true, () => {
        if (this.$validation.invalid) {
          this.showFirstError()
        } else {
          this.$root.showLoadingStatus()

          accounts.update({
            content: 'mobile'
          }, {
            ...this.filter
          }).then(() => {
            cards.update({
              content: 'confirm'
            }, {}).then((res) => {
              this.$root.hideLoadingStatus()
              this.$root.updateUser(Object.assign({}, this.user, this.filter, res.json().account))

              this.$root.showToast({
                text: '新手机号设置成功！',
                type: 'text'
              })

              this.$router.go({
                name: 'settings'
              })
            }).catch((res) => {
              this.$root.hideLoadingStatus()
              this.$root.showToast({
                text: res.json().error || '抱歉，服务器繁忙！'
              })
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
      mobile: '',
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
        key: 'mobile',
        placeholder: '请输入新手机号码',
        type: 'input',
        subType: 'number',
        iconName: 'icon-user',
        validate: {
          mobile: true,
          required: {
            rule: true,
            message: '请输入新手机号码'
          }
        }
      }, {
        name: '',
        group: 'group1',
        key: 'captcha',
        placeholder: '请输入验证码',
        type: 'input',
        subType: 'number',
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
