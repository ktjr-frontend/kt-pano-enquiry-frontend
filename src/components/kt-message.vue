<template lang="jade">
.message(v-show='show', transition='slideDown')
  i.weui_icon.weui_icon_clear(@click='close()')
  p {{{content}}}
</template>

<script>
export default {
  props: ['show', 'content', 'onClose'],
  methods: {
    close() {
      this.show = false
      this.onClose && this.onClose()
    }
  }
}
</script>

<style lang="scss">
.message {
  background: rgba(0, 0, 0, .7);
  padding: 0.322061rem; //40px
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  color: white;
  p {
    margin-right: 0.322061rem; //40px
  }
  .weui_icon_clear {
    position: absolute;
    right: 0.161031rem;
    top: 0.161031rem; //20px
    &:active {
      &:before {
        color: red;
      }
    }
  }
}
</style>
