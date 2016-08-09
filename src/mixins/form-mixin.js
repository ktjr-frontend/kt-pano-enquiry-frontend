export default {
  methods: {
    clearField(name) {
      this.user[name] = ''
    },
    showError(name) {
      this.$parent.showToast({
        text: this.$validation.errors.find((e) => e.field === name).message
      })
    },
    showFirstError() {
      this.$parent.showToast({
        text: this.$validation.errors[0].message
      })
    },
    validate(name, callback) {
      if (this.$validation[name].invalid && this.$validation[name].touched) {
        this.$validate(name, function() {
          callback && callback()
        })
      }
    }
  }
}
