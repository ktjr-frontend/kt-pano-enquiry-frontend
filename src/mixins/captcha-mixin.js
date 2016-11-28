import { imageCaptcha } from '../common/resources.js'
export default {
  methods: {
    // 刷新图形验证码
    refreshImgCaptcha() {
      imageCaptcha.get().then(res => {
        let data = res.json()
        this.img_captcha_url = data.url
        this.filter.img_captcha_key = data.key
      })
    },

    // 发送短信验证码后开始倒计时
    startCountDown() {
      this.captchaCountdown.show = true
      this.captchaCountdown.start = true
      this.captchaCountdown.text = '等待'
    },

    // 重置倒计时
    resetCountDown() {
      this.captchaCountdown.time = 59
      this.captchaCountdown.show = false
      this.captchaCountdown.start = false
      this.captchaCountdown.text = '短信获取'
    }
  },

  data() {
    return {
      img_captcha_url: '',
      captchaCountdown: {
        text: '短信获取',
        show: false,
        time: 59,
        start: false
      }
    }
  }
}
