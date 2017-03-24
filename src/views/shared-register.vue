<template lang="jade">
.shared-register(:class="{pc: isPc}")
  header(v-show="isPc")
    .inner
      img.pc-logo(src="../assets/images/logo2.svg")
  section.header
    img.logo.flex-item(src="../assets/images/logo.svg")
    .header-desc1.flex-item 您的好友
      em {{inviter_account_name}}
      | 邀请你一起使用开通PANO
      i.strigula
    .header-desc2.flex-item 注册成功可获得30天高级会员权限
    img.slogan.flex-item(src="../assets/images/s-r-header-slogan.png")
  section.form-container.shared-register-container
    //- small.tips 为方便后期实名认证，请使用与名片信息一致的手机号。
    validator(name='validation')
      form(autocomplete='off', action='', novalidate='', @submit.prevent='onSubmit($event)')
        input.dn(type='password', name='password')
        .form-group(v-for='field in fields')
          .input(v-validate-class='', v-kt-toggle-onfucusblur='', child='input', toggle-class='focus', :class="{'not-empty': !!user[field.name]}")
            i.icon-pano(:class='field.iconName')
            input(autocomplete='off', @input='validate(field.name)', initial='off', detect-change='off', detect-blur='off', :type='field.type', v-model='user[field.name]', :name='field.name', :placeholder='field.placeholder', :field='field.name', v-validate='field.validate')
            .status
              //- 图形验证码
              img.img-captcha(:src='img_captcha_url', v-if="field.name === 'img_captcha'", @click.prevent='refreshImgCaptcha()')
              //- 短信验证码
              button.inset-button(:disabled='captchaCountdown.show', v-if="field.name === 'captcha'", @click.prevent='getCaptcha()')
                span(v-cloak='') {{captchaCountdown.text}}
                countdown(v-show='captchaCountdown.show', :start='captchaCountdown.start', :time.sync='captchaCountdown.time', @on-finish='resetCountDown()')
              i.weui_icon.weui_icon_clear(v-touch:tap='clearField(field.name)')
              i.weui_icon.weui_icon_warn(v-touch:tap='showError(field.name)')
              //- i.weui_icon.weui_icon_success
          .input-comment(v-if='field.comment', v-cloak='') {{field.comment}}
        //- .form-group
          .weui_cells.weui_cells_checkbox
            label.weui_cell.weui_check_label(for='agreement')
              .weui_cell_hd
                input#agreement.weui_check(type='checkbox', v-model='user.agreement', v-validate:agreement="{required:{rule: true, message: '请确认阅读开通PANO用户服务协议'}}")
                i.weui_icon_checked
              .weui_cell_bd.weui_cell_primary
                p
                  | 我已仔细阅读并同意
                  em
                    a(href='/static/pano-agreement.htm', target='_blank' @click.prevent="checkAgreement()") 开通PANO用户协议
        .form-group
          button(@click="$root.bdTrack(['注册页', '点击', '完成', '邀请好友'])") 完成
        .form-group.about-us
          h3 开通PANO是什么？
          p 开通PANO是由开通金融推出的互金理财数据信息产品，致力于为关注互联网金融的从业人员提供互联网理财市场数据、资产信息及后继交易等服务，促进金融资产在互联网端的发行流通效率。
        hr
        .form-group.about-us
          h3 关于开通金融
          p 开通金融是由中合担保和人人贷投资，专注于机构间交易市场服务的金融科技公司，为金融资产通过互联网平台发行提供完整的技术支持及解决方案。2017年2月，开通金融获得软银中国3000万元A轮融资。
</template>

<script>
import Vue from 'vue'
import Flexbox from 'vux-components/flexbox'
import FlexboxItem from 'vux-components/flexbox-item'
import Popup from 'vux-components/popup'
import Countdown from 'vux-components/countdown'
import formMixin from '../mixins/form-mixin'
import captchaMixin from '../mixins/captcha-mixin'
import {
  sessions,
  registrations
} from '../common/resources'
import Utils from '../common/utils.js'
import Env from '../env.js'

