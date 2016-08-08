<template>
  <div class="enquiry-type">
    <group>
      <cell title="资产类" @click="$parent.log({name: '资产类'})" v-link="{name:'enquiryAssetTypes', params:{type: 'obligatory_right'}}" is-link class="kt-cell">
        <div class="icon-circle" slot="icon">
          <i class="icon-pano icon-ob"></i>
        </div>
        <div slot="after-title" class="kt-cell-content">资产类是指产品成立时即对应具体投资标的或指向特定融资人的产品。</div>
      </cell>
    </group>
    <group>
      <cell title="资管类" @click="showAssetManageAlert()" is-link class="kt-cell">
        <div class="icon-circle" slot="icon">
          <i class="icon-pano icon-asset"></i>
        </div>
        <div slot="after-title" class="kt-cell-content">资管类是指由特定管理人主动管理，产品发行无明确限额的灵活期限产品。</div>
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
        content: '资管类资产询价功能正在筹备中，敬请期待！'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  color: #42b983;
}

.weui_cell .icon-circle {
  line-height: 1.78744rem;
  background: #e7ebf3;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon-pano {
    display: flex;
    color: #b5bbcb;
    font-size: 0.925926rem; //115px
  }
}
</style>
