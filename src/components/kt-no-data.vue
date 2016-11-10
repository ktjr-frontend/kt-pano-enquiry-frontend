<template lang="jade">
  group.kt-no-data-group(v-if='!$loadingRouteData')
    cell
      div.no-data(slot='after-title')
        i.icon-pano.icon-meng
        | {{content}}
</template>

<script>
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'

export default {
  props: {
    content: {
      default: '没有数据',
      type: String
    }
  },
  components: {
    Group,
    Cell
  }
}
</script>

<style lang="scss">
.kt-no-data-group {
  .no-data {
    color: #adb1bc;
    .icon-meng {
      font-size: 1.288245rem; //160px
      margin-bottom: 0.241546rem; //30px
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
