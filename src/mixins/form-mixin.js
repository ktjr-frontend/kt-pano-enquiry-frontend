import _ from 'lodash'

export default {
  methods: {
    clearField(name) {
      this.user[name] = ''
    },
    showError(name) {
      let validation = this.$validation
      this.$root.showToast({
        text: _.find(validation.errors, (e) => {
          return e.field === name
        }).message
      })
    },
    showFirstError() {
      if (this.validationFork) {
        this.updateValidation()
      }
      let validation = this.validationFork || this.$validation
      this.$root.showToast({
        text: validation.errors[0].message
      })
    },
    validate(name, callback) {
      let validation = this.$validation
      if (validation[name].invalid && validation[name].touched) {
        this.$validate(name, function() {
          callback && callback()
        })
      }
    }
  }
}
