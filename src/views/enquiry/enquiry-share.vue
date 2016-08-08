<template>
  <div class="flex-container" :style="{height: winH + 'px'}" v-show="$loadingRouteData">
    <spinner type="ios"></spinner>
  </div>
  <div class="enquire-share" v-show="!$loadingRouteData">
    <section class="head">
      <div class="chat-list">
        <li>
          <div class="message">
            <div class="bubble">
              我在<em>开通PANO</em>查询了一个<em><span>{{enquiry_result.params.asset_life}}</span>个月</em>期限且<em>{{isHaveGuarantee}}</em>的<em>{{enquiry_result.params.asset_type}}</em>资产。
            </div>
          </div>
          <div class="icon">
            <img src="../../assets/images/icon-user.jpg" alt="用户头像">
          </div>
        </li>
        <li class="me">
          <div class="message">
            <div class="bubble">
              为你推荐的利率为： <em>{{inquiry_life_asset_rate.res.inquiry_life_asset_rate}}</em>%
            </div>
          </div>
          <div class="icon">
            <img src="../../assets/images/icon-ktjr.jpg" alt="用户头像">
          </div>
        </li>
        <li class="me">
          <div class="message">
            <div class="bubble">
              为你推荐的利率为： <em>{{inquiry_life_asset_rate.res.inquiry_life_asset_rate}}</em>%
            </div>
          </div>
          <div class="icon">
            <img src="../../assets/images/icon-ktjr.jpg" alt="用户头像">
          </div>
        </li>

      </div>
      <div class="insts">
        <div class="item" v-for="item in enquiry_result.res.inquiry_tactics_data">
          <div class="icon-body">
            <img :src="item.logo" alt="京东金融">
          </div>
          <p>{{item.platform}}</p>
        </div>
      </div>
    </section>
    <!-- <section class="head">
      <p>我在<em>开通PANO</em>查询了一个<em><span>{{enquiry_result.params.asset_life}}</span>个月</em>期限且<em>{{isHaveGuarantee}}</em>的<em>{{enquiry_result.params.asset_type}}</em>资产。原来互金平台资产询价可以如此简单靠谱：</p>
    </section>
    <section class="head-footer">
      开通PANO为我推荐的利率为：<em>{{enquiry_result.res.inquiry_life_asset_rate}}</em>%
    </section>
    <section class="refer-institutions">
      <h3>开通PANO为我推荐在如下平台发行：</h3>
      <div class="insts">
        <div class="item" v-for="item in enquiry_result.res.inquiry_tactics_data">
          <div class="icon-body">
            <img :src="item.logo" alt="京东金融">
          </div>
          <p>{{item.platform}}</p>
        </div>
      </div>
    </section> -->
    <!-- <group>
      <div class="titles">
        <h2 class="title">
        <img class="head-logo" src="../../assets/images/logo2.svg" alt="logo">
        <span>询价系统</span>
      </h2>
        <h3 class="sub-title">
        —— 专业精准的互金平台资产发行询价系统
      </h3>
      </div>
    </group> -->
    <enquiry-features></enquiry-features>
    <group>
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
    .chat-list {
      li {
        display: flex;
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
        &:after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          height: 0.201288rem;
          width: 0.201288rem;
          right: -0.177134rem;
          background: url('../../assets/images/bubble-arrow.png') no-repeat;
          background-size: contain;
        }
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
      li.me {
        .message {
          background: #f1c57c;
          flex: none;
          &:after {
            left: -0.144928rem;
            background: url('../../assets/images/bubble-arrow2.png') no-repeat;
            background-size: contain;
          }
        }
        .icon {
          margin-right: 0.322061rem; //40px
          margin-left: 0;
          order: -1;
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
  .titles {
    background: #f8f9fb;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 1.811594rem; //225px
    .title {
      font-size: 0.322061rem; // 40px
      color: #474650;
      margin-bottom: 0.161031rem; //100px
    }
    .head-logo {
      vertical-align: -.15em;
      position: static;
      height: 0.362319rem; //45px
      margin-right: 0.241546rem;
    }
    .sub-title {
      color: #737e9c;
      font-size: 0.289855rem; //36px
      // padding: 0.144928rem; //18px
      // border: 1px solid #c5ccd8;
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
      color: #c5c9d2;
      line-height: 3em;
    }
  }
  .buttons {
    background: white;
    height: 1.288245rem;
    line-height: 1.288245rem;
    padding: 0 0.402576rem; //50px
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    // margin: 0.322061rem 0.402576rem; //40px 50px
  }
}
</style>
