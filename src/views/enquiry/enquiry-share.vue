<template lang="jade">
div
  kt-loading(:visible='$loadingRouteData')
  .enquire-share(v-if='!$loadingRouteData && enquiry_result.res.inquiry_tactics_data.length')
    section.head
      .chat-list
        .item
          p.content(v-if="$route.query.mark !== 'search_am'", v-cloak='')
            | 我在
            em 开通PANO
            | 查询了一个
            em
              span {{enquiry_result.params.asset_life}}
              | 个月
            | 期限且
            em {{isHaveGuarantee}}
            | 的
            em {{enquiry_result.params.asset_type}}
            | 资产
          p.content(v-if="$route.query.mark === 'search_am'", v-cloak='')
            | 我在
            em 开通PANO
            | 查询了一个
            em {{enquiry_result.params.credit_manager_type}}
            | 产品，期限为
            em {{enquiry_result.params.asset_life.join('，')}}
        .me.item
          .message
            .bubble
              span(v-if="$route.query.mark !== 'search_am'")
                | 开通PANO为我推荐的利率为：
                em.em-fs.em-orange(v-cloak='') {{enquiry_result.res.inquiry_life_asset_rate | ktNull}}
                | %
              span(v-if="$route.query.mark === 'search_am'")
                | 开通PANO为我查询到的参考利率为：
            .arrow
          .icon
            .icon-pano.icon-mans
            // <img src="../../assets/images/icon-ktjr.jpg" alt="用户头像">
        .swiper.item(v-if="$route.query.mark === 'search_am'")
          .rate-swiper
            x-swiper(v-ref:xswiper='', direction='horizontal', :prev-button='false', :next-button='false', :autoplay='3000', :centered-slides='true', :slides-per-view='3', @on-slide-change-end='onSlideChangeEnd', @on-click='onClick')
              x-swiper-item(v-for='item in enquiry_result.res.inquiry_tactics_data')
                .swiper-item
                  h3(v-cloak='')
                    em {{item.life_group}}
                  .rate
                    span(v-cloak='') {{item.rate | ktNull}}
                    i(v-if='item.rate') %
                  p 参考利率
        .me.item
          .message
            .bubble(v-if="$route.query.mark !== 'search_am'")
              | 开通PANO为我推荐在如下平台发行：
            .bubble(v-if="$route.query.mark === 'search_am'")
              | 该期限下，开通PANO为我推荐的发行平台为：
            .arrow
          .icon
            .icon-pano.icon-mans
      .insts
        .item(v-for='item in platformList', transition='zoomIn', stagger='100')
          .icon-body(@click='showReason(item.recomm_reason)')
            img(:src='item.logo', :alt='item.platform')
          p(v-cloak='') {{item.platform}}
        .item(v-if='!platformList.length', transition='zoomIn')
          .icon-body
            i.icon-pano.icon-meng
          p 根据我的查询条件，该期限暂无适合发行的平台。
      //
        <div class="praise">
        原来互金平台资产询价可以如此简单靠谱!!
        </div>
    section.head-footer
      h2.title
        img.head-logo(src='../../assets/images/logo2.svg', alt='logo')
        span 询价服务
      h3.sub-title
        | 查价格、找平台，1分钟搞定互联网渠道资产发行第一步
    enquiry-features
    group(style='margin-bottom:1.788245rem;')
      .contact
        h3 您也可以关注微信二维码，轻松开启资产询价之旅
        img.qrcode(src='../../assets/images/weixin-pano.jpg', alt='微信PANO')
        .foot
          | 联系邮箱：HelloPANO@ktjr.com
    .buttons
      button(v-link="{name: hadLogin ? 'enquiry' : 'register'}", @click="$root.log({name: '我也要询价'})") 我也要询价

</template>