export default {
  mixins: [formMixin, captchaMixin],

  components: {
    Flexbox,
    FlexboxItem,
    Countdown,
    Popup
  },

  ready() {
    this.refreshImgCaptcha()
    this.isPc = !Utils.isMobile()
    this.user.inviter_account_id = this.$route.query._u || null
    this.inviter_account_name = decodeURIComponent(this.$route.query._n || '')
  },

  methods: {
    // 获取短信验证码
    getCaptcha() {
      this.$root.bdTrack(['注册页', '点击', this.captchaCountdown.text, '邀请好友'])
      this.$validate('mobile', () => {
        if (this.$validation.mobile.invalid) {
          this.$root.showToast({
            text: this.$validation.mobile.errors[0].message
          })
        } else {
          this.$validate('img_captcha', () => {
            if (this.$validation.img_captcha.invalid) { // 验证图形验证码
              this.$root.showToast(this.$validation.img_captcha.errors[0].message)
            } else {
              this.$root.log({
                name: '短信获取'
              })
              this.startCountDown()

              registrations.get({
                content: 'captcha',
                img_captcha: this.user.img_captcha,
                mobile: this.user.mobile,
                ...this.filter,
                channel: 'sms'
              }).catch((res) => {
                this.$root.showToast({
                  text: res.json().error || '获取失败'
                })
                this.refreshImgCaptcha()
                this.resetCountDown()
              })
            }
          })
        }
      })
    },
    /*onRegisterSuccess() {
      sessions.save({
        mobile: this.user.mobile,
        password: this.user.password
      }).then((res) => {
        let user = res.json().account
        this.$root.updateUser(user)

        this.$router.go({
          name: 'enquiry'
        })
      })
    },*/
    onSubmit() {
      this.$validate(true, () => {
        if (this.$validation.invalid) {
          this.showFirstError()
        } else {
          this.$root.showLoadingStatus()
          registrations.save({
            content: 'simplify'
          }, this.user).then(() => {
            return sessions.save(this.user)
          }).then((res) => {
            let token = window.localStorage.token = res.json().token
            Vue.http.headers.common['Authorization'] = token

            sessions.get().then((res) => {
              this.$root.hideLoadingStatus()
              const user = res.json().account
              const uriToken = encodeURIComponent(token) // 主动encode，避免+被浏览器encode成空格
              this.$root.updateUser(user)
              if (this.isPc) {
                location.href = `${Env.hostName}/account/perfect?_t=${uriToken}`
              } else {
                this.$router.go({
                  name: 'perfect'
                })
              }
            })
          }).catch((res) => {
            this.$root.hideLoadingStatus()
            this.$root.showToast({
              text: res.json().error || '抱歉，注册失败！'
            })
          })
        }
      })
    }
  },

  data() {
    let cachedUser = JSON.parse(window.sessionStorage.registerUserCache || '{}')
    return {
      isPc: false, // 是否是pc端
      filter: {
        // img_captcha: '',
        img_captcha_key: '' // 图形验证码key值
      },
      inviter_account_name: '', // 邀请人姓名
      user: Object.assign({
        agreement: true,
        mobile: '',
        captcha: '',
        introducer: '',
        img_captcha: '',
        inviter_account_id: null,
        password: ''
      }, cachedUser),
      fields: [{
        name: 'mobile',
        placeholder: '请输入手机号',
        type: 'number',
        comment: '',
        iconName: 'icon-user',
        validate: {
          required: {
            rule: true,
            message: '请正确输入11位手机号码'
          },
          mobile: true
        }
      }, {
        name: 'email',
        placeholder: '请输入邮箱（选填）可获取数据周报',
        type: 'text',
        comment: '',
        iconName: 'icon-user',
        validate: {
          // required: {
          //   rule: true,
          //   message: '请正确输入11位手机号码'
          // },
          pattern: {
            rule: '/^([^@]+@.+|)$/',
            message: '邮箱地址有误'
          }
        }
      }, {
        name: 'img_captcha',
        placeholder: '请输入图形验证码',
        type: 'text',
        iconName: 'icon-user',
        validate: {
          required: {
            rule: true,
            message: '请输入图形验证码'
          },
          pattern: {
            rule: '/^[A-Za-z0-9]{4}$/',
            message: '图形验证码错误'
          }
        }
      }, {
        name: 'captcha',
        placeholder: '请输入短信验证码',
        type: 'number',
        iconName: 'icon-user',
        validate: {
          required: {
            rule: true,
            message: '请输入短信验证码'
          },
          pattern: {
            rule: '/^\\d{4}$/',
            message: '短信验证码错误'
          }
        }
      }, {
        name: 'password',
        placeholder: '请输入密码（6~20位，包含字母和数字）',
        type: 'password',
        iconName: 'icon-lock',
        validate: {
          password: true
        }
      }]
    }
  }
}
</script>

