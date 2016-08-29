import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import XInput from 'vux-components/x-input'
import Selector from 'vux-components/selector'
import formMixin from './form-mixin'
import _ from 'lodash'

let mixin = _.merge({
  components: {
    Group,
    Cell,
    XInput,
    Selector
  },

  methods: {
    showTip(tip) {
      this.$root.showAlert({
        content: tip
      })
    },

    checkAll(field) {
      let options = _.map(field.options, 'value')
      if (this.filter[field.key].length < options.length) {
        this.filter[field.key] = options
      } else {
        this.filter[field.key] = []
      }
    },

    // $validation都是可读属性，复制一份用来hack掉bug
    updateValidation() {
      this.validationFork = Object.assign({}, this.$validation || {})
      this.checkboxValidationRevise()
    },

    // vue-validator 有bug, 修正checkboxs验证不正确的错误结果
    checkboxValidationRevise() {
      let truthErrors = this.validationFork.errors && this.validationFork.errors.filter((v) => {
        let field = _.find(this.fields, (f) => {
          return v.field === f.key
        })

        if (field.type === 'checkboxs' && field.validate.required) {
          if (this.filter[v.field].length) {
            return false
          }
          return true
        }
        return true
      })

      this.validationFork.errors = truthErrors || []
      if (!this.validationFork.errors.length) {
        this.validationFork.invalid = false
        this.validationFork.valid = true
      }
    }
  },

  computed: {
    maxFieldWidth() {
      let maxW = _.max(this.fields.map((v) => {
        return v.name.length + !!v.tip * 1
      }))
      return maxW ? maxW + 1 : 0
    },

    filtersByType() {
      let fields = this.fields.filter((f) => {
        if (!this.visible[f.key] && !_.isUndefined(this.visible[f.key])) {
          return false
        }
        return true
      })

      let filterObj = _.groupBy(fields, (f) => {
        return f.group
      })

      _.each(filterObj, function(v) {
        v.title = v[0].title || ''
      })

      return filterObj
    }
  }

}, formMixin, {
  methods: {
    clearField(name) {
      this.filter[name] = ''
    }
  }
})

export default mixin
