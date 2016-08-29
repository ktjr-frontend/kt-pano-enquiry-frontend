<template>
  <div class="form-container register-container">
    <validator name="validation">
      <form autocomplete="off" action="" novalidate @submit.prevent="onSubmit($event)">
        <input type="password" class="dn" name="password" />
        <div class="form-group" v-for="field in fields">
          <div class="input" v-validate-class v-kt-toggle-onfucusblur child="input" toggle-class="focus" :class="{'not-empty': !!user[field.name]}">
            <i class="icon-pano" :class="field.iconName"></i>
            <input autocomplete="off" @input="validate(field.name)" initial="off" detect-change="off" detect-blur="off" :type="field.type" v-model="user[field.name]" :name="field.name" :placeholder="field.placeholder" :field="field.name" v-validate="field.validate">
            <div class="status">
              <i class="weui_icon weui_icon_clear" @click="clearField(field.name)"></i>
              <i class="weui_icon weui_icon_warn" @click="showError(field.name)"></i>
              <i class="weui_icon weui_icon_success"></i>
            </div>
          </div>
          <div class="input-comment" v-if="field.comment" v-cloak>{{field.comment}}</div>
        </div>

        <div class="form-group">
          <button @click="$root.log({name: '提交'})">提交</button>
        </div>

      </form>
    </validator>
  </div>
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
          pattern: {
            rule: '/^(?=.*\\d)(?=.*[a-z]).{6,20}$/',
            message: '不能小于6个字符，需包含字母和数字'
          }
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
