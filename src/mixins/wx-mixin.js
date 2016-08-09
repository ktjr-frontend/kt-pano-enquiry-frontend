import wx from 'weixin-js-sdk'
import Utils from '../common/utils'
import { enquiries } from '../common/resources'

export default {
  data: function() {
    return {
      signature: {
        timestamp: '',
        nonceStr: '',
        url: location.href.split('#')[0]
      }
    }
  },
  methods: {
    wxInit(options) {
      this.updateSignature({}, () => {
        // 签名失效
        wx.error((res) => {
          if (this.retryTime > 2) {
            return
          }

          ++this.retryTime
          this.updateSignature({
            // force: 1
          })
        })

        wx.ready(() => {
          let host = location.protocol + '//' + location.host
          let imgUrl = host + require('../assets/images/share-icon.jpg')
          let shareOptions = Object.assign({
            title: '轻松搞定互金平台资产发行，是一种怎样的体验？', // 分享标题
            desc: '【开通PANO询价系统】一键查询互金平台资产发行，价格、平台统统告诉你！', // 分享描述
            link: host + '#!/enquiry/share?key=' + encodeURIComponent(this.enquiry_result.params_key), // 分享链接
            imgUrl: imgUrl // 分享图标
              // type: '', // 分享类型,music、video或link，不填默认为link
              // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          }, options || {})
          let _self = this

          // 分享给朋友
          wx.onMenuShareAppMessage({
            ...shareOptions,
            success() {
              _self.logShare('朋友', '确定')
            },
            cancel() {
              _self.logShare('朋友', '取消')
            }
          })

          // 分享到朋友圈
          wx.onMenuShareTimeline({
            ...shareOptions,
            success() {
              _self.logShare('朋友圈', '确定')
            },
            cancel() {
              _self.logShare('朋友圈', '取消')
            }
          })

          // 分享到QQ
          wx.onMenuShareQQ({
            ...shareOptions,
            success() {
              _self.logShare('QQ', '确定')
            },
            cancel() {
              _self.logShare('QQ', '取消')
            }
          })

          // 分享到腾讯微博
          wx.onMenuShareWeibo({
            ...shareOptions,
            success() {
              _self.logShare('腾讯微博', '确定')
            },
            cancel() {
              _self.logShare('腾讯微博', '取消')
            }
          })

          // 分享到QQ空间
          wx.onMenuShareQZone({
            ...shareOptions,
            success() {
              _self.logShare('QQ空间', '确定')
            },
            cancel() {
              _self.logShare('QQ空间', '取消')
            }
          })
        })
      })
    },
    updateSignature(params, callback) {
      this.signature.timestamp = (+new Date() / 1000 | 0)
      this.signature.nonceStr = Utils.uniqeId(16)
      let p = params || {}
      enquiries.get({
        content: 'get_wx_tokens',
        ...this.signature,
        ...p
      }).then((res) => {
        let data = res.json()
        wx.config({
          debug: process.env.NODE_ENV !== 'production', // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wx304dfaa11415f925', // 必填，公众号的唯一标识
          timestamp: this.signature.timestamp, // 必填，生成签名的时间戳
          nonceStr: this.signature.nonceStr, // 必填，生成签名的随机串
          signature: data.get_wx_tokens, // 必填，签名，见附录1
          jsApiList: [ // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideOptionMenu',
            'showOptionMenu',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'closeWinpdow'
          ]
        })
        callback && callback()
      })
    }
  }
}
