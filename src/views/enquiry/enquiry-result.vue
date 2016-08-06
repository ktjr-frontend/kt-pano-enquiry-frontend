<template>
  <div class="flex-container" :style="{height: winH + 'px'}" v-show="$loadingRouteData">
    <spinner type="ios"></spinner>
  </div>

  <div class="enquiry-result" v-show="!$loadingRouteData && enquiry_result.inquiry_life_asset_rate">
    <section class="head">
      <img class="logo-white" src="../../assets/images/logo-white.svg" alt="logo开通PANO">
      <div class="circle">
        <h2>{{enquiry_result.inquiry_life_asset_rate}}<span class="unit">%</span></h2>
        <p>参考利率值</p>
      </div>
    </section>

    <section class="head-footer">
      为您推荐互联网金融平台：
    </section>

    <section class="results">
      <group v-for="item in enquiry_result.inquiry_tactics_data">
        <cell :title="item.platform" class="kt-md-cell">
          <div class="icon-circle" slot="icon">
            <img :src="item.logo">
          </div>
          <div slot="after-title" class="kt-cell-content">{{item.recomm_reason}}</div>
          <div slot="value" class="value">
            <h3>参考利率</h3>
            <p>
              <strong>{{item.rate | append '%'}}</strong>
            </p>
          </div>
        </cell>
      </group>

      <group>
        <cell title="" class="kt-md-cell feedback">
          <div slot="icon">
            <a @click="feedback(1)"><i class="icon-pano icon-smile satisfied"></i>满意</a>
            <a @click="feedback(0)"><i class="icon-pano icon-sad not-satisfied"></i>不满意</a>
          </div>
          <div slot="value">
            <button class="share" @click="openShare()">分享</button>
          </div>
        </cell>
      </group>

      <group>
        <cell v-link="{name: 'serviceIntroduce'}" @click="$parent.log({name: 'log'})" is-link class="service-introdution">
          <div slot="after-title">
            <h3>开通资产推介服务</h3>
            <p>开通可为您提供资产推介全流程服务，帮助您与合适的互联网金融 平台达成交易，千分之一费用，如有意向请与我们联系。
            </p>
            <div class="contact">
              <ul>
                <li>邮箱：pano@ktjr.com</li>
                <li>
                  PANO微信小秘书：
                  <img class="weixin-qrcode" src="../../assets/images/weixin.jpg" alt="weixin小秘书">
                </li>
              </ul>
            </div>
          </div>
        </cell>
      </group>
    </section>
  </div>
