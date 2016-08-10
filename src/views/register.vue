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
              <button :disabled="captchaCountdown.show" v-if="field.name === 'captcha'" class="inset-button" @click.prevent="getCaptcha()">
                <span>{{captchaCountdown.text}}</span>
                <countdown v-show="captchaCountdown.show" :start="captchaCountdown.start" :time.sync="captchaCountdown.time" @on-finish="resetCountDown()"></countdown>
              </button>
              <i class="weui_icon weui_icon_clear" @click="clearField(field.name)"></i>
              <i class="weui_icon weui_icon_warn" @click="showError(field.name)"></i>
              <i class="weui_icon weui_icon_success"></i>
            </div>
          </div>
        </div>

        <!--<div class="form-group">
          <button @click.prevent="assetTypes.show = true" class="btn-left-right cell">
            <span class="left">关注金融资产类型</span>
            <span class="right">
              <span v-show="user.likes.length">{{'已选（' + user.likes.length + '）'}}</span>
            <i class="weui_icon weui_icon_warn" v-show="$validation.likes.invalid"></i>
            <i class="weui_cell_ft with_arrow"></i>
            </span>
          </button>
          <!~~ 金融资产类型 ~~>
          <popup :show.sync="assetTypes.show">
            <div class="popup">
              <div class="head">
                <h3 class="title">金融资产类型</h3>
              </div>
              <div class="body">
                <div class="form-group clfix">
                  <div class="checkbox-label" v-for="assetType in assetTypes.list">
                    <input @change="validate('likes')" initial="off" detect-change="off" detect-blur="off" v-model="user.likes" :value="assetType.value" :id="'as_' + assetType.value" v-validate:likes="assetTypes.validate" type="checkbox">
                    <label :for="'as_' + assetType.value">{{assetType.name}}</label>
                  </div>
                </div>
              </div>
            </div>
          </popup>
        </div>-->

        <div class="form-group">
          <button @click="$parent.log({name: '立即注册'})">立即注册</button>
        </div>

        <flexbox>
          <flexbox-item>
            <div class="text-right">
              已有账号？<em><a v-link="{name: 'login'}" @click="$parent.log({name: '请登录'})">请登录</a></em>
            </div>
          </flexbox-item>
        </flexbox>

      </form>
    </validator>
  </div>
</template>

<script>
import Vue from 'vue'
import Alert from 'vux-components/alert'
import Flexbox from 'vux-components/flexbox'
import FlexboxItem from 'vux-components/flexbox-item'
import Toast from 'vux-components/toast'
import Popup from 'vux-components/popup'
import Countdown from 'vux-components/countdown'
import formMixin from '../mixins/form-mixin'
import {
  sessions,
  registrations
} from '../common/resources'

export default {
  mixins: [formMixin],
  components: {
    Alert,
    Flexbox,
    FlexboxItem,
    Toast,
    Countdown,
    Popup
  },
  methods: {
    startCountDown() {
      this.captchaCountdown.show = true
      this.captchaCountdown.start = true
      this.captchaCountdown.text = '等待'
    },

    resetCountDown() {
      this.captchaCountdown.time = 59
      this.captchaCountdown.show = false
      this.captchaCountdown.start = false
      this.captchaCountdown.text = '短信获取'
    },

    getCaptcha() {
      this.$parent.log({
        name: '短信获取'
      })
      this.$validate('mobile', () => {
        if (this.$validation.mobile.invalid) {
          this.$parent.showToast({
            text: '请正确输入11位手机号码'
          })
        } else {
          this.startCountDown()
          registrations.get({
            content: 'captcha',
            mobile: this.user.mobile,
            channel: 'sms'
          }).catch((res) => {
            this.$parent.showToast({
              text: res.json().error || '获取失败'
            })
            this.resetCountDown()
          })
        }
      })
    },
    onRegisterSuccess() {
      sessions.save({
        mobile: this.user.mobile,
        password: this.user.password
      }).then((res) => {
        let user = res.json().account
        this.$parent.updateUser(user)

        this.$router.go({
          name: 'enquiry'
        })
      })
    },
    onSubmit() {
      this.$validate(true, () => {
        if (this.$validation.invalid) {
          this.showFirstError()
          // this.$parent.showToast({
          //   text: '内容有误'
          // })
        } else {
          this.$parent.showLoadingStatus()
          registrations.save({
            content: 'simplify'
          }, this.user).then(() => {
            sessions.save(this.user).then((res) => {
              let token = window.localStorage.token = res.json().token
              Vue.http.headers.common['Authorization'] = token

              sessions.get().then((res) => {
                this.$parent.hideLoadingStatus()
                let user = res.json().account
                this.$parent.updateUser(user)
                this.$router.go({
                  name: 'perfect'
                })
              })
            }, (res) => {
              this.$parent.hideLoadingStatus()
              this.$parent.showToast({
                text: res.json().error || '抱歉，注册失败！'
              })
            })
          }, (res) => {
            this.$parent.hideLoadingStatus()
            this.$parent.showToast({
              text: res.json().error || '抱歉，注册失败！'
            })
          })
        }
      })
    }
  },
  /* watch: {
    'assetTypes.show': function(newValue) {
      console.log(newValue)
    }
  },*/
  data() {
    return {
      user: {
        // name: '',
        // company: '',
        // email: '',
        mobile: '',
        captcha: '',
        // likes: [],
        password: ''
      },
      captchaCountdown: {
        text: '短信获取',
        show: false,
        time: 59,
        start: false
      },
      /*assetTypes: {
        show: false,
        validate: {
          required: true
        },
        // checkedList: [],
        list: [{
          name: '票 据',
          value: 0
        }, {
          name: '房地产债权',
          value: 1
        }, {
          name: '政府平台债权',
          value: 2
        }, {
          name: '上市公司债权',
          value: 3
        }, {
          name: '信 托',
          value: 4
        }, {
          name: '银行理财',
          value: 5
        }, {
          name: '券商资管',
          value: 6
        }, {
          name: '保险资管',
          value: 7
        }, {
          name: '应收账款',
          value: 8
        }, {
          name: '小微贷',
          value: 9
        }, {
          name: '其 他',
          value: 10
        }]
      },*/

      fields: [
        /*{ name: 'name', placeholder: '您的真实姓名（提交后不可修改）', type: 'text', iconName: 'icon-user', validate: { required: true, maxlength: 30 } }, { name: 'company', placeholder: '您的公司名称', type: 'text', iconName: 'icon-user', validate: { required: true, maxlength: 30 } }, { name: 'email', placeholder: '您的邮箱', type: 'text', iconName: 'icon-user', validate: { required: true, email: true, maxlength: 60 } },*/
        {
          name: 'mobile',
          placeholder: '您的手机号码',
          type: 'text',
          iconName: 'icon-user',
          validate: {
            required: true,
            mobile: true
          }
        }, {
          name: 'captcha',
          placeholder: '请输入验证码',
          type: 'text',
          iconName: 'icon-user',
          validate: {
            required: true,
            pattern: {
              rule: '/^\\d{4}$/',
              message: '验证码错误'
            }
          }
        }, {
          name: 'password',
          placeholder: '请输入密码（6~20位，包含字母和数字）',
          type: 'password',
          iconName: 'icon-lock',
          validate: {
            pattern: {
              rule: '/^(?=.*\\d)(?=.*[a-z]).{6,20}$/',
              message: '不能小于6个字符，需包含字母和数字'
            }
          }
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
</style>
