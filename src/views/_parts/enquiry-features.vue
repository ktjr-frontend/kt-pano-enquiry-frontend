<template>
  <div class="enquiry-features">
    <section class="head">
      <h2 class="title">
        <img class="head-logo" src="../../assets/images/logo.svg" alt="logo">
        <span>询价系统</span>
      </h2>
      <h3 class="sub-title">
        —— 专业精准的互金平台资产发行询价系统
      </h3>
    </section>
    <section>
      <div class="left">
        <i class="icon-pano icon-cloud"></i>
      </div>
      <div class="right">
        <h3>覆盖互金市场几十家主流平台数据</h3>
        <p>汇集国内主流互金平台金融产品发行信息，强大的市场数据库，让数据分析更简单。</p>
      </div>
    </section>
    <section>
      <div class="left">
        <i class="icon-pano icon-mobile"></i>
      </div>
      <div class="right">
        <h3>精准强大的运算系统模型</h3>
        <p>多维度数据透视分析，一站式实现从查询内容分析、数据收集、数据处理到数据展现的整个过程</p>
      </div>
    </section>
    <section>
      <div class="left">
        <i class="icon-pano icon-earch"></i>
      </div>
      <div class="right">
        <h3>十年金融专业团队运营支撑</h3>
        <p>专业的投行团队和交易市场运营团队，助力提供标准的金融资产互联网发行全流程服务</p>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.enquiry-features {
  section.head {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 4.347826rem; //540px
    background: url('../../assets/images/home-head.jpg') top center;
    background-size: contain;
    h2.title {
      margin-bottom: 0.362319rem; //45px
      font-size: 0.442834rem; //55px
    }
    .head-logo {
      vertical-align: -.15em;
      position: static;
      // height: 0.523349rem; //65px
      width: 5.152979rem; //640px
      margin-right: 0.241546rem;
    }
    h3.sub-title {
      color: #c5ccd8;
      font-size: 0.322061rem;
      padding: 0.144928rem; //18px
      // border: 1px solid #c5ccd8;
    }
  }
  section {
    $blue: #4380dd;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    min-height: 3.220612rem; //500px
    padding: 0 0.885668rem; //100px
    &:nth-of-type(3) {
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
