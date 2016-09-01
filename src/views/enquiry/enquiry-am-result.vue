<template src="./enquiry-result-template.jade" lang="jade"></template>

<script>
import wxMixin from '../../mixins/wx-mixin'
import eqMixin from './enquiry-result-mixin'

export default {
  mixins: [wxMixin, eqMixin],

  computed: {
    platformList() {
      let activeItem = this.enquiry_result.inquiry_tactics_data[this.activeIndex]

      return activeItem ? activeItem.platforms : []
    }
  },

  methods: {
    showRateTips() {
      this.$root.showAlert({
        content: this.rateTips
      })
    },
    updateSwiper() {
      this.$refs.xswiper.swiper.update(true)
    },
    onSlideChangeEnd(swiper) {
      this.activeIndex = swiper.activeIndex
    },
    onClick(swiper, event) {
      swiper.slideTo(swiper.clickedIndex)
    }
  },

  watch: {
    'enquiry_result': function(val) {
      this.$nextTick(() => {
        this.updateSwiper()
      })
    }
  },

  data() {
    return {
      activeIndex: 0,
      rateTips: '<div class="text-left">1、参考利率仅指平台发行利率，实际资产价格还需综合考虑交易结构成本、发行费率等（一般约为0.2%-0.3%），如需获取更精确的报价，可扫描底部二维码联系我们。<br>2、部分特定期限的资产由于发行平台过少，利率可能产生一定偏离。</div>'
    }
  }
}
</script>

<style lang="scss" src="./enquiry-result.scss"></style>
