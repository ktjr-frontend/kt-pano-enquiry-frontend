<template>
  <div class="swiper-container" v-el:swipper>
    <div class="swiper-wrapper">
      <slot>
      </slot>
    </div>

    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
  </div>
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
@import '~swiper/dist/swiper.css';
</style>
