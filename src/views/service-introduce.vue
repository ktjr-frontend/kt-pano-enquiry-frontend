<template>
  <div class="service-introduce">
    <group v-for="item in services">
      <cell :title="item.name" class="kt-cell">
        <div class="icon-circle" slot="icon">
          <i class="icon-pano" :class="item.icon"></i>
        </div>
        <div slot="after-title" class="kt-cell-content">{{item.desc}}</div>
      </cell>
    </group>
  </div>
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
        desc: '为金融资产的互联网发行、增信、评级、销售、交易提供全流程系统支持，包括但不限于资产意向发布、在线推介、在线询价协商、多平台登记结算支持、跨平台发行及转让、信息披露等。同时，配备专业的投行团队和交易市场运营团队，提供标准的全流程服务。'
      }, {
        icon: '',
        name: '资金聚合',
        desc: '全面覆盖主流的互联网金融平台，为金融资产在与传统金融市场资金的匹配之外提供补充性资金渠道，同时，跨平台的资金聚合能力也使大额融资项目在互联网分散销售成为可能。'
      }, {
        icon: '',
        name: '互联网发行',
        desc: '跟踪互联网渠道对金融资产的配置偏好和风险判断，及时反映互联网资金价格信息，提供金融资产在互联网平台上发行流通的合规性解决方案及系统支持。'
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
