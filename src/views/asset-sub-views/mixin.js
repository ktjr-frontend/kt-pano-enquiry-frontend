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
    onSubmit() {
      this.$validate(true, () => {
        if (this.$validation.invalid) {
          this.$parent.showToast({
            text: '内容有误'
          })
        } else {
          // this.$parent.showLoadingStatus()
          this.$router.go({
            name: 'enquiryResult',
            query: {
              ...pruneParams(this.filter),
              type: this.type
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

}, formMixin)

export default mixin
