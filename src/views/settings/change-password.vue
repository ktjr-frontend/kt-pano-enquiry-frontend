<template src="../_parts/cell-form-template.html"></template>

<script>
import cellFormMixin from '../../mixins/cell-form-mixin'
import {
  accounts
} from '../../common/resources'

export default {
  mixins: [cellFormMixin],

  methods: {
    onSubmit() {
      this.$validate(true, () => {
        if (this.$validation.invalid) {
          this.showFirstError()
        } else {
          this.$root.showLoadingStatus()

          accounts.update({
            content: 'password'
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
      old_password: '',
      password: '',
      password_confirmation: ''
    }

    return {
      buttonText: '完成',
      // buttonComment: '',
      visible: {},
      filter: user,
      fields: [{
        name: '',
        group: 'group1',
        key: 'old_password',
        placeholder: '输入当前密码',
        type: 'input',
        subType: 'password',
        iconName: 'icon-user',
        validate: {
          required: {
            rule: true,
            message: '请输入您的当前密码'
          }
        }
      }, {
        name: '',
        group: 'group2',
        key: 'password',
        placeholder: '新密码（6~20位，包含字母和数字）',
        type: 'input',
        subType: 'password',
        iconName: 'icon-user',
        validate: {
          required: true,
          pattern: {
            rule: '/^(?=.*\\d)(?=.*[a-z]).{6,20}$/',
            message: '不能小于6个字符，需包含字母和数字'
          }
        }
      }, {
        name: '',
        group: 'group2',
        key: 'password_confirmation',
        placeholder: '请再次输入密码',
        type: 'input',
        subType: 'password',
        iconName: 'icon-user',
        validate: {
          required: true,
          equal: {
            rule: 'filter.password',
            message: '两次输入的密码不相同'
          }
        }
      }]
    }
  }
}
</script>
