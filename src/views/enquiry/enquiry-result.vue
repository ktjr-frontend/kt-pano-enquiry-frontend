<template>
  <div class="flex-container" :style="{height: winH + 'px'}" v-show="$loadingRouteData">
    <spinner type="ios"></spinner>
  </div>

  <div class="enquiry-result" v-show="!$loadingRouteData && enquiry_result.average_rate">
    <section class="head">
      <img class="logo-white" src="../../assets/images/logo-white.svg" alt="logo开通PANO">
      <div class="circle">
        <h2>{{enquiry_result.average_rate | percent 1}}<span class="unit">%</span></h2>
        <p>参考利率值</p>
      </div>
    </section>
    <section class="head-footer">
      为您推荐互联网金融平台：
    </section>
    <section class="results">
      <group v-for="item in enquiry_result.results">
        <cell :title="item.name" class="kt-md-cell">
          <div class="icon-circle" slot="icon">
            <img :src="item.logo">
          </div>
          <div slot="after-title" class="kt-cell-content">{{item.desc}}</div>
          <div slot="value" class="value">
            <h3>参考利率</h3>
            <p>
              <strong>{{item.rate | percent 1 '%'}}</strong>
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
            <button class="share">分享</button>
          </div>
        </cell>
      </group>
      <group>
        <cell v-link="{name: 'serviceIntroduce'}" is-link class="service-introdution">
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
  enquiries,
  feedbacks
} from '../../common/resources'
import {
  showAlert,
  showToast,
  showSuccessToast,
  showErrorToast,
  updateEnquiryError
} from '../../vuex/actions'
import wx from 'weixin-js-sdk'
// import SHA1 from 'crypto-js/sha1'
export default {
  ready: function() {
    // this.$http.jsonp('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx304dfaa11415f925&secret=APPSECRET')

    // console.log(SHA1('jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg&noncestr=Wm3WZYTPz0wzccnW&timestamp=1414587457&url=http://mp.weixin.qq.com?params=value').toString())

    wx.onMenuShareAppMessage({
      title: 'hahah', // 分享标题
      desc: 'ddddd', // 分享描述
      link: '', // 分享链接
      imgUrl: '../../assets/images/weixin.jpg', // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function() {
        // 用户确认分享后执行的回调函数

      },
      cancel: function() {
        // 用户取消分享后执行的回调函数

      }
    })
  },
  vuex: {
    actions: {
      showAlert,
      showToast,
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
      // this.showLoadingStatus()
      let p = enquiries.get(query).then((res) => {
        let data = res.json()

        if (!data.average_rate) {
          this.updateEnquiryError(data.enquiry_error)
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
    feedback(value) {
      feedbacks.save({
        type: value
      }).then((res) => {
        if (value === 1) {
          this.showAlert({
            content: '快点把这么好的询价系统分享给好友吧！'
          })
        } else {
          this.showSuccessToast('感谢您的反馈！')
        }
      }, (res) => {
        this.showErrorToast(res.json().error || '反馈失败！')
      })
    }
  },
  data() {
    return {
      winH: window.innerHeight,
      enquiry_result: {
        average_rate: 0,
        results: []
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
    .share{
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
