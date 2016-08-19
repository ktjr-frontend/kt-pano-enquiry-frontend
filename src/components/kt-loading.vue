<template>
  <div v-el:flex-container class="flex-container" :style="{height: winH + 'px'}" v-show="visible">
    <spinner type="ios"></spinner>
  </div>
</template>

<script>
import Spinner from 'vux-components/spinner'

export default {
  props: ['visible'],
  components: {
    Spinner
  },
  ready() {
    this.$els.flexContainer.addEventListener('touchstart', (e) => {
      e.preventDefault()
      e.stopPropagation()
    })
  }
}
</script>

<style lang="scss" scoped>
.flex-container {
  background: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
}
</style>
