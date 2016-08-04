import _ from 'lodash'

export default {
  install(Vue, options) {
    Vue.filter('percent', (value, decimal, unit) => {
      return _.isNumber(value) ? value.toFixed(decimal || 2) + (unit || '') : ''
    })
  }
}
