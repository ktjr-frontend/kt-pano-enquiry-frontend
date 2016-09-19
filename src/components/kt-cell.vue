<template lang="jade">
.kt-cell.weui_cells(:class="class")
  .title(@click='titleClick($event)', v-if='title || icon')
    slot(name='title')
      | {{title}}
    slot(name='icon')
      i.icon-pano(:class='icon', @click='iconClick($event)')
  .content
    slot
    | {{content}}
</template>

<script>
export default {
  props: ['title', 'icon', 'content', 'class'],
  methods: {
    titleClick(e) {
      this.$emit('on-title-click', e)
    },
    iconClick(e) {
      this.$emit('on-icon-click', e)
    }
  }
}
</script>

<style lang="scss">
.kt-cell {
  font-size: 0.322061rem; //40px
  &.sub-cell {
    margin-top: 0;
    .title {
      font-size: 0.322061rem; //40px
      border-bottom: 0.032206rem solid #3bc5ba;
      color: #29b9ae;
      height: 0.805153rem;
      line-height: 0.805153rem;
    }
  }
  & + .sub-cell:before {
    border-top: 0;
  }
  .title {
    font-size: 0.402576rem; //50px
    height: 1.046699rem;
    line-height: 1.046699rem; // 130px
    margin: 0 0.402576rem; //50px
    border-bottom: 1px solid #eff2f7;
    position: relative;
    .icon-pano {
      font-size: .6em;
      color: #29b9ae;
      padding: 1em 0 1em 1em;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .weui_cell {
    padding: 0;
    .weui_label {
      text-align: left;
    }
  }
  .content {
    text-align: center;
    padding: 0.402576rem; //50px
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // flex-direction: column;
  }
  .kt-list {
    border-bottom: 1px solid #eff2f7;
    &:last-of-type {
      border-bottom: 0;
    }
  }
  .default-content {
    display: inline-block;
    font-size: 0.322061rem; //40px
    border-radius: 100px;
    padding: 0 0.644122rem; //80px
    height: 0.885668rem; //110px
    line-height: 0.885668rem;
    text-align: center;
    border: 1px dashed #29b9ae;
    color: #29b9ae;
    .icon-pano {
      font-size: .5em;
      margin-right: .5em;
      vertical-align: .12em;
    }
  }
}
</style>
