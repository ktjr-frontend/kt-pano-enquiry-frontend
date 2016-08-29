export default {
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
    }
  },
  data() {
    return {
      captchaCountdown: {
        text: '短信获取',
        show: false,
        time: 59,
        start: false
      }
    }
  }
}
