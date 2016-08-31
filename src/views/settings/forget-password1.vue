<template>
  <div class="form-container register-container">
    <validator name="validation">
      <form autocomplete="off" action="" novalidate @submit.prevent="onSubmit($event)">
        <!-- <input type="password" class="dn" name="password" /> -->
        <div class="form-group" v-for="field in fields">
          <div class="input" v-validate-class v-kt-toggle-onfucusblur child="input" toggle-class="focus" :class="{'not-empty': !!user[field.name]}">
            <i class="icon-pano" :class="field.iconName"></i>
            <input autocomplete="off" @input="validate(field.name)" initial="off" detect-change="off" detect-blur="off" :type="field.type" v-model="user[field.name]" :name="field.name" :placeholder="field.placeholder" :field="field.name" v-validate="field.validate">
            <div class="status">
              <button :disabled="captchaCountdown.show" v-if="field.name === 'captcha'" class="inset-button" @click.prevent="getCaptcha()">
                <span v-cloak>{{captchaCountdown.text}}</span>
                <countdown v-show="captchaCountdown.show" :start="captchaCountdown.start" :time.sync="captchaCountdown.time" @on-finish="resetCountDown()"></countdown>
              </button>
              <i class="weui_icon weui_icon_clear" v-touch:tap="clearField(field.name)"></i>
              <i class="weui_icon weui_icon_warn" v-touch:tap="showError(field.name)"></i>
              <i class="weui_icon weui_icon_success"></i>
            </div>
          </div>
          <div class="input-comment" v-if="field.comment" v-cloak>{{field.comment}}</div>
        </div>

        <div class="form-group">
          <button @click="$root.log({name: '下一步'})">下一步</button>
        </div>

      </form>
    </validator>
  </div>
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

  methods: {
    getCaptcha() {
      this.$root.log({
        name: '短信获取'
      })

      this.$validate('mobile', () => {
        if (this.$validation.mobile.invalid) {
          this.$root.showToast({
            text: '请正确输入11位手机号码'
          })
        } else {
          this.startCountDown()
          recoveries.get({
            content: 'captcha',
            mobile: this.user.mobile,
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
          recoveries.update({
            content: 'validate_captcha'
          }, this.user).then(() => {
            this.$root.hideLoadingStatus()
            this.$router.go({
              name: 'forgetPassword2',
              query: {
                mobile: this.user.mobile
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
      user: {
        mobile: this.$route.query.mobile || '',
        captcha: ''
      },

      fields: [{
        name: 'mobile',
        placeholder: '您的手机号码',
        type: 'number',
        // comment: '为方便后期实名认证，请使用与名片信息一致的手机号。',
        iconName: 'icon-user',
        validate: {
          required: true,
          mobile: true
        }
      }, {
        name: 'captcha',
        placeholder: '请输入验证码',
        type: 'number',
        iconName: 'icon-user',
        validate: {
          required: true,
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
