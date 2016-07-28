<template>
  <div class="form-container">
    <validator name="loginValidation">
      <form action="" novalidate @submit="onSubmit($event)">

        <div class="form-group" v-for="field in fields">
          <div class="input input-withicon" v-validate-class :class="{'not-empty': !!user[field.name]}">
            <i class="icon-enquiry" :class="field.iconName"></i>
            <input initial="off" @input="validate(field.name)" detect-change="off" detect-blur="off" :type="field.type" v-model="user[field.name]" :name="field.name" :placeholder="field.placeholder" :field="field.name" v-validate="field.validate">
            <div class="status">
              <i class="weui_icon weui_icon_clear" @click="clearField(field.name)"></i>
              <i class="weui_icon weui_icon_warn" @click="showError(field.name)"></i>
              <i class="weui_icon weui_icon_success"></i>
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
              <a @click.prevent="alert.forgetPassword = true">忘记密码？</a>
            </div>
          </flexbox-item>
        </flexbox>
      </form>

      <toast :show.sync="toast.show" :time="toast.time" :type="toast.type">{{toast.text}}</toast>
    </validator>
  </div>
  <!-- 忘记密码提示 -->
  <alert :show.sync="alert.forgetPassword" title="提示" button-text="知道了">
    <p style="text-align:center;">如忘记密码，请联系我们的微信小秘书：</p>
    <p><img src="../assets/images/weixin.jpg" width="100%" /></p>
  </alert>

</template>

<script>
import Alert from 'vux-components/alert'
import Flexbox from 'vux-components/flexbox'
import FlexboxItem from 'vux-components/flexbox-item'
import Toast from 'vux-components/toast'
import Vue from 'vue'
import {
  users
} from '../common/resources'
import {
  updateUser
} from '../vuex/actions'

export default {
  components: {
    Alert,
    Flexbox,
    FlexboxItem,
    Toast
  },
  vuex: {
    actions: {
      updateUser
    }
  },
  methods: {
    clearField(name) {
      this.user[name] = ''
    },
    showError(name) {
      this.toast.text = this.$loginValidation.errors.find((e) => e.field === name).message
      this.toast.show = true
    },
    validate: function(name) {
      if (this.$loginValidation[name].invalid && this.$loginValidation[name].touched) {
        this.$validate(name)
      }
    },
    onSubmit(event) {
      event.preventDefault()
      this.$validate(true, () => {
        if (this.$loginValidation.invalid) {
          this.toast.text = '内容有误'
          this.toast.show = true
        } else {
          users.save(this.user).then((res) => {
            let token = window.localStorage.token = res.json().token
            Vue.http.headers.common['Authorization'] = token

            // 获取用户信息
            users.get().then((res) => {
              console.log(res.json().account)
              this.updateUser(res.json().account)

              this.$router.go({
                name: 'enquiry'
              })
            })
          }, (res) => {
            this.toast.text = res.json().error || '登录失败'
            this.toast.show = true
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
      toast: {
        time: 1000,
        type: 'warn',
        text: '内容有误',
        show: false
      },
      alert: {
        forgetPassword: false
      },
      fields: [{
        name: 'mobile',
        placeholder: '请输入用户名（手机号码）',
        type: 'text',
        iconName: 'icon-user',
        validate: {
          required: true,
          mobile: true
        }
      }, {
        name: 'password',
        placeholder: '请输入密码',
        type: 'password',
        iconName: 'icon-lock',
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
