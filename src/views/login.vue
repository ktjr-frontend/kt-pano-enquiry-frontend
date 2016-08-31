<template>
  <div class="form-container">
    <validator name="validation">
      <form action="" novalidate @submit.prevent="onSubmit($event)">

        <div class="form-group" v-for="field in fields">
          <div class="input input-withicon" v-validate-class v-kt-toggle-onfucusblur child="input" toggle-class="focus" :class="{'not-empty': !!user[field.name]}">
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
          <button type="submit" @click="$root.log({name: '登录'})">登录</button>
        </div>

        <flexbox>
          <flexbox-item>
            <div class="text-left">
              没有账号？<em><a v-link="{name: 'register'}" @click="$root.log({name: '立即注册'})">立即注册</a></em>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="text-right">
              <a v-link="{name: 'forgetPassword1', query:{mobile: user.mobile}}" @click="$root.log({name: '忘记密码'})">忘记密码？</a>
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
import formMixin from '../mixins/form-mixin'
import {
  sessions
} from '../common/resources'

export default {
  mixins: [formMixin],
  components: {
    Flexbox,
    FlexboxItem
  },
  methods: {
    /*forgetPassword() {
      let weixin = require('../assets/images/weixin.jpg')
      let content = `<p style="text-align:center;">您可发送邮件至<em>HelloPANO@ktjr.com</em>或联系下方『PANO微信小秘书』</p>
                    <p><img src="${weixin}" width="60%" /></p>`

      this.$root.showAlert({
        content: content
      })

      this.$root.log({
        name: '忘记密码'
      })
    },*/
    onSubmit() {
      this.$validate(true, () => {
        if (this.$validation.invalid) {
          this.showFirstError()
        } else {
          this.$root.showLoadingStatus()
          sessions.save(this.user).then((res) => {
            let token = window.localStorage.token = res.json().token
            Vue.http.headers.common['Authorization'] = token
            this.$root.hideMessage()

            // 获取用户信息
            sessions.get().then((res) => {
              this.$root.hideLoadingStatus()
              let user = res.json().account
              this.$root.updateUser(user)
              setTimeout(() => {
                this.$router.go({
                  name: user.status === 'rejected' ? 'settings' : 'enquiry'
                })
              }, 10)
            }, (res) => {
              this.$root.showAlert({
                content: res.json().error || '抱歉，获取用户信息失败！'
              })
            })
          }, (res) => {
            this.$root.hideLoadingStatus()
            this.$root.showAlert({
              content: (() => {
                if (res.json().error.indexOf('无权限') > -1) {
                  let weixin = require('../assets/images/weixin.jpg')
                  return `<p style="text-align:center;">很抱歉，您暂无权限查看该页面。</p><p>如有问题可联系『PANO微信小秘书』</p>
                    <p><img src="${weixin}" width="60%" /></p>`
                }
                return res.json().error || '抱歉，服务器繁忙！'
              })()
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
        text: '手机号',
        placeholder: '请输入用户名（手机号码）',
        type: 'number',
        iconName: 'icon-man-solid',
        validate: {
          required: true,
          mobile: true
        }
      }, {
        name: 'password',
        text: '密码',
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
