import wx from 'weixin-js-sdk'
import Utils from '../common/utils'
import { enquiries } from '../common/resources'

export default {
  methods: {
    wxInit(options, success, cancel) {
      this.updateSignature({}, () => {
        // 签名失效
        wx.error((res) => {
          if (this.retryTime > 1) {
            return
          }
          // console.log(this.retryTime)
          ++this.retryTime
          this.updateSignature({
            no_cache: true // 不走缓存
          })
        })

        wx.ready(() => {
          let host = location.protocol + '//' + location.host
          let imgUrl = host + require('../assets/images/share-icon.jpg')
          let shareOptions = Object.assign({
            title: '互金平台最新资产发行价格都在这里了', // 分享标题
            desc: '【开通PANO】现在还能直接对接资产项目', // 分享描述
            // link: host + '#!/enquiry/share?key=' + encodeURIComponent(this.enquiry_result.params_key), // 分享链接
            imgUrl: imgUrl // 分享图标
              // type: '', // 分享类型,music、video或link，不填默认为link
              // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          }, options || {})
          let _self = this

          // 分享给朋友
          wx.onMenuShareAppMessage({
            ...shareOptions,
            success() {
              success && success('朋友') // eslint-disable-line
              _self.logShare('朋友', '确定')
            },
            cancel() {
              cancel && cancel('朋友') // eslint-disable-line
              _self.logShare('朋友', '取消')
            }
          })

          // 分享到朋友圈
          wx.onMenuShareTimeline({
            ...shareOptions,
            desc: '这里有最新互金渠道资产价格，还能直接对接项目、找资金',
            success() {
              success && success('朋友圈') // eslint-disable-line
              _self.logShare('朋友圈', '确定')
            },
            cancel() {
              cancel && cancel('朋友圈') // eslint-disable-line
              _self.logShare('朋友圈', '取消')
            }
          })

          // 分享到QQ
          wx.onMenuShareQQ({
            ...shareOptions,
            success() {
              success && success('QQ') // eslint-disable-line
              _self.logShare('QQ', '确定')
            },
            cancel() {
              cancel && cancel('QQ') // eslint-disable-line
              _self.logShare('QQ', '取消')
            }
          })

          // 分享到腾讯微博
          wx.onMenuShareWeibo({
            ...shareOptions,
            success() {
              success && success('腾讯微博') // eslint-disable-line
              _self.logShare('腾讯微博', '确定')
            },
            cancel() {
              cancel && cancel('腾讯微博') // eslint-disable-line
              _self.logShare('腾讯微博', '取消')
            }
          })

          // 分享到QQ空间
          wx.onMenuShareQZone({
            ...shareOptions,
            success() {
              success && success('QQ空间') // eslint-disable-line
              _self.logShare('QQ空间', '确定')
            },
            cancel() {
              cancel && cancel('QQ空间') // eslint-disable-line
              _self.logShare('QQ空间', '取消')
            }
          })
        })
      })
    },
    // 更新签名
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
  },
  data() {
    return {
      retryTime: 0,
      signature: {
        timestamp: '',
        nonceStr: '',
        url: location.href.split('#')[0]
      }
    }
  }
}
