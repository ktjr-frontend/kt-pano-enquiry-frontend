<template>
  <div class="home">
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
  .buttons {
    padding: 0.161031rem 0.402576rem; //20px 50px
  }
}
</style>
