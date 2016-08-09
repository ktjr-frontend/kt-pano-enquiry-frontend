<template>
  <div class="flex-container" :style="{height: winH + 'px'}" v-show="$loadingRouteData">
    <spinner type="ios"></spinner>
  </div>

  <div class="enquiry-result" v-show="!$loadingRouteData && enquiry_result.inquiry_life_asset_rate">
    <section class="head">
      <img class="logo-white" src="../../assets/images/logo-white.svg" alt="logo开通PANO">
      <div class="circle">
        <h2>{{enquiry_result.inquiry_life_asset_rate}}<span class="unit">%</span></h2>
        <p>参考利率值<i class="icon-pano icon-info" @click="$parent.showAlert({content: enquiry_result.res_rate_comment})"></i></p>
      </div>
    </section>

    <section class="head-footer">
      为您推荐互联网金融平台：
    </section>

    <section class="results">
      <group>
        <cell v-for="item in enquiry_result.inquiry_tactics_data" :title="item.platform" class="kt-md-cell">
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
            <a @click="feedback(1)"><i class="icon-pano icon-smile not-satisfied"></i>满意</a>
            <a @click="feedback(0)"><i class="icon-pano icon-sad not-satisfied"></i>不满意</a>
          </div>
          <div slot="value" v-show="isWeixin">
            <button class="share" @click="openShare()">分享</button>
          </div>
        </cell>
      </group>

      <group>
        <cell v-link="{name: 'serviceIntroduce'}" @click="$parent.log({name: '产品介绍页'})" is-link class="service-introdution">
          <div slot="after-title">
            <h3>开通资产推介服务</h3>
            <p>开通金融为金融资产的互联网发行、增信、评级、销售、交易提供全流程系统支持，包括但不限于资产意向发布、在线推介、在线询价协商、多平台登记结算支持、跨平台发行及转让、信息披露等，如有意向可通过以下方式与我们联系。
            </p>
            <div class="contact">
              <ul>
                <li>邮箱：HelloPANO@ktjr.com</li>
                <li>
                  PANO微信小秘书：
                  <img class="weixin-qrcode" src="../../assets/images/weixin.jpg" alt="weixin小秘书">
                </li>
              </ul>
            </div>
          </div>
        </cell>
      </group>
      <group>
        <cell @click="openPano()" is-link class="service-introdution" style="padding-bottom: 15px">
          <div slot="after-title">
            <h3>开通PANO</h3>
            <p>汇集国内主流互金平台金融产品发行信息，助您快速全面了解市场最新数据，解除您逐日跟踪各大平台的烦恼。
            </p>
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
import Utils from '../../common/utils'
import wxMixin from '../../mixins/wx-mixin'

export default {
  mixins: [wxMixin],
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

        // 初始化微信jssdk
        let host = location.protocol + '//' + location.host
        let imgUrl = host + require('../../assets/images/share-icon.jpg')
        this.wxInit({
          title: '轻松搞定互金平台资产发行，是一种怎样的体验？', // 分享标题
          desc: '【开通PANO询价系统】一键查询互金平台资产发行，价格、平台统统告诉你！', // 分享描述
          link: host + '#!/enquiry/share?key=' + encodeURIComponent(data.params_key), // 分享链接
          imgUrl: imgUrl // 分享图标
        })

        return {
          enquiry_result: data
        }
      })

      return p
    }
  },
  methods: {
    openPano() {
      this.$parent.log({
        name: '开通PANO'
      })

      window.open('https://pano.ktjr.com', '_blank')
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

      this.$parent.showAlert({
        content: '金融的生命在于流动，信息的生命在于分享！点击右上角，马上分享给你的小伙伴吧！'
      })
    },
    feedback(value) {
      this.$parent.log({
        key: this.enquiry_result.params_key,
        name: value ? '满意' : '不满意'
      }).then((res) => {
        if (value === 1) {
          this.$parent.showAlert({
            content: '金融的生命在于流动，信息的生命在于分享！点击右上角，马上分享给你的小伙伴吧！'
          })
        } else {
          let weixin = require('../../assets/images/weixin.jpg')
          let content = `<p style="text-align:center;">感谢您的评价，我们将努力变得更好！如您还有其他的意见建议，可扫描下方二维码联系我们。</p>
                  <p><img src="${weixin}" width="60%" /></p>`
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
      isWeixin: Utils.isWeixin(),
      retryTime: 0,
      winH: window.innerHeight,
      signature: {
        timestamp: '',
        nonceStr: '',
        url: location.href.split('#')[0]
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
    background: linear-gradient(to bottom, #304366, #2e7bad);
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
      .icon-pano {
        font-size: .8em;
        vertical-align: super;
        margin-left: .5em;
      }
      h2 {
        font-size: 0.966184rem; //120px
        font-family: Arial;
        margin: 0.563607rem 0 0.322061rem 0.241546rem;
        .unit {
          font-size: 0.563607rem; //70px
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
        .not-satisfied {
          color: #ffd388;
        }
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
    &:active {
      color: #ffd388;
    }
  }
  .service-introdution {
    h3 {
      text-align: center;
      color: #737e9c;
      font-size: 0.354267rem; //44px
      margin: 0.161031rem 0; //20px
    }
    p {
      color: #acb1bd;
    }
    .weui_cell_ft {
      align-self: flex-start;
      position: absolute;
      right: 15px;
    }
    .weui_cell_primary {
      margin-right: 0;
    }
    .contact {
      padding: 0.161031rem 0;
      color: #acb1bd;
      line-height: 0.563607rem;
      margin-top: 0.362319rem; //30px
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
