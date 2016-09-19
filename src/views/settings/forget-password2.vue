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
            i.weui_icon.weui_icon_clear(v-touch:tap='clearField(field.name)')
            i.weui_icon.weui_icon_warn(v-touch:tap='showError(field.name)')
            i.weui_icon.weui_icon_success
        .input-comment(v-if='field.comment', v-cloak='') {{field.comment}}
      .form-group
        button(@click="$root.log({name: '提交'})") 提交
</template>

<script>
import formMixin from '../../mixins/form-mixin'
import {
  recoveries
} from '../../common/resources'

export default {
  mixins: [formMixin],

  methods: {
    onSubmit() {
      this.$validate(true, () => {
        if (this.$validation.invalid) {
          this.showFirstError()
        } else {
          this.$root.showLoadingStatus()
          recoveries.update({}, {
            ...this.user,
            mobile: this.$route.query.mobile
          }).then(() => {
            this.$root.hideLoadingStatus()

            this.$root.showToast({
              text: '密码修改成功',
              type: 'text'
            })

            this.$router.go({
              name: 'login'
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
    let user = {
      password: '',
      password_confirmation: ''
    }

    return {
      user: user,

      fields: [{
        name: 'password',
        placeholder: '请输入密码（6~20位，包含字母和数字）',
        type: 'password',
        iconName: 'icon-user',
        validate: {
          required: true,
          password: true
        }
      }, {
        name: 'password_confirmation',
        placeholder: '请再次输入密码',
        type: 'password',
        iconName: 'icon-user',
        validate: {
          required: true,
          equal: {
            rule: 'user.password',
            message: '两次输入的密码不相同'
          }
        }
      }]
    }
  }
}
</script>
