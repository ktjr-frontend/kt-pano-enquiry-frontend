<template>
  <div class="enquiry-type">
    <group>
      <cell title="资产类" @click="$parent.log({name: '资产类'})" v-link="{name:'enquiryAssetTypes', params:{type: 'obligatory_right'}}" is-link class="kt-cell">
        <div class="icon-circle" slot="icon">
          <i class="icon-pano icon-man"></i>
        </div>
        <div slot="after-title" class="kt-cell-content">资产是指由企业过去经营交易各项事项形成预期会给企业经济利益的资源。</div>
      </cell>
    </group>
    <group>
      <cell title="资管类" @click="showAssetManageAlert()" is-link class="kt-cell">
        <div class="icon-circle" slot="icon">
          <i class="icon-pano icon-man"></i>
        </div>
        <div slot="after-title" class="kt-cell-content">集合资产管理：顾名思义是集合客户的资产，由专业的投资者(券商)进行管理。</div>
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
  methods: {
    goTo(name) {
      this.$router.go({
        name: name
      })
    },
    showAssetManageAlert() {
      this.$parent.log({
        name: '资管类'
      })
      this.$parent.showAlert({
        content: '资管类的询价功能正在开发中，敬请期待'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
