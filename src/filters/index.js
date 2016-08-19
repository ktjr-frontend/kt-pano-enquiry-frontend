import _ from 'lodash'

export default {
  install(Vue, options) {
    Vue.filter('ktPercent', (value, decimal, unit) => {
      return _.isNumber(value) ? value.toFixed(decimal || 2) + (unit || '') : ''
    })

    Vue.filter('ktAppend', (value, str) => {
      return value ? (value + str) : '-'
    })

    Vue.filter('ktNull', (value, str) => {
      return value || str || '-'
    })
  }
}
