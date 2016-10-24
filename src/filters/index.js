import _ from 'lodash'
import moment from 'moment'

export default {
  install(Vue, options) {
    // 添加百分比
    Vue.filter('ktPercent', (value, decimal, unit) => {
      return _.isNumber(value) ? _.round(value, decimal || 2) + (unit || '') : ''
    })

    Vue.filter('ktRound', (value, decimal = 0) => {
      return _.round(value, decimal)
    })

    Vue.filter('ktAppend', (value, str) => {
      return (_.isNil(value) ? '' : value) + str
    })

    Vue.filter('ktPrepend', (value, str) => {
      return str + (_.isNil(value) ? '' : value)
    })

    Vue.filter('ktPositveNumber', (value) => {
      if (value > 0 && _.isNumber(value)) {
        return '+' + value
      }
      return value
    })

    Vue.filter('ktNull', (value, str) => {
      return value || str || '-'
    })

    Vue.filter('moment', (date, format) => {
      return moment(date).format(format)
    })
  }
}
