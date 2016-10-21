import {
  persons
} from '../../common/resources'
// import Utils from '../../common/utils'
// import Vue from 'vue'
import _ from 'lodash'
import KtLoading from '../../components/kt-loading'
import instDetail from '../../mixins/inst-detail-mixin.js'

export default {
  mixins: [instDetail],
  components: {
    KtLoading
  },
  methods: {
    // 查看机构信息
    /*goInstDetail(platform, params = {}, callback) {
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
    },*/
    // 关注切换
    toggleAttention(item, instType, callback) {
      let _self = this
      if (item.is_followed) {
        this.$root.showConfirm({
          content: '确定取消关注？',
          onConfirm() {
            _self.$root.log({
              name: '确定取消关注',
              institution: item.name
            })

            _self.$root.showLoadingStatus()
            persons.delete({
              content: 'relative_institutions'
            }, {
              institution_id: item.id
            }).then(() => {
              _self.$root.hideLoadingStatus()
              item.is_followed = false
            }).catch(res => {
              _self.$root.hideLoadingStatus()
              _self.$root.showToast({
                text: res.json().error || '抱歉，服务器繁忙！'
              })
            })
          },
          onConcel() {
            _self.$root.log({
              name: '取消取消关注',
              institution: item.name
            })
          }
        })
      } else {
        this.$root.showLoadingStatus()

        persons.save({
          content: 'relative_institutions'
        }, {
          institution_id: item.id
        }).then(() => {
          item.is_followed = true

          this.$root.log({
            name: '关注机构成功',
            institution: item.name
          })

          if (!_.isNil(instType)) {
            // 更新相关机构状态
            return persons.get({
              content: 'relative_institutions',
              need_all: false,
              institution_type: instType
            }).then(res => {
              this.$root.hideLoadingStatus()
              callback && callback(res.json(), instType)
            })
          } else {
            this.hideLoadingStatus()
          }
        }).catch(res => {
          this.$root.hideLoadingStatus()
          this.$root.showToast({
            text: res.json().error || '抱歉，服务器繁忙！'
          })

          this.$root.log({
            name: '关注机构失败',
            institution: item.name
          })
        })
      }
    }
  }
}