<script>
import Group from 'vux-components/group'
import Spinner from 'vux-components/spinner'
import {
  XSwiper,
  XSwiperItem
} from 'vux-components/x-swiper'
import ktLoading from '../../components/kt-loading'
import EnquiryFeatures from '../_parts/enquiry-features'
import {
  enquiries,
  sessions
} from '../../common/resources'
import wxMixin from '../../mixins/wx-mixin'
import _ from 'lodash'

export default {
  mixins: [wxMixin],
  components: {
    Group,
    Spinner,
    XSwiper,
    XSwiperItem,
    ktLoading,
    EnquiryFeatures
  },

  created() {
    if (window.localStorage.token) {
      sessions.get({
        skipAuth: true // 不需要登录的标示，拦截器收到此参数不会强行跳转到登录页面
      }).then((res) => {
        let user = res.json().account
        this.$root.updateUser(user)
      })
    }
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

        if (!_.isArray(data.res.inquiry_tactics_data) || !data.res.inquiry_tactics_data.length) {
          this.$router.replace({
            name: 'enquiryError'
          })
        }

        // 初始化微信jssdk
        this.wxShareInit()

        return {
          enquiry_result: data
        }
      }, (res) => {
        this.$root.showAlert(res.json().error || '抱歉，服务器繁忙！')
      })

      return p
    }
  },

  methods: {
    showReason(reason) {
      if (reason) {
        this.$root.showAlert({
          title: '推荐理由',
          content: reason
        })
      }
    },

    updateSwiper() {
      if (this.$route.query.mark === 'search_am') {
        this.$refs.xswiper.swiper.update(true)
      }
    },

    onSlideChangeEnd(swiper) {
      this.activeIndex = swiper.activeIndex
    },

    onClick(swiper) {
      swiper.slideTo(swiper.clickedIndex)
    }
  },

  watch: {
    'enquiry_result': function(val) {
      this.$nextTick(() => {
        this.updateSwiper()
      })
    }
  },

  computed: {
    platformList() {
      if (this.$route.query.mark === 'search_am') {
        let activeItem = this.enquiry_result.res.inquiry_tactics_data[this.activeIndex]
        return activeItem ? activeItem.platforms : []
      }
      return this.enquiry_result.res.inquiry_tactics_data
    },

    isHaveGuarantee() {
      return this.enquiry_result.params.has_trust_party === true ? '有履约保障' : '无履约保障'
    }
  },

  data() {
    return {
      hadLogin: !!window.localStorage.token,
      activeIndex: 0,
      enquiry_result: {
        params: {
          has_trust_party: false,
          asset_life: []
        },
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
@import './enquiry-common.scss';
.enquire-share {
  .weui_cells {
    font-size: 0.322061rem; //40px
  }
  .chat-list {
    $width: 8px; // arrow width
    $height: 12px; // arrow height
    padding: 0.402576rem 0.805153rem; //50px 100px
    .item {
      display: flex;
      // justify-content: center;
      align-items: center;
      margin-bottom: 0.402576rem; //50px
      &.swiper {
        margin: -0.161031rem -0.805153rem 0.241546rem; //-20px 100px 30px
      }
      &:last-of-type {
        margin-bottom: 0;
      }
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
  .head {
    overflow: hidden;
    line-height: 1.8em;
    font-size: 0.289855rem; //36px
    text-align: left;
    background: #304366 url('../../assets/images/wave-bg2.jpg') center bottom no-repeat;
    background-size: 100% 1.489533rem; //185px
    padding: 0.402576rem 0.402576rem 1.610306rem 0.402576rem; //50px 200px
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
    .rate-swiper {
      margin: 0.322061rem 0 0.563607rem; //40px 70px
    }
    .swiper-item {
      em {
        color: #f5be6c;
      }
    }
    .insts {
      margin: 0 0.483092rem; // 50px
      display: flex;
      // padding: 0 0.805153rem; //100px
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
      .icon-pano {
        color: #e8ecf3;
        font-size: 1.207729rem;
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
    z-index: 99;
  }
}
</style>
