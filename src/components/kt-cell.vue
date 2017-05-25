<template lang="jade">
.kt-cell.weui_cells(:class="class")
  .title(@click='titleClick($event)', v-if='title || icon')
    slot(name='title')
      | {{title}}
    slot(name='icon')
      i.icon-pano(:class='icon', @click='iconClick($event)') {{rightText}}
  .content
    slot
    | {{content}}
</template>

<script>
export default {
  props: ['title', 'icon', 'content', 'class', 'rightText'],
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
      border-bottom: 1px solid #3bc5ba;
      color: #29b9ae;
      min-height: 0.805153rem;
      line-height: 0.805153rem;
      // max-width: 100%;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
      // min-width: 0;
      .icon-pano.icon-refresh {
        font-size: 1.2em;
      }
    }
  }
  & + .sub-cell:before {
    border-top: 0;
  }
  .title {
    font-size: 0.402576rem; //50px
    min-height: 1.046699rem;
    line-height: 1.046699rem; // 130px
    margin: 0 0.402576rem; //50px
    border-bottom: 1px solid #eff2f7;
    position: relative;
    & [slot='title'] {
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .icon-pano {
      font-size: .7em;
      color: #29b9ae;
      padding: 1em 0 1em 1em;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      &.icon-refresh {
        font-size: 0.9em;
      }
      &.icon-arrow-bold {
        color: #adb1bc;
      }
    }
  }
  .file-list {
    .file-name {
      position: relative;
      padding: 0.07246376811594203rem 0.12077294685990339rem;
      border-radius: 0.12077294685990339rem;
      color: #3bc5ba;
      background: #f8f9fb;
      margin: .5em 0 0;
      padding-right: 2.5em;
      display: inline-block;
      &.no-icon {
        padding-right: 0.12077294685990339rem;
      }
    }
    .icon-plus {
      position: absolute;
      padding: 1em;
      font-size: 1em;
      right: -.5em;
      top: -.5em;
      display: inline-block;
      transform: rotate(45deg) scale(.8);
      vertical-align: -1px;
      margin-left: 1em
    }
  }
  textarea {
    background: #f8f9fb;
    border-radius: 0.080515rem; //10px
    border: 1px solid #eff2f7;
    padding: 0.241546rem; //30px
    display: block;
    flex: 1;
    resize: none;
    -webkit-appearance: none;
  }
  .textarea {
    position: relative;
    display: flex;
    position: relative;
    .count-box {
      position: absolute;
      bottom: 0;
      right: 5px;
      color: #dde1f0;
      &.warning {
        color: #e06161;
      }
    }
    .weui_icon {
      display: none;
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 9;
    }
    &.invalid {
      .weui_icon_warn {
        right: -1.2em;
        &:before {
          font-size: 0.33816425120772947rem;
        }
        display: block;
      }
      &.untouched {
        .weui_icon_warn {
          display: none;
        }
      }
    }
    &.not-empty {
      .weui_icon_clear {
        display: block;
      }
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
