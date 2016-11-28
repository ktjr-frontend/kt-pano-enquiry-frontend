import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import Spinner from 'vux-components/spinner'
import {
  XSwiper,
  XSwiperItem
} from 'vux-components/x-swiper'
import ktLoading from '../../components/kt-loading'
import {
  showSuccessToast,
  showErrorToast,
  updateEnquiryError
} from '../../vuex/actions'
import Utils from '../../common/utils'
import _ from 'lodash'
import {
  enquiries
} from '../../common/resources'
import { updateLogoBottomStyle } from '../../router'
import instDetail from '../../mixins/inst-detail-mixin.js'
import Env from '../../env.js'

export default {
  mixins: [instDetail],
  vuex: {
    actions: {
      showSuccessToast,
      showErrorToast,
      updateEnquiryError
    }
  },

  components: {
    Group,
    Cell,
    Spinner,
    XSwiper,
    XSwiperItem,
    ktLoading
  },

  ready() {
    setTimeout(() => {
      updateLogoBottomStyle()
    }, 1000)
  },

  route: {
    data({
      to: {
        query
      }
    }) {
      let p = enquiries.get({
        // content: 'search',
        snapshot: 1,
        ...query
      }).then((res) => {
        let data = res.json()

        if (!_.isArray(data.inquiry_tactics_data)) {
          this.updateEnquiryError(data.inquiry_tactics_data.canot_publish)
          this.$router.replace({
            name: 'enquiryError'
          })
        }

        // 初始化微信jssdk
        let host = location.protocol + '//' + location.host
        this.wxInit({
          link: host + '#!/enquiry/share?mark=' + query.content + '&key=' + encodeURIComponent(data.params_key) // 分享链接
        })

        let _self = this
        setTimeout(() => {
          window.scrollTo(0, _self.$route.data.scrollY || 0)
        }, 200)

        return {
          enquiry_result: data
        }
      }, (res) => {
        this.$root.showAlert({
          content: res.json().error || '抱歉，查询失败！'
        })
      })

      return p
    }
  },

  methods: {
    /*goInstDetail(platform, callback) {
      this.$root.log({
        name: platform
      })

      // 跳转前记录当前位置
      Utils.setSessionByKey('scrollYCache', window.scrollY, this.$route.name)

      let envParams = Utils.getEnvParams()
      window.open(`${envParams.hostName}/pano/institutions/${platform}?_t=${envParams.token}`, '_blank')
      callback && callback()
    },*/

    openPano() {
      this.$root.log({
        name: '开通PANO'
      })

      // let envParams = Utils.getEnvParams()
      window.open(`${Env.hostName}/pano/overview?_t=${Env.token}`, '_blank')
    },

    logShare(to, action) {
      this.$root.log({
        name: '分享',
        to: to || '未知',
        action: action || '未知'
      })
    },

    openShare() {
      this.$root.log({
        name: '分享按钮'
      })

      this.$root.showAlert({
        content: '点击右上角，马上分享给你的小伙伴吧！'
      })
    },

    feedback(value) {
      this.$root.log({
        key: this.enquiry_result.params_key,
        name: value ? '满意' : '不满意'
      }).then((res) => {
        this.feedbackStyle.satisfied = value
        if (value === 1) {
          this.$root.showAlert({
            content: '点击右上角，马上分享给你的小伙伴吧！'
          })
        } else {
          let weixin = require('../../assets/images/weixin.jpg')
          let content = `<p style="text-align:center;">感谢您的评价，我们将努力变得更好！如您还有其他的意见建议，可扫描下方二维码联系我们。</p>
                  <p><img src="${weixin}" width="40%" /></p>`
          this.$root.showAlert({
            content: content
          })
        }
      }, (res) => {
        this.showErrorToast(res.json().error || '反馈失败！')
      })
    }
  },

  data() {
    return {
      isWeixin: Utils.isWeixin(),
      retryTime: 0,
      winH: window.innerHeight,
      feedbackStyle: { //  data名称不能和methods 重复
        satisfied: null
      },
      signature: {
        timestamp: '',
        nonceStr: '',
        url: location.href.split('#')[0]
      },
      enquiry_result: {
        params_key: '',
        inquiry_life_asset_rate: null,
        inquiry_tactics_data: []
      }
    }
  }
}
