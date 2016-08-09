<template>
  <div class="flex-container" :style="{height: winH + 'px'}" v-show="$loadingRouteData">
    <spinner type="ios"></spinner>
  </div>
  <div class="enquire-share" v-show="!$loadingRouteData">
    <section class="head">
      <div class="chat-list">
        <div class="item">
          <div class="message">
            <div class="bubble">
              我在<em>开通PANO</em>查询了一个<em><span>{{enquiry_result.params.asset_life}}</span>个月</em>期限且<em>{{isHaveGuarantee}}</em>的<em>{{enquiry_result.params.asset_type}}</em>资产。
            </div>
            <div class="arrow"></div>
          </div>
          <div class="icon">
            <img src="../../assets/images/icon-user.jpg" alt="用户头像">
          </div>
        </div>
        <div class="me item">
          <div class="message">
            <div class="bubble">
              为你推荐的利率为： <em>{{enquiry_result.res.inquiry_life_asset_rate}}</em>%
            </div>
            <div class="arrow"></div>
          </div>
          <div class="icon">
            <img src="../../assets/images/icon-ktjr.jpg" alt="用户头像">
          </div>
        </div>
        <div class="me item">
          <div class="message">
            <div class="bubble">
              为你推荐在如下平台发行：
            </div>
            <div class="arrow"></div>
          </div>
          <div class="icon">
            <img src="../../assets/images/icon-ktjr.jpg" alt="用户头像">
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
      <div class="head-footer">
        原来互金平台资产询价可以如此简单靠谱!!
      </div>
    </section>
    <enquiry-features></enquiry-features>
    <group style="margin-bottom:1.288245rem;">
      <div class="contact">
        <h3>您也可以关注微信二维码，轻松开启资产询价之旅</h3>
        <img src="../../assets/images/weixin.jpg" class="qrcode" alt="微信PANO" />
        <div class="foot">
          联系邮箱：HelloPANO@ktjr.com
        </div>
      </div>
    </group>
    <div class="buttons">
      <button v-link="{name:'register'}" @click="$parent.log({name:'我要注册'})">我要注册</button>
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

export default {
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
        return {
          enquiry_result: data
        }
      }, (res) => {
        this.$parent.showAlert('抱歉，服务器繁忙！')
      })

      return p
    }
  },
  computed: {
    isHaveGuarantee() {
      return this.enquiry_result.params.guarantee === 'true' ? '有第三方担保' : '无第三方担保'
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
.enquire-share {
  .weui_cells {
    font-size: 0.322061rem; //40px
  }
  .head {
    margin: 0.362319rem 0 0.644122rem;
    line-height: 1.8em;
    font-size: 0.289855rem; //36px
    text-align: left;
    // min-height: 1.811594rem; //225px
    background: white;
    padding: 0.402576rem; //50px
    box-shadow: 0 0 35px 5px rgba(0, 0, 0, .14);
    .head-footer {
      text-align: center;
      padding-top: 0.241546rem; //30px
      margin-top: 0.362319rem; //45px
      border-top: 1px solid #f8f9fb;
    }
    .chat-list {
      $width: 8px; // arrow width
      $height: 12px; // arrow height
      .item {
        display: flex;
        // justify-content: center;
        align-items: center;
        margin-bottom: 0.161031rem;
      }
      .message {
        color: white;
        flex: 1;
        background: #a1b5cd;
        border-radius: 100px;
        padding: 0 0.523349rem; //65px
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
        /* &:after {
          content: '';
          position: absolute;
          top: 80%;
          transform: translateY(-50%);
          height: 0.201288rem;
          width: 0.201288rem;
          right: -0.177134rem;
          background: url('../../assets/images/bubble-arrow.png') no-repeat;
          background-size: contain;
        } */
      }
      .icon {
        margin-left: 0.322061rem; //40px
        width: 1.272142rem; //158px
        height: 1.272142rem; //158px
        border-radius: 50%;
        img {
          max-width: 100%;
        }
      }
      .item.me {
        .message {
          background: #f1c57c;
          flex: none;
          order: 1;
          .arrow {
            transform: translateY(-50%) rotate(-15deg);
            left: -$width + 1px;
            &:before {
              bottom: 0;
              left: 0;
              border-color: #f1c57c;
              border-radius: 50%;
            }
          }
          /* &:after {
            left: -0.154928rem;
            background: url('../../assets/images/bubble-arrow2.png') no-repeat;
            background-size: contain;
          } */
        }
        .icon {
          margin-right: 0.322061rem; //40px
          margin-left: 0;
        }
      }
    }
    em {
      margin: 0 5px;
      font-size: 0.322061rem; //40px
      font-weight: bolder;
      color: white;
    }
    .insts {
      display: flex;
      padding: 0 0.805153rem;
      .item {
        flex: 1;
        text-align: center;
        p {
          font-size: 0.20934rem; //26px
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
        border: 1px solid #e7ebf3;
        border-radius: 50%;
      }
      img {
        margin: auto;
        max-width: 70%;
        max-height: 80%;
      }
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
