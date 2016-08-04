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
    validate(name) {
      if (this.$validation[name].invalid && this.$validation[name].touched) {
        this.$validate(name)
      }
    }
  }
}
