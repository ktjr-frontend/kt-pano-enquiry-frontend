<template>
  <div class="flex-container" :style="{height: winH + 'px'}" v-show="$loadingRouteData">
    <spinner type="ios"></spinner>
  </div>
  <div class="enquire-share" v-show="!$loadingRouteData">
    <section class="head">
      <div class="chat-list">
        <div class="item">
          <p class="content">
            我在<em>开通PANO</em>查询了一个<em><span>{{enquiry_result.params.asset_life}}</span>个月</em>期限且<em>{{isHaveGuarantee}}</em>的<em>{{enquiry_result.params.asset_type}}</em>资产。
          </p>
        </div>
        <div class="me item">
          <div class="message">
            <div class="bubble">
              开通PANO为你推荐的利率为：<em class="em-fs em-orange">{{enquiry_result.res.inquiry_life_asset_rate}}</em>%
            </div>
            <div class="arrow"></div>
          </div>
          <div class="icon">
            <div class="icon-pano icon-mans"></div>
            <!-- <img src="../../assets/images/icon-ktjr.jpg" alt="用户头像"> -->
          </div>
        </div>
        <div class="me item">
          <div class="message">
            <div class="bubble">
              开通PANO为你推荐在如下平台发行：
            </div>
            <div class="arrow"></div>
          </div>
          <div class="icon">
            <div class="icon-pano icon-mans"></div>
            <!-- <img src="../../assets/images/icon-ktjr.jpg" alt="用户头像"> -->
          </div>
        </div>

      </div>
      <div class="insts">
        <div class="item" v-for="item in enquiry_result.res.inquiry_tactics_data">
          <div class="icon-body">
            <img :src="item.logo" :alt="item.platform">
          </div>
          <p>{{item.platform}}</p>
        </div>
      </div>
      <!-- <div class="praise">
        原来互金平台资产询价可以如此简单靠谱!!
      </div> -->
    </section>
    <section class="head-footer">
      <h2 class="title">
          <img class="head-logo" src="../../assets/images/logo2.svg" alt="logo">
          <span>询价系统</span>
        </h2>
      <h3 class="sub-title">
          查价格、找平台，1分钟搞定互联网渠道资产发行第一步
      </h3>
    </section>
    <enquiry-features></enquiry-features>
    <group style="margin-bottom:1.788245rem;">
      <div class="contact">
        <h3>您也可以关注微信二维码，轻松开启资产询价之旅</h3>
        <img src="../../assets/images/weixin.jpg" class="qrcode" alt="微信PANO" />
        <div class="foot">
          联系邮箱：HelloPANO@ktjr.com
        </div>
      </div>
    </group>
    <div class="buttons">
      <button v-link="{name:'register'}" @click="$parent.log({name:'我也要询价'})">我也要询价</button>
    </div>
  </div>
</template>
<script>
import Group from 'vux-components/group'
import Spinner from 'vux-components/spinner'
import EnquiryFeatures from '../_parts/enquiry-features'
import {
  enquiries
} from '../../common/resources'
import wxMixin from '../../mixins/wx-mixin'

