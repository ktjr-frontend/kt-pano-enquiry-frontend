<template lang="jade">
.swiper-container(v-el:swipper='')
  .swiper-wrapper
    slot
  // 如果需要分页器
  .swiper-pagination
  // 如果需要导航按钮
  .swiper-button-prev
  .swiper-button-next
  // 如果需要滚动条
  .swiper-scrollbar
</template>
<script>
import Swiper from 'swiper/dist/js/swiper'
export default {
  props: ['slides'],
  ready() {
    new Swiper(this.$els.swipper, Object.asign({ // eslint-disable-line no-new
      direction: 'vertical',
      loop: true,
      // 如果需要分页器
      pagination: '.swiper-pagination',
      // 如果需要前进后退按钮
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      // 如果需要滚动条
      scrollbar: '.swiper-scrollbar'
    }, this.slides.settings || {}))
  }
}
</script>

<style lang="scss">
@import '~swiper/dist/css/swiper.css';
</style>
