<template lang="jade">
  section.quotation
    kt-loading(:visible='$loadingRouteData')
    .head
      | 数据范围：
      span {{begin_date}} ~ {{end_date}}
    .table-container
      .table
        .thead
          .th-row
            .th(v-for='g in groups') {{g}}
        .tbody(v-for='tr in list')
          .th-row
            .th {{tr.type}}
          .td-row
            .td(v-for='td in tr.set')
              div.in(v-if='!td.max_rate') -
              div.in(v-if='td.max_rate' @click='detail(tr.type, td.group)')
                //- .title {{td.min_rate | ktPercent 1}}-{{td.max_rate | ktPercent 1 '%'}}
                .title {{td.min_rate | ktRangePercent td.max_rate 1}}
                .tips
                  span {{!isNull(td.ring_diff) ? '环比' : '-'}}
                  span(:class='{asc: round(td.ring_diff,2) > 0, desc: round(td.ring_diff,2) < 0, "blank-hack": isNull(td.ring_diff)}') {{td.ring_diff * 100 | ktRound | ktPositveNumber | ktAppend 'bp'}}
    .buttons-footer.fixed(v-if='$route.query.shared')
      button(@click='goPano()') 火速前往PANO
        i.icon-pano.icon-arrow-right
</template>

<script>
import _ from 'lodash'
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
    KtLoading
  },

  route: {
    data() {
      return quotes.get({
        content: 'list',
        type: 'bond'
      }).then(res => res.json().res).catch(res => {
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
        name: window.localStorage.token ? 'quotationOB' : 'register',
        query: {}
      })
    },

    detail(assetType, group) {
      this.$router.go({
        name: 'quotationDetail',
        query: {
          type: 'bond',
          asset_type: assetType,
          group: group
        }
      })
    }
  },

  computed: {
    groups() {
      if (!this.list.length) return {}
      return _.map(this.list[0].set, 'group')
    }
  },

  data() {
    return {
      begin_date: '',
      end_date: '',
      list: []
    }
  }
}
</script>

<style lang="scss" scoped>
.kt-loading {
  position: absolute!important;
  background: #f8f9fb!important;
}
</style>
