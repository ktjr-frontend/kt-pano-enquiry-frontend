<template lang="jade">
.quotation-con(:class='{shared: $route.query.shared}')
  .top-tips(v-if='$route.query.shared')
    开通PANO为您报价：
  .tabs(v-if='$route.name !== "quotationDetail"')
    button-tab
      button-tab-item(v-link='{name:"quotationOB", query: $route.query}', :selected="$route.name === 'quotationOB'") 资产类
      button-tab-item(v-link='{name:"quotationAM", query: $route.query}', :selected="$route.name === 'quotationAM'") 资管类
    i.icon-pano.icon-share(@click='wxShare()')
  router-view

</template>

<script>
import ButtonTab from 'vux-components/button-tab'
import ButtonTabItem from 'vux-components/button-tab-item'

export default {
  components: {
    ButtonTab,
    ButtonTabItem
  },
  methods: {
    wxShare() {
      this.$root.showAlert({
        content: '点击右上角，马上分享给你的小伙伴吧！'
      })
    }
  }
}
</script>

<style lang="scss">
$green: #29b9ae;
.quotation-con {
  &.shared {
    padding-bottom: 1.932367rem; //240pxs
  }
  .top-tips {
    height: 0.805153rem;
    line-height: 0.805153rem; //100px
    font-size: 0.322061rem; //40px
    color: white;
    background: $green;
    padding: 0 0.402576rem; //50px
  }
  .tabs {
    position: relative;
    background: white;
    padding: 0.161031rem 0; //20px
    .vux-button-group {
      margin: 0 auto;
      width: 3.623188rem; //415px
      &>a {
        font-size: 0.354267rem; //44px
        color: #737e9c;
        height: 0.611916rem; //76px
        line-height: 0.611916rem; //76px
        border: 1px solid $green;
        &.hover,
        &.vux-button-group-current,
        &:active {
          color: white;
          border-color: $green;
          background: $green;
        }
      }
    }
    .icon-share {
      position: absolute;
      right: 0; // 30px
      top: 50%;
      transform: translateY(-50%);
      color: $green;
      padding: 0.161031rem;
    }
  }
}

section.quotation {
  position: relative;
  .head {
    padding: 0 0.241546rem;
    height: 0.805153rem;
    line-height: 0.805153rem;
    color: #adb1bc;
    text-align: right;
    font-size: 0.289855rem; //36px
  }
  .table-container {
    background: white;
    position: relative;
    .icon-arrow-right {
      z-index: 19;
      position: absolute;
      // right: 0.442834rem; //55px
      top: 0;
      right: 0;
      padding: 0 0.402576rem 0 0.080515rem; //50px 10px
      background: white;
      height: 0.764895rem; //95px
      &:after {
        top: 0.201288rem; //25px
        border-width: 1px 1px 0 0;
        border-color: $green;
        &:active {
          border-color: lighten($green, 10%);
        }
      }
    }
    .icon-arrow-left {
      position: absolute;
      z-index: 19;
      left: 0; //45px
      top: 0; //30px
      height: 0.764895rem; //95px
      background: white;
      padding: 0 0.080515rem 0 0.362319rem; //45px 10px
      margin-left: 0;
      &:after {
        top: 0.201288rem; //25px
        border-width: 0 0 1px 1px;
        border-color: $green;
        &:active {
          border-color: lighten($green, 10%);
        }
      }
    }
  }
  .table-bg,
  .table {
    padding: 0 0.402576rem; //50px
  }
  .thead {
    font-size: 0.289855rem; //36px
    height: 0.764895rem; //95px
    border-bottom: 1px solid #3bc5ba;
    position: relative;
    color: $green;
    line-height: 0.764895rem; //95px
    .th-row {
      display: flex;
      .th {
        flex: 1;
        width: 33.33%;
        text-align: center;
      }
    }
  }
  .tbody {
    .th-row {
      font-size: 0.322061rem; //40px
      // padding: 0.241546rem 0; //30px
      color: $green;
      height: 0.78905rem; //98px
      line-height: 0.78905rem;
      border-bottom: 1px solid #eff2f7;
    }
    .td-row {
      display: flex;
      height: 1.36876rem; //170px
      border-bottom: 1px solid #eff2f7;
      .td {
        flex: 1;
        width: 33.33%;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &:active {
          background: #f1f6fb;
        }
      }
      .title {
        font-size: 0.442834rem; //55px
        margin-bottom: 0.080515rem; //10px
      }
      .tips {
        font-size: 0.289855rem; //36px
        color: #adb1bc;
        span.asc {
          color: #e06161;
        }
        span.desc {
          color: #35bd62;
        }
        span.blank {
          &:before {
            content: '空'
          }
          opacity: 0;
          width: 0;
          display: inline-block;
        }
      }
    }
  }
}
</style>
