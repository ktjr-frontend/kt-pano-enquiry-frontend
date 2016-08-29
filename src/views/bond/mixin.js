import _ from 'lodash'
import cellFormMinxin from '../../mixins/cell-form-mixin'
import {
  pruneParams
} from '../../common/helpers'

let mixin = _.merge({
  watch: {
    'filter.has_trust_party': function(val) {
      if (!val) {
        this.filter.trust_party = []
      }
    }
  },

  methods: {
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

}, cellFormMinxin, {
  data() {
    return {
      buttonText: '立即查询',
      buttonComment: '数据结果由开通PANO互金资产模型提供',
      subTitle: '请尽可能准确地填写以下资产相关信息，以便为您推荐最适合的利率和发行平台：',
      validationFork: {}
    }
  }
})

export default mixin
