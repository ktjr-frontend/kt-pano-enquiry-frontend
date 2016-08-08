<template>
  <div class="asset-types">
    <flexbox v-for="group in listByType">
      <flexbox-item v-for="item in group">
        <div class="card-container">
          <div class="card" v-link="{name: item.component}" @click="log(item.name)">
            <div class="content">
              <i class="icon-pano" :class="item.icon" :style="{background:item.color}"></i>
              <p>{{item.name}}</p>
            </div>
          </div>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import Flexbox from 'vux-components/flexbox'
import FlexboxItem from 'vux-components/flexbox-item'
import _ from 'lodash'
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
    log(name) {
      this.$parent.log({
        name: name
      })
    }
  },
  computed: {
    listByType: function() {
      let enquiryType = this.$route.params.type
      let colspan = 2
      let index = 0
      let list = this.assetTypes.filter((v) => {
        return v.type === enquiryType
      })

      if (list.length % 2) {
        list.push([{
          placeholder: true // 最后一个占位用
        }])
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
