import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import XInput from 'vux-components/x-input'
import Selector from 'vux-components/selector'
import _ from 'lodash'
import formMixin from '../form-mixin'
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
  methods: {
    showTip(tip) {
      this.$parent.showAlert({
        content: tip
      })
    },

    cacheFilter() {
      switch (this.asset_type) {
        case '供应链类':
          window.sessionStorage.enquriyFilterSupplyChainCache = JSON.stringify(this.filter)
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
        default:
          console.log('cache filter erro')
      }
    },
    onSubmit() {
      this.$validate(true, () => {
        if (this.$validation.invalid) {
          this.$parent.showToast({
            text: '内容有误'
          })
        } else {
          this.cacheFilter()

          // this.$parent.showLoadingStatus()
          this.$router.go({
            name: 'enquiryResult',
            query: {
              ...pruneParams(this.filter),
              asset_type: this.asset_type
            }
          })
        }
      })
    }
  },
  computed: {
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