export default {
  mixins: [wxMixin],
  components: {
    Group,
    Spinner,
    EnquiryFeatures
  },
  route: {
    data({
      to: {
        query
      }
    }) {
      let p = enquiries.get({
        content: 'res_by_key',
        ...query
      }).then((res) => {
        let data = res.json()

        // 初始化微信jssdk
        this.wxInit()

        return {
          enquiry_result: data
        }
      }, (res) => {
        this.$parent.showAlert(res.json().error || '抱歉，服务器繁忙！')
      })

      return p
    }
  },
  computed: {
    isHaveGuarantee() {
      return this.enquiry_result.params.guarantee === 'true' ? '有履约保障' : '无履约保障'
    }
  },
  data() {
    return {
      winH: window.innerHeight,
      enquiry_result: {
        params: {},
        res: {
          inquiry_life_asset_rate: 0,
          inquiry_tactics_data: []
        }
      }
    }
  }
}
</script>
<style lang="scss">
// @import '../../assets/fonts/hannotate/hannotate.css';
.enquire-share {
  .weui_cells {
    font-size: 0.322061rem; //40px
  }
  .head {
    line-height: 1.8em;
    font-size: 0.289855rem; //36px
    text-align: left;
    background: #304366 url('../../assets/images/wave-bg2.jpg') center bottom no-repeat;
    background-size: 100% 1.489533rem; //185px
    padding: 0.402576rem 0.402576rem 1.610306rem 0.402576rem; //50px 200px
    .chat-list {
      $width: 8px; // arrow width
      $height: 12px; // arrow height
      padding: 0.402576rem 0.885668rem; //50px 110px
      .item {
        display: flex;
        // justify-content: center;
        align-items: center;
        margin-bottom: 0.402576rem; //50px
      }
      .content {
        text-align: center;
        font-size: 0.402576rem; //50px
        line-height: 1.3;
        color: white;
        flex: 1;
        margin-bottom: 0.402576rem; //50px
      }
      .message {
        color: white;
        flex: 1;
        background: #a1b5cd;
        border-radius: 100px;
        padding: 0 0.402576rem; //50px
        display: flex;
        align-items: center;
        height: 0.966184rem; //120px
        align-self: center;
        line-height: 1.2;
        position: relative;
        .arrow {
          position: absolute;
          right: -$width + 1px;
          width: $width;
          height: $height;
          overflow: hidden;
          transform: translateY(-50%) rotate(15deg);
          top: 50%;
          &:before {
            content: '';
            display: block;
            box-sizing: border-box;
            position: absolute;
            bottom: 0;
            right: 0;
            width: $width * 2;
            height: $height * 2;
            border: 0 solid #a1b5cd;
            border-width: $height * 0.6 0;
            border-radius: 50%;
          }
        }
      }
      .icon {
        margin-left: 0.322061rem; //40px
        width: 0.764895rem; //95px
        height: 0.764895rem; //95px
        .icon-pano {
          font-size: 0.724638rem;
          color: white;
        }
      }
      .item.me {
        .message {
          background: #253a61;
          flex: none;
          order: 1;
          .arrow {
            transform: translateY(-50%) rotate(-15deg);
            left: -$width + 1px;
            &:before {
              bottom: 0;
              left: 0;
              border-color: #253a61;
              border-radius: 50%;
            }
          }
        }
        .icon {
          margin-right: 0.322061rem; //40px
          margin-left: 0;
        }
      }
    }
    em {
      display: inline-block;
      // margin: 0 5px;
      font-weight: bolder;
      color: #4380dd;
      &.em-fs {
        font-size: 1.5em;
        color: white;
      }
      &.em-orange {
        color: #f5be6c;
      }
    }
    .insts {
      margin: 0.161031rem 0 0.483092rem; //20px 50px
      display: flex;
      padding: 0 0.805153rem;
      .item {
        flex: 1;
        text-align: center;
        p {
          color: #f5be6c;
          font-size: 0.289855rem; //36px
        }
      }
      .icon-body {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0.161031rem auto; //20px
        width: 1.811594rem; // 225px
        height: 1.811594rem;
        text-align: center;
        background: white;
        border-radius: 50%;
      }
      img {
        margin: auto;
        max-width: 70%;
        max-height: 80%;
      }
    }
    /* .praise {
      position: relative;
      font-family: 'hannotate';
      text-align: center;
      color: #adb1bc;
      padding: 0.402576rem 0 0; //50px
      &:before {
        display: block;
        content: '';
        width: 100%;
        height: 1px;
        background: linear-gradient(to right, #304366 0%, #475e87 50%, #304366 100%);
        position: absolute;
        top: 0;
      }
    } */
  }
  .head-footer {
    background: white;
    box-shadow: 0 15px 15px rgba(0, 0, 0, .01);
    margin-bottom: 0.322061rem;
    height: 2.214171rem; //350px
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h2.title {
      margin-bottom: 0.161031rem; //30px
      font-size: 0.402576rem; // 50px
      color: #474650;
    }
    .head-logo {
      vertical-align: -.15em;
      position: static;
      width: 4.267311rem; //530px
    }
    h3.sub-title {
      color: #adb1bc;
      font-size: 0.322061rem; //40px
      position: relative;
      margin: 0;
      padding: 0.144928rem 0; //18px
      /* &:before {
        content: '';
        display: block;
        height: 0;
        border-top: 1px solid #adb1bc;
        width: 2em;
        left: 0;
        position: absolute;
        top: 50%;
      } */
    }
  }
  .contact {
    text-align: center;
    padding: 0 0.402576rem; //50px
    h3 {
      // font-size: 0.322061rem;
      line-height: 3em;
      color: #737e9c;
    }
    .qrcode {
      margin-bottom: 0.161031rem; //20px
      width: 1.851852rem; //230px
    }
    .foot {
      border-top: 1px solid #f4f6fa;
      color: #adb1bc;
      line-height: 3em;
    }
  }
  .buttons {
    background: white;
    padding: 0.402576rem; //50px
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
