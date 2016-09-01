<template lang="jade">
.enquiry-features
  section
    .left
      i.icon-pano.icon-cloud
    .right
      h3 实时获取互联网渠道资产发行价格
      p 收集几十家主流互金平台价格信息，为您的资产找到最优互联网渠道发行价格
  section
    .left
      i.icon-pano.icon-mobile
    .right
      h3 为不同资产精准匹配互金平台
      p 数十万互金平台发行产品数据库，为您的资产找到最适合的互联网发行渠道
  section
    .left
      i.icon-pano.icon-earch
    .right
      h3 提供完善的互金资产发行服务
      p 上百个互联网渠道资产发行落地项目经验，熟知各大互金平台偏好及风控标准

</template>

<style lang="scss">
.enquiry-features {
  section {
    $blue: #4380dd;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    min-height: 3.220612rem; //400px
    padding: 0 0.885668rem; //100px
    &:nth-of-type(2) {
      .left {
        order: 1;
        text-align: right;
      }
      .right {
        text-align: right;
      }
      background: #f8f9fb;
    }
    .icon-pano {
      color: $blue;
      font-size: 1.207729rem; // 120px
    }
    h3 {
      font-size: 0.402576rem; //50px
      margin-bottom: 0.241546rem; //30px
      color: #737e9c;
    }
    p {
      color: #c5c9d2;
      line-height: 1.2em;
    }
    .left {
      text-align: left;
      width: 1.449275rem; //180px
    }
    .right {
      flex: 1;
    }
  }
}
</style>
