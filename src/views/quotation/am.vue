<template lang="jade">
  section.quotation
    kt-loading(:visible='$loadingRouteData')
    .head
      | 数据范围：
      span {{begin_date}} ~ {{end_date}}
    .table-container
      i.icon-pano.icon-arrow-left(v-touch:tap='swiperPrev()')
      i.icon-pano.icon-arrow-right(v-touch:tap='swiperNext()')
      .table-bg
        .thead
          .th-row
        .tbody(v-for='tr in list')
          .th-row
            .th {{tr.type}}
          .td-row
      .table
        swiper(:options='swiperOptions' v-ref:swiper)
          swiper-slide(v-for='(key, group) in groups')
            .thead
              .th-row
                .th(v-for='g in group')
                  {{g}}
            .tbody(v-for='tr in groupList')
              .th-row
                .th
              .td-row
                .td(v-for='td in tr.set[key]')
                  div.in(v-if='!td.max_rate') -
                  div.in(v-if='td.max_rate' @click='detail(tr.type, td.group)')
                    .title {{td.min_rate | ktPercent 1}}-{{td.max_rate | ktPercent 1 '%'}}
                    .tips
                      span {{!isNull(td.ring_diff) ? '环比' : '-'}}
                      span(:class='{asc: round(td.ring_diff > 0, 2), desc: round(td.ring_diff < 0, 2), "blank-hack": isNull(td.ring_diff)}') {{td.ring_diff*100 | ktRound | ktPositveNumber | ktAppend 'bp'}}
    .buttons-footer.fixed(v-if='$route.query.shared')
      button(@click='goPano()') 火速前往PANO
        i.icon-pano.icon-arrow-right
</template>

<script>
import _ from 'lodash'
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'
import Spinner from 'vux-components/spinner'
import KtLoading from '../../components/kt-loading.vue'
import {
  quotes
} from '../../common/resources.js'
import wxMixin from '../../mixins/wx-mixin'

export default {
  mixins: [wxMixin],
  components: {
    Spinner,
    swiper,
    swiperSlide,
    KtLoading
  },

  route: {
    data() {
      return quotes.get({
        content: 'list',
        type: 'am'
      }).then(res => {
        let data = res.json().res
        let set = _.map(data.list[0].set, 'group')
        return {
          groups: _.chain(set).groupBy(v => Math.floor(_.indexOf(set, v) / 3)).value(), // 期限的每三个分组
          ...data
        }
      }).catch(res => {
        this.$root.showToast(res.json().error || '抱歉，服务器繁忙！')
      })
    }
  },

  ready() {
    // 初始化微信jssdk
    let host = location.protocol + '//' + location.host
    this.wxInit({
      link: `${host}#!/quotation/ob?shared=1` // 分享链接
    })
  },

  methods: {
    isNull: _.isNull,
    round: _.round,
    goPano() {
      this.$router.go({
        name: window.localStorage.token ? 'quotationAM' : 'register',
        query: {}
      })
    },
    swiperNext() {
      // let swiper = _.find(this.$children, children => children.options && children.options.name === 'amSwiper').swiper
      this.$refs.swiper.swiper.slideNext()
    },

    swiperPrev() {
      // let swiper = _.find(this.$children, children => children.options && children.options.name === 'amSwiper').swiper
      this.$refs.swiper.swiper.slidePrev()
    },

    detail(assetType, group) {
      window.sessionStorage[this.$route.name + '.slideCache'] = JSON.stringify({
        activeIndex: this.$refs.swiper.swiper.activeIndex
      })

      this.$router.go({
        name: 'quotationDetail',
        query: {
          type: 'am',
          asset_type: assetType,
          group: group
        }
      })
    }
  },

  computed: {
    // 每三个分组set
    groupList() {
      return _.each(this.list, v => {
        let oldSet = v.set
        v.set = _.groupBy(oldSet, vi => Math.floor(_.findIndex(oldSet, vii => vii.group === vi.group) / 3))
      })
    }
  },

  data() {
    let initialSlide = JSON.parse(window.sessionStorage[this.$route.name + '.slideCache'] || '{}')

    return {
      begin_date: '',
      end_date: '',
      list: [],
      groups: {},
      swiperOptions: {
        name: 'amSwiper',
        slidesPerView: 1,
        initialSlide: initialSlide.activeIndex || 0,
        // paginationClickable: true,
        spaceBetween: 0,
        freeMode: true,
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
.kt-loading {
  position: absolute!important;
  background: #eff1f8!important;
}

.table {
  position: absolute;
  left: 0;
  right: 0;
  transform: translateY(-100%);
  .tbody {
    .td-row .td:last-of-type {
      border-right: 1px solid #eff2f7!important;
    }
  }
  .swiper-slide {
    &:last-of-type {
      .tbody {
        .td-row .td:last-of-type {
          border-right: 0!important;
        }
      }
    }
  }
}

section.quotation {
  .table {
    background: none;
    .thead {
      border-bottom: 1px solid transparent;
    }
  }
  .table .tbody {
    .th-row,
    .td-row {
      border-bottom: 1px solid transparent;
    }
  }
}
</style>
