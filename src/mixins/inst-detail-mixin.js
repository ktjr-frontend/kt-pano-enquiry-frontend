import Utils from '../common/utils'
import _ from 'lodash'
import Vue from 'vue'
import Env from '../env.js'

export default {
  methods: {
    // 查看机构信息
    goInstDetail(inst, params = {}, callback) {
      this.$root.log({
        name: inst.name,
        ...params
      })
      this.$root.bdTrack(['个人信息页', '查看机构详情', inst.name])

      // 判断是否有机构详情
      let instInfo = _.find(this.$root.instBasicInfo, v => v.id === inst.id)
      if (instInfo && !instInfo.has_detail) {
        this.$root.showToast({
          text: '该机构暂未录入详情！',
          type: 'text'
        })
        return
      }

      // 跳转前记录当前位置
      Utils.setSessionByKey('scrollYCache', window.scrollY, this.$route.name)
      let token = encodeURIComponent(window.localStorage.token)

      let paramsStr = _.isEmpty(params) ? '' : '&' + Vue.url('', params).split('?')[1]
      window.open(`${Env.hostName}/pano/institutions/${inst.name}?_t=${token}${paramsStr}`, '_self')
      callback && callback(params)
    },

    // 去pano总览页
    goOverview(params = {}, callback) {
      this.$root.log({
        name: '市场行情',
        ...params
      })
      let token = window.localStorage.token
      if (!token) {
        this.showToast({
          text: '您还没有登录。'
        })
        return
      }

      // 跳转前记录当前位置
      Utils.setSessionByKey('scrollYCache', window.scrollY, this.$route.name)
      token = encodeURIComponent(token)

      let paramsStr = _.isEmpty(params) ? '' : '&' + Vue.url('', params).split('?')[1]
      window.open(`${Env.hostName}/pano/overview?_t=${token}${paramsStr}`, '_self')
      callback && callback(params)
    }
  }
}