<style scoped lang="scss">
.pc {
  header {
    height: 80px;
    .inner {
      width: 1054px;
      margin: 0 auto;
    }
  }
  .pc-logo {
    height: 20px;
    margin: 30px 0 0 35px;
  }
  .header {
    height: 314px;
    background-image: url('../assets/images/s-r-header-bg-pc.jpg');
  }
  form {
    max-width: 500px;
    margin: 0 auto;
  }
  .form-container {
    padding: 40px;
    background-image: url('../assets/images/s-r-body-bg-pc.jpg');
  }
}

.header {
  height: 5.756844rem; // 715px
  background-color: #313142;
  background-image: url('../assets/images/s-r-header-bg-m.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.flex-item {
  margin: 0.201288rem 0; //25px
}

.header-desc1 {
  font-size: 0.354267rem; //44px;
  color: #c5c9d2;
  margin-bottom: 0; //20px
  position: relative;
  em {
    color: #2febe0;
    margin: 0 .3em;
  }
  &:before {
    position: absolute;
    content: '';
    left: -.6em;
    top: 0;
    width: 0.120773rem;
    height: 0.120773rem; // 15px
    border: 1px solid #c5c9d2;
    border-color: #c5c9d2 transparent transparent #c5c9d2;
  }
  .strigula {
    width: 0.354267rem; //44px
    height: 1px;
    background: #c5c9d2;
    display: inline-block;
    vertical-align: .3em;
    margin-left: .2em;
  }
}

.header-desc2 {
  margin-top: 0; //20px
  font-size: 0.354267rem; //44px
  color: #fbfcff;
  position: relative;
  &:after {
    position: absolute;
    content: '';
    right: -.6em;
    bottom: 0;
    width: 0.120773rem;
    height: 0.120773rem; // 15px
    border: 1px solid #c5c9d2;
    border-color: transparent #c5c9d2 #c5c9d2 transparent;
  }
}

.logo {
  height: 0.402576rem; //50px
}

.slogan {
  height: 1.449275rem; //180px
}

.form-container {
  background-color: #313142;
  background-image: url('../assets/images/s-r-body-bg-m.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 0.805153rem; //100px
}

form {
  background: none;
}

.about-us {
  color: white;
  width: auto;
  padding: 0 0.289855rem; // 36px
  margin-bottom: 0.281804rem; //35px
  h3 {
    font-size: 0.322061rem; //40px
    margin: 0.201288rem 0; //25px
  }
  p {
    line-height: 1.8em;
    color: #c5c9d2;
    font-size: 0.289855rem;
  }
}

hr {
  margin: 0 0.289855rem; //36px
  border-color: rgba(82, 84, 100, .8);
  // border-bottom: 1px solid #333442;
}

.form-group {
  .img-captcha {
    border-radius: 1000px;
  }
  button {
    background: #008eea;
    &:active {
      background: darken(#008eea, 10%);
    }
    border-radius: 1000px;
  }
  .input {
    border-radius: 1000px;
    background-color: rgba(255, 255, 255, .1);
    .inset-button {
      color: #a7abb3;
    }
  }
  input {
    color: white;
    background: none;
  }
}

.weui_cells {
  background: none;
  overflow: initial;
  .weui_cell.weui_check_label {
    padding-left: 0;
    p {
      font-size: 0.289855rem;
    }
    a {
      pointer-events: initial;
    }
    .weui_check:checked+.weui_icon_checked {
      &:before {
        color: #737e9c;
      }
    }
    .weui_icon_checked {
      &:before {
        font-size: 1em;
        color: #c9cdd5;
      }
    }
  }
  &:after,
  &:before {
    display: none;
  }
}
</style>
