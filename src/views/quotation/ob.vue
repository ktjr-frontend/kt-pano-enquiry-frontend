<template lang="jade">
  section.quotation
    kt-loading(:visible='$loadingRouteData')
    .head
      | 数据范围：
      span {{begin_date | moment 'YYYY-MM-DD'}} ~ {{end_date | moment 'YYYY-MM-DD'}}
    .table-container
      .table
        .thead
          .th-row
            .th(v-for='g in groups')
              {{g}}
        .tbody(v-for='tr in list')
          .th-row
            .th {{tr.type}}
          .td-row
            .td(v-for='td in tr.set')
              div(v-if='!td.max_rate') -
              div(v-if='td.max_rate' @click='detail(tr.type, td.group)')
                .title {{td.min_rate | ktPercent 1}}-{{td.max_rate | ktPercent 1 '%'}}
                .tips
                  span {{td.ring_diff ? '环比' : '-'}}
                  span(:class='{asc: td.ring_diff > 0, desc: td.ring_diff < 0, blank: !td.ring_diff}') {{td.ring_diff | ktPositveNumber | ktAppend '%'}}
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
      }).then(res => res.json().res)
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
      list: []
    }
  }
}
</script>

<style lang="scss" scoped>
.kt-loading {
  position: absolute!important;
  background: #eff1f8!important;
}
</style>
