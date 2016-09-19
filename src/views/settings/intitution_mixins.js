import {
  persons
} from '../../common/resources'
import Utils from '../../common/utils'
import _ from 'lodash'
import Vue from 'vue'
import KtLoading from '../../components/kt-loading'

export default {
  components: {
    KtLoading
  },
  methods: {
    // 查看机构信息
    goInstDetail(platform, params = {}) {
      this.$root.log({
        name: platform,
        ...params
      })

      let envParams = Utils.getEnvParams()
      let paramsStr = _.isEmpty(params) ? '' : '&' + Vue.url('', params).split('?')[1]
      window.open(`${envParams.hostName}/pano/institutions/${platform}?_t=${envParams.token}${paramsStr}`, '_blank')
    },
    // 关注切换
    toggleAttention(item) {
      let _self = this
      if (item.is_followed) {
        this.$root.showConfirm({
          content: '确定取消关注？',
          onConfirm() {
            _self.$root.log({
              name: '确定取消关注'
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
              name: '取消取消关注'
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
          this.$root.hideLoadingStatus()
          item.is_followed = true
        }).catch(res => {
          this.$root.hideLoadingStatus()
          this.$root.showToast({
            text: res.json().error || '抱歉，服务器繁忙！'
          })
        })
      }
    }
  }
}
