<template>
  <div class="home">
    <section class="head">
      <h2 class="title">
        <img class="head-logo" src="../assets/images/logo-white.svg" alt="logo">
        <span>询价系统</span>
      </h2>
      <h3 class="sub-title">
        —— 专业精准的互金平台资产发行询价系统
      </h3>
    </section>
    <enquiry-features></enquiry-features>
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
  font-size: 0.322061rem; //40px
  .head {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 4.347826rem; //540px
    background: url('../assets/images/home-head.jpg') top center;
    background-size: contain;
    .title {
      margin-bottom: 0.805153rem; //100px
    }
    .head-logo {
      vertical-align: -.15em;
      position: static;
      height: 0.362319rem; //45px
      margin-right: 0.241546rem;
    }
    .sub-title {
      color: #c5ccd8;
      padding: 0.144928rem; //18px
      // border: 1px solid #c5ccd8;
    }
  }
  .buttons {
    padding: 0.161031rem 0.402576rem; //20px 50px
  }
}
</style>
