<template lang="jade">
.service-introduce
  group(v-for='item in services')
    cell.kt-cell(:title='item.name')
      //
        <div class="icon-circle" slot="icon">
        <i class="icon-pano" :class="item.icon"></i>
        </div>
      .kt-cell-content(slot='after-title') {{item.desc}}
</template>

<script>
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'

export default {
  components: {
    Group,
    Cell
  },
  data() {
    return {
      services: [{
        icon: '',
        name: '全流程服务',
        desc: '为金融资产的互联网发行、增信、评级、销售、交易提供全流程系统支持，包括但不限于资产意向发布、在线推介与询价协商、多平台登记结算支持等等。'
      }, {
        icon: '',
        name: '资金聚合',
        desc: '全面覆盖主流互金平台，为金融资产提供传统金融市场资金匹配之外的补充性资金渠道，使大额融资项目在互联网分散销售成为可能。'
      }, {
        icon: '',
        name: '互联网发行',
        desc: '跟踪互联网渠道对金融资产的配置偏好、风险判断及价格信息，提供金融资产在互金平台发行流通的合规性解决方案及系统支持。'
      }, {
        icon: '',
        name: '最优价格',
        desc: '支持在金融资产发行过程中应用竞争性的市场化定价机制，根据分层次的风控标准为资产匹配最优的资金价格。'
      }]
    }
  }
}
</script>

<style lang="scss">
.service-introduce {
  margin-top: -0.362319rem;
}
</style>
