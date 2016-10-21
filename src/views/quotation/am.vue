<template lang="jade">
  section.quotation
    kt-loading(:visible='$loadingRouteData')
    .head
      | 数据范围：
      span {{begin_date | moment 'YYYY-MM-DD'}} ~ {{end_date | moment 'YYYY-MM-DD'}}
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
                  div(v-if='!td.max_rate') -
                  div(v-if='td.max_rate' @click='detail(tr.type, td.group)')
                    .title {{td.min_rate | ktPercent 1}}-{{td.max_rate | ktPercent 1 '%'}}
                    .tips
                      span {{td.ring_diff ? '环比' : '-'}}
                      span(:class='{asc: td.ring_diff > 0, desc: td.ring_diff < 0, blank: !td.ring_diff}') {{td.ring_diff | ktPositveNumber | ktAppend '%'}}
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
      })
    }
  },

  mounted() {
    // 初始化微信jssdk
    let host = location.protocol + '//' + location.host
    this.wxInit({
      link: `${host}#!/quotation/ob` // 分享链接
    })
  },

  methods: {
    swiperNext() {
      // let swiper = _.find(this.$children, children => children.options && children.options.name === 'amSwiper').swiper
      this.$refs.swiper.swiper.slideNext()
    },

    swiperPrev() {
      let swiper = _.find(this.$children, children => children.options && children.options.name === 'amSwiper').swiper
      swiper.slidePrev()
    },

    detail(assetType, group) {
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
    return {
      begin_date: new Date(),
      end_date: new Date(),
      list: [],
      groups: {},
      swiperOptions: {
        name: 'amSwiper',
        slidesPerView: 1,
        // paginationClickable: true,
        spaceBetween: 0,
        freeMode: true
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

.swiper-container {
  transform: translateY(-100%);
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
