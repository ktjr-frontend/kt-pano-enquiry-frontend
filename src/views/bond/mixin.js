import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import XInput from 'vux-components/x-input'
import Selector from 'vux-components/selector'
import _ from 'lodash'
import formMixin from '../../mixins/form-mixin'
import {
  pruneParams
} from '../../common/helpers'

let mixin = _.merge({
  components: {
    Group,
    Cell,
    XInput,
    Selector
  },
  watch: {
    'filter.guarantee': function(val) {
      if (!val) {
        this.filter.trust_party = []
      }
    }
  },
  methods: {
    showTip(tip) {
      this.$parent.showAlert({
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

    cacheFilter() {
      switch (this.filter.asset_type) {
        case '供应链类':
          window.sessionStorage.enquiryFilterSupplyChainCache = JSON.stringify(this.filter)
          break
        case '小微金融类':
          window.sessionStorage.enquiryFilterMiniFinanceCache = JSON.stringify(this.filter)
          break
        case '政信类':
          window.sessionStorage.enquiryFilterGovernmentCache = JSON.stringify(this.filter)
          break
        case '房地产类':
          window.sessionStorage.enquiryFilterEslateCache = JSON.stringify(this.filter)
          break
        case '企业借款类':
          window.sessionStorage.enquiryFilterEnterpriseCache = JSON.stringify(this.filter)
          break
        case '资管类':
          window.sessionStorage.enquiryFilterAssetManageCache = JSON.stringify(this.filter)
          break
        default:
          console.warn('cache filter error')
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
    },

    onSubmit() {
      this.$validate(true, () => {
        this.updateValidation()

        // console.log(this.validationFork.errors, this.validationFork.valid, this.validationFork.invalid)
        if (this.validationFork.invalid) {
          this.showFirstError()
        } else {
          this.cacheFilter()

          this.$router.go({
            name: this.filter.content === 'search' ? 'enquiryResult' : 'enquiryAmResult',
            query: {
              ...pruneParams(this.filter)
            }
          })
        }
      })
    }
  },

  computed: {
    maxFieldWidth() {
      return _.max(this.fields.map((v) => {
        return v.name.length + !!v.tip * 1
      })) + 1
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
  data() {
    return {
      subTitle: '请尽可能准确地填写以下资产相关信息，以便为您推荐最适合的利率和发行平台：',
      validationFork: {}
    }
  },

  methods: {
    clearField(name) {
      this.filter[name] = ''
    }
  }
})

export default mixin
