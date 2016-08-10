<template>
  <div class="home">
    <section class="head">
      <h2 class="title">
        <img class="head-logo" src="../assets/images/logo.svg" alt="logo">
        <span>询价系统</span>
      </h2>
      <h3 class="sub-title">
        专业精准的互金平台资产发行询价系统
      </h3>
    </section>
    <enquiry-features style="margin-bottom:1.288245rem;"></enquiry-features>
    <section class="buttons">
      <a v-link="{name: 'login'}" class="btn mt-40">登录</a>
      <a v-link="{name: 'register'}" class="btn btn-cyan mt-40">注册</a>
    </section>
  </div>
</template>
<script>
import EnquiryFeatures from './_parts/enquiry-features'

export default {
  route: {
    activate({
      to,
      next,
      abort
    }) {
      let user = JSON.parse(window.localStorage.user || '{}')
      if (user.status) {
        // abort()
        this.$router.go({
          name: 'enquiry'
        })
      }
      next()
    }
  },
  components: {
    EnquiryFeatures
  }
}
</script>
<style lang="scss">
.home {
  section.head {
    font-size: 0.322061rem; //40px
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 4.347826rem; //540px
    background: url('../assets/images/home-head.jpg') top center;
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
      position: relative;
      margin: 0;
      padding: 0.144928rem 0 0.144928rem 2em; //18px
      // border: 1px solid #c5ccd8;
      &:before {
        content: '';
        display: block;
        height: 0;
        border-top: 1px solid white;
        width: 2em;
        left: -.5em;
        position: absolute;
        top: 50%;
      }
    }
  }
  .buttons {
    display: flex;
    background: white;
    // height: 1.288245rem;
    // line-height: 1.288245rem;
    padding: 0.241546rem 0.402576rem; //50px
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .btn {
      flex: 1;
      display: block;
      margin: 0 0.241546rem;
    }
    // margin: 0.322061rem 0.402576rem; //40px 50px
  }
}
</style>
