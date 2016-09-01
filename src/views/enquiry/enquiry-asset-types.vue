<template lang="jade">
.asset-types
  flexbox(v-for='group in listByType')
    flexbox-item(v-for='item in group')
      .card-container
        .card(:class="{'placeholder': item.placeholder}", v-link='{name: item.component}', @click='log(item.name)')
          .content
            i.icon-pano(:class='item.icon', :style='{background:item.color}')
            p {{item.name}}
</template>

<script>
import Flexbox from 'vux-components/flexbox'
import FlexboxItem from 'vux-components/flexbox-item'
import _ from 'lodash'
import log from '../../common/log'
import {
  assetTypes
} from '../../vuex/getters'

export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  vuex: {
    getters: {
      assetTypes
    }
  },
  methods: {
    log // 调用不了$root.log,被flexitem 截断了父子关系
  },
  computed: {
    listByType() {
      let enquiryType = this.$route.params.type
      let colspan = 2
      let index = 0
      let list = this.assetTypes.filter((v) => {
        return v.type === enquiryType
      })

      if (list.length % 2) {
        list.push({
          placeholder: true // 最后一个占位用
        })
      }

      let listObj = _.chain(list).groupBy((v) => {
        let group = _.floor(index / colspan)
        index++
        return group
      }).value()
      return listObj
    }
  }
}
</script>

<style lang="scss">
.asset-types {
  margin: 0.322061rem 0;
  background: #f8f9fb;
  padding: 0.805153rem;
}
</style>
