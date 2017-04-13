<template lang="jade">
.perfect
  .form-title
    .left
      small *请上传与注册手机号一致的名片信息
    .right
      button.btn.btn-simple(@click='skipOver()', v-if="!isUpdated && !certifyApplication") 跳过
  validator(name='cardValidation')
    form(name='cardForm', novalidate='', @submit.prevent='onSubmit()')
      .form-container
        .form-group.card-container(:class="{'preview': cardFront.previewUrl}")
          .card-body
            span.card-note
              | 正面
            .btn-file
              input#file(v-el:card-front-input,  @change="cardOnChange('frontfile', $event)", type='file', name='frontfile', accept='image/*')
              input(type="hidden", v-model='cardFront.file', v-validate:frontfile='{required: {rule: true, message: "请上传名片正面"}}')
            .business-card-preview(v-el:card-front)
              .img-wrapper
                img(alt='名片预览', :src='cardFront.previewUrl', :style="cardFront.previewImgStyle")
                i.icon-pano.icon-plus(@click.prevent='resetInput()')
        .form-group.card-container(:class="{'preview': cardBack.previewUrl}")
          .card-body
            span.card-note 反面（可选）
            .btn-file
              input#file(v-el:card-back-input, @change="cardOnChange(null, $event, 'cardBack')", type='file', name='backfile', accept='image/*')
            //- .comment(v-show='!cardBack.file')
              //- p
                //- | 请上传与注册手机号一致的名片信息
                //- br
                | 如名片信息分布在正反两面，请将正反两张名片摆在一起拍照
            .business-card-preview(v-el:card-back)
              .img-wrapper
                img(alt='名片预览', :src='cardBack.previewUrl', :style="cardBack.previewImgStyle")
                i.icon-pano.icon-plus(@click.prevent="resetInput('cardBack')")
      .form-footer
        flexbox
          flexbox-item
            button.btn(v-if="!isUpdated", @click="$root.log({name: '下一步'})") 下一步
            button.btn(v-if="isUpdated", @click="$root.log({name: '确定'})") 确定
          //- flexbox-item(v-show='cardFront.file')
            button.btn.btn-gray(@click.prevent='resetInput()') 重新上传

</template>

<script>
import Flexbox from 'vux-components/flexbox'
import FlexboxItem from 'vux-components/flexbox-item'
import CardMixin from '../mixins/business-card-mixin.js'

export default {
  mixins: [CardMixin],
  components: {
    Flexbox,
    FlexboxItem
  },

  methods: {
    // 跳过
    skipOver() {
      const _self = this
      this.$root.bdTrack(['上传名片页', '点击', '跳过'])
      this.$root.showConfirm({
        confirmText: '马上去传',
        cancelText: '残忍拒绝',
        content: '上传名片才能完成认证哦',
        onCancel() {
          _self.$root.bdTrack(['上传名片页', '点击', '残忍拒绝'])
          _self.$router.go({
            name: 'prefer',
            query: _self.$route.query
          })
        },
        onConfirm() {
          _self.$root.bdTrack(['上传名片页', '点击', '马上去传'])
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/business-card.scss';
.form-title {
  padding: 0 0.362319rem; //45px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.207729rem; //150px
  .left {
    flex: 1;
    font-size: 0.289855rem; //36px
  }
  .right {
    width: 40%;
    text-align: right;
  }
  .btn {
    font-size: 0.354267rem; //44px
    height: 0.644122rem; //80px;
    line-height: 0.644122rem; //80px;
    width: 1.449275rem; //180px
    border-radius: 100px;
    color: #626d8b;
    color: #626d8b;
  }
  .btn-simple {
    color: #adb1bc;
    background: none;
    border: 0;
    padding: 0;
    width: auto;
  }
}

.form-container {
  padding: 0.885668rem 0.402576rem; //110px
  background: white;
}

.form-group {
  margin-bottom: 1.127214rem; //140px
  &:last-of-type {
    margin-bottom: 0;
  }
}

.form-footer {
  padding: 0.644122rem 0.402576rem; //80px 50px
}

form {
  background: none;
}
</style>