</template>
<script>
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import Spinner from 'vux-components/spinner'
import {
  enquiries
} from '../../common/resources'
import {
  showSuccessToast,
  showErrorToast,
  updateEnquiryError
} from '../../vuex/actions'
import wx from 'weixin-js-sdk'
import Utils from '../../common/utils'
export default {
  ready: function() {
    this.updateSignature()

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
      let imgUrl = host + require('../../assets/images/favicon-material.png')
      let shareOptions = {
        title: '这里是分享标题', // 分享标题
        desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事', // 分享描述
        link: host + '/enquiry/share?key=' + this.enquiry_result.params_key, // 分享链接
        imgUrl: imgUrl // 分享图标
          // type: '', // 分享类型,music、video或link，不填默认为link
          // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      }

      // 分享给朋友
      wx.onMenuShareAppMessage({
        ...shareOptions,
        success() {
          // 用户确认分享后执行的回调函数
          this.logShare('朋友', '确定')
        },
        cancel() {
          this.logShare('朋友', '取消')
        }
      })

      // 分享到朋友圈
      wx.onMenuShareTimeline({
        ...shareOptions,
        success() {
          this.logShare('朋友圈', '确定')
        },
        cancel() {
          this.logShare('朋友圈', '取消')
        }
      })

      // 分享到QQ
      wx.onMenuShareQQ({
        ...shareOptions,
        success() {
          // 用户确认分享后执行的回调函数
          this.logShare('QQ', '确定')
        },
        cancel() {
          this.logShare('QQ', '取消')
        }
      })

      // 分享到腾讯微博
      wx.onMenuShareWeibo({
        ...shareOptions,
        success() {
          // 用户确认分享后执行的回调函数
          this.logShare('腾讯微博', '确定')
        },
        cancel() {
          this.logShare('腾讯微博', '取消')
        }
      })

      // 分享到QQ空间
      wx.onMenuShareQZone({
        ...shareOptions,
        success() {
          // 用户确认分享后执行的回调函数
          this.logShare('QQ空间', '确定')
        },
        cancel() {
          this.logShare('QQ空间', '取消')
        }
      })
    })
  },
  vuex: {
    actions: {
      showSuccessToast,
      showErrorToast,
      updateEnquiryError
    }
  },
  components: {
    // Flexbox,
    // FlexboxItem,
    Group,
    Cell,
    Spinner
  },
  route: {
    data({
      to: {
        query
      }
    }) {
      let p = enquiries.get({
        content: 'search',
        snapshot: 1,
        ...query
      }).then((res) => {
        let data = res.json()

        if (!data.inquiry_life_asset_rate) {
          this.updateEnquiryError(data.inquiry_tactics_data.canot_publish)
          this.$router.replace({
            name: 'enquiryError'
          })
        }

        return {
          enquiry_result: data
        }
      })

      return p
    }
  },
  methods: {
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
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
            'closeWindow'
          ]
        })
        callback && callback()
      })
    },
    logShare(to, action) {
      this.$parent.log({
        name: '分享',
        to: to || '未知',
        action: action || '未知'
      })
    },
    openShare() {
      this.$parent.log({
        name: '分享按钮'
      })

      /*this.$router.go({
        name: 'enquiryShare',
        query: {
          key: this.enquiry_result.params_key
        }
      })*/
      wx.showOptionMenu()
      wx.showMenuItems({
        menuList: [ // 要显示的菜单项，所有menu项见附录3
          'menuItem:share:appMessage',
          'menuItem:share:timeline',
          'menuItem:share:qq',
          'menuItem:share:weiboApp',
          // 'menuItem:share:facebook',
          'menuItem:share:QZone'
        ]
      })
    },
    feedback(value) {
      this.$parent.log({
        key: this.enquiry_result.params_key,
        name: value ? '满意' : '不满意'
      }).then((res) => {
        if (value === 1) {
          this.$parent.showAlert({
            content: '快点把这么好的询价系统分享给好友吧！'
          })
        } else {
          let weixin = require('../../assets/images/weixin.jpg')
          let content = `<p style="text-align:center;">快找PANO酱吐槽下哪里不满意吧</p>
                  <p><img src="${weixin}" width="100%" /></p>`
          this.$parent.showAlert({
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
      retryTime: 0,
      winH: window.innerHeight,
      signature: {
        timestamp: '',
        nonceStr: '',
        url: location.href
      },
      enquiry_result: {
        params_key: '',
        inquiry_life_asset_rate: 0,
        inquiry_tactics_data: []
      }
    }
  }
}
</script>
<style lang="scss">
.enquiry-result {
  font-size: 0.322061rem; //40px
  .weui_cell,
  .weui_cell_primary {
    font-size: 0.322061rem; //40px
  }
  .weui_cell_primary {
    margin-right: 0.161031rem; //20px
  }
  .head {
    text-align: center;
    height: 5.47504rem; //680px
    background: linear-gradient(to bottom, #304366, #296993);
    .logo-white {
      margin: 0.523349rem 0; //65px
      width: 3.94525rem; //490px
    }
    .circle {
      border-radius: 50%;
      margin: 0 auto;
      width: 3.059581rem; //380px
      height: 3.059581rem; //380px
      border: 0.185185rem solid rgba(52, 146, 211, .15); //23px
      color: white;
      h2 {
        font-size: 0.966184rem; //120px
        font-family: Arial;
        margin: 0.563607rem 0 0.322061rem;
        .unit {
          font-size: 0.644122rem; //80px
        }
      }
      p {
        font-size: 0.322061rem; //40px
      }
    }
  }
  .head-footer {
    text-align: center;
    line-height: 0.925926rem; //115px
    height: 0.925926rem; //115px
    background: #304366;
    color: white;
  }
  .results {
    margin-top: -0.362319rem;
  }
  .feedback {
    .share {
      width: 1.771337rem; //220px
      height: 0.724638rem; //90px
      line-height: 0.724638rem; //90px
      border-radius: 100px;
    }
    a {
      &:hover {
        text-decoration: none;
        // color: #304366;
      }
      &:active {
        color: #304366;
      }
      margin-right: 0.805153rem; //100px
      .icon-pano {
        margin-right: 0.281804rem; //35px
        font-size: 0.450886rem;
        vertical-align: -.15em;
        margin-right: 0.281804rem; //35px
      }
    }
  }
  .satisfied {
    color: #ffd388;
  }
  .not-satisfied {
    color: #dde1f0;
  }
  .service-introdution {
    h3 {
      text-align: center;
      margin-bottom: 0.161031rem; //20px
    }
    p {
      color: #c5c9d2;
    }
    .weui_cell_ft {
      align-self: flex-start;
    }
    .contact {
      padding: 0.161031rem 0;
      color: #c5c9d2;
      line-height: 0.563607rem;
      margin-top: 0.161031rem; //20px
      border-top: 1px solid #f4f6fa;
      .weixin-qrcode {
        display: block;
        margin: -1.55em auto 0;
        width: 2.012882rem; //250px
        vertical-align: top;
        // margin-left: 0.402576rem;
      }
    }
  }
}
</style>
