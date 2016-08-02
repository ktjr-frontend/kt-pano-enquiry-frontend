<template>
  <div class="form-container">
    <validator name="loginValidation">
      <form action="" novalidate @submit.prevent="onSubmit($event)">

        <div class="form-group" v-for="field in fields">
          <div class="input input-withicon" v-validate-class :class="{'not-empty': !!user[field.name]}">
            <i class="icon-pano" :class="field.iconName"></i>
            <input autocomplete="off" initial="off" @input="validate(field.name)" detect-change="off" detect-blur="off" :type="field.type" v-model="user[field.name]" :name="field.name" :placeholder="field.placeholder" :field="field.name" v-validate="field.validate">
            <div class="status">
              <i class="weui_icon weui_icon_clear" v-touch:tap="clearField(field.name)"></i>
              <i class="weui_icon weui_icon_warn" v-touch:tap="showError(field.name)"></i>
              <!-- <i class="weui_icon weui_icon_success"></i> -->
            </div>
          </div>
        </div>

        <div class="form-group">
          <button type="submit">登录</button>
        </div>

        <flexbox>
          <flexbox-item>
            <div class="text-left">
              没有账号？<em><a v-link="{name: 'register'}">立即注册</a></em>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="text-right">
              <a @click.prevent="forgetPassword()">忘记密码？</a>
            </div>
          </flexbox-item>
        </flexbox>
      </form>

    </validator>
  </div>

</template>

<script>
import Flexbox from 'vux-components/flexbox'
import FlexboxItem from 'vux-components/flexbox-item'
import Vue from 'vue'
import {
  sessions
} from '../common/resources'
import {
  updateUser,
  showAlert,
  showToast,
  showLoadingStatus,
  hideLoadingStatus
} from '../vuex/actions'

export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  vuex: {
    actions: {
      updateUser,
      showAlert,
      showToast,
      showLoadingStatus,
      hideLoadingStatus
    }
  },
  methods: {
    clearField(name) {
      this.user[name] = ''
    },
    forgetPassword() {
      let weixin = require('../assets/images/weixin.jpg')
      let content = `<p style="text-align:center;">如忘记密码，请联系我们的微信小秘书：</p>
                  <p><img src="${weixin}" width="100%" /></p>`
      this.showAlert({
        content: content
      })
    },
    showError(name) {
      this.showToast({
        text: this.$loginValidation.errors.find((e) => e.field === name).message
      })
    },
    validate(name) {
      if (this.$loginValidation[name].invalid && this.$loginValidation[name].touched) {
        this.$validate(name)
      }
    },
    onSubmit() {
      this.$validate(true, () => {
        if (this.$loginValidation.invalid) {
          this.showToast({
            text: '内容有误'
          })
        } else {
          this.showLoadingStatus()
          sessions.save(this.user).then((res) => {
            let token = window.localStorage.token = res.json().token
            Vue.http.headers.common['Authorization'] = token

            // 获取用户信息
            sessions.get().then((res) => {
              this.hideLoadingStatus()
              let user = res.json().account
              this.updateUser(user)
              this.$router.go({
                name: 'enquiry'
              })
            })
          }, (res) => {
            this.hideLoadingStatus()
            this.showToast({
              text: res.json().error || '登录失败'
            })
          })
        }
      })
    }
  },
  data() {
    return {
      user: {
        mobile: '',
        password: ''
      },
      fields: [{
        name: 'mobile',
        placeholder: '请输入用户名（手机号码）',
        type: 'text',
        iconName: 'icon-man-solid',
        validate: {
          required: true,
          mobile: true
        }
      }, {
        name: 'password',
        placeholder: '请输入密码',
        type: 'password',
        iconName: 'icon-lock-solid',
        validate: {
          required: true
        }
      }]
    }
  }
}
</script>

<style lang="scss">
</style>
