import Utils from '../common/utils'
import _ from 'lodash'
import Vue from 'vue'

export default {
  methods: {
    // 查看机构信息
    goInstDetail(platform, params = {}, callback) {
      this.$root.log({
        name: platform,
        ...params
      })

      // 跳转前记录当前位置
      Utils.setSessionByKey('scrollYCache', window.scrollY, this.$route.name)

      let envParams = Utils.getEnvParams()
      let paramsStr = _.isEmpty(params) ? '' : '&' + Vue.url('', params).split('?')[1]
      window.open(`${envParams.hostName}/pano/institutions/${platform}?_t=${envParams.token}${paramsStr}`, '_self')
      callback && callback(params)
    },

    // 去pano总览页
    goOverview(params = {}, callback) {
      this.$root.log({
        name: '市场行情',
        ...params
      })

      // 跳转前记录当前位置
      Utils.setSessionByKey('scrollYCache', window.scrollY, this.$route.name)

      let envParams = Utils.getEnvParams()
      let paramsStr = _.isEmpty(params) ? '' : '&' + Vue.url('', params).split('?')[1]
      window.open(`${envParams.hostName}/pano/overview?_t=${envParams.token}${paramsStr}`, '_self')
      callback && callback(params)
    }
  }
}
