import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import XInput from 'vux-components/x-input'
import Selector from 'vux-components/selector'
import _ from 'lodash'
import {
  pruneParams
} from '../../common/helpers'
import {
  showToast,
  showAlert
} from '../../vuex/actions'
import {
  assetTypes
} from '../../vuex/getters'

export default {
  vuex: {
    getters: {
      assetTypes
    },
    actions: {
      showToast,
      showAlert
    }
  },
  components: {
    Group,
    Cell,
    XInput,
    Selector
  },
  methods: {
    showTip(tip) {
      this.showAlert({
        content: tip
      })
    },
    clearField(key) {
      this.filter[key] = ''
    },
    showError(key) {
      this.showToast({
        text: this.$enquiryValidation.errors.find((e) => e.field === key).message
      })
    },
    validate(key) {
      if (this.$enquiryValidation[key].invalid && this.$enquiryValidation[key].touched) {
        this.$validate(key)
      }
    },
    onSubmit() {
      this.$validate(true, () => {
        if (this.$enquiryValidation.invalid) {
          this.showToast({
            text: '内容有误'
          })
        } else {
          this.showLoadingStatus()
          this.$router.go({
            name: 'enquiryResult',
            query: pruneParams(this.filter)
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
}
