<template lang="jade">
.container
  kt-loading(:visible='$loadingRouteData')
  .detail
    .in
      p
        | {{detail.group}}利率：
        em {{detail.min_rate | ktPercent 1}}-{{detail.max_rate | ktPercent 1 '%'}}
        span.diff(v-if='!isNull(detail.ring_diff)') 环比{{detail.ring_diff * 100 | ktRound | ktPositveNumber | ktAppend 'bp'}}
      p.amount(v-if='$route.query.type === "bond"') 近30天成交量:
        span {{detail.total_amount}}
  //- 关注的互联网金融平台
  .group
    kt-cell(title='优势平台')
      .head
        a(v-for='item in detail.platform_list', :class='{active: $index === swiperActiveIndex}', @click='swiperGo($index)') {{item.tactics}}
      swiper(:options='swiperOptions' v-ref:swiper)
        swiper-slide(v-for='item in detail.platform_list')
          .kt-list-column(:class='"count-" + item.platforms.length')
            .kt-list-short(v-for='p in item.platforms', :title='p.name', @click='goInstDetail(p)')
              .icon
                img(:src='p.logo', :alt='p.name')
              .main
                h3
                  div.ellipsis {{p.name}}
            .kt-list-short(v-if='!item.platforms.length')
              .icon
                i.icon-pano.icon-meng
              main
                h3
                  div.ellipsis 无合适平台
  .buttons-footer
    button(v-link='{name: "joinInst", params: {type: "add"}, query: {asset_type: $route.query.asset_type, redirect_to: $route.path}}') 对接项目
      i.icon-pano.icon-arrow-bold

</template>

<script>
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'
import KtLoading from '../../components/kt-loading.vue'
import KtCell from '../../components/kt-cell.vue'
import {
  quotes
} from '../../common/resources.js'
import _ from 'lodash'

export default {
  components: {
    swiper,
    swiperSlide,
    KtLoading,
    KtCell
  },

  route: {
    data({
      to: {
        query
      }
    }) {
      return quotes.get({
        content: 'detail',
        ...query
      }).then(res => {
        return {
          detail: res.json().res
        }
      }).catch(res => {
        this.$root.showToast(res.json().error || '抱歉，服务器繁忙！')
      })
    }
  },

  methods: {
    isNull: _.isNull,
    swiperGo(index) {
      this.$refs.swiper.swiper.slideTo(index)
    },

    goInstDetail(inst) {
      window.sessionStorage[this.$route.name + '.slideCache'] = JSON.stringify({
        activeIndex: this.$refs.swiper.swiper.activeIndex
      })

      this.$root.goInstDetail(inst)
    }
  },

  data() {
    let initialSlide = JSON.parse(window.sessionStorage[this.$route.name + '.slideCache'] || '{}')

    return {
      detail: {},
      swiperActiveIndex: initialSlide.activeIndex || 0,
      swiperOptions: {
        name: 'detailSwiper',
        slidesPerView: 1,
        spaceBetween: 0,
        onSlideChangeEnd: function(swiper) {
          this.$set('swiperActiveIndex', swiper.activeIndex)
        }.bind(this),
        onInit(swiper) {
          setTimeout(() => {
            swiper.slideTo(initialSlide.activeIndex || 0)
          }, 500)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  background: white;
  padding: 0.322061rem; //40px
  .in {
    border-radius: 0.080515rem; //10px
    padding: 0.322061rem;
    background: #f8f9fb;
    text-align: center;
  }
  p {
    color: #737e9c;
    font-size: 0.289855rem; //36px
    &.amount {
      margin-top: 0.241546rem; //30px;
      font-size: 0.322061rem; //40px
    }
    .diff {
      color: #acb1bd;
    }
    em {
      margin: 0 .25em;
      font-size: 0.402576rem; //50px
      color: #e06161;
    }
  }
}

.kt-cell {
  .head {
    text-align: left;
    height: 0.885668rem;
    line-height: 0.885668rem; //110px
    margin-top: -0.402576rem; //50px
    margin-bottom: 0.402576rem; //50px
    padding: 0 0.161031rem; //20px
    border-bottom: 1px solid #3bc5ba;
    a {
      color: #acb1bd;
      margin-right: 0.805153rem; //100px
      &.active {
        color: #29b9ae;
      }
    }
  }
}

.buttons-footer {
  background: none;
}
</style>
