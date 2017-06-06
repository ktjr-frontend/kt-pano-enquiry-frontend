<template lang="jade">
  section.qa.qa-sucess
    validator(name='validation')
      form(action='', novalidate='', @submit.prevent='onSubmit($event)')
        .group
          .header
            img(src="../../assets/images/logo.svg")
        .group
          kt-cell
            .success-card.success-answer(v-if="$route.query.type === 'answer'")
              .success-icons
                i.icon-pano.icon-man3
                i.icon-pano.icon-checkbox
              h3 您的解答已经提交成功！
              small 添加PANO微信小秘书，您将会在咨询者确认<br>答案后48小时内收到费用：
              .wx-pano
                figure
                  figcaption PANO微信小秘书
                  img(src="../../assets/images/weixin-secret.jpeg")
                  small Kaitongpano
              p 使用微信扫描，或保存该图片，用微信扫一扫添加
            .success-card.success-question(v-if="$route.query.type !== 'answer'")
              .success-icons
                i.icon-pano.icon-man3
                i.icon-pano.icon-checkbox
              h3 您的咨询已经提交成功！
              small 请支付费用，然后静待解答吧！
              .wx-pano
                figure
                  figcaption PANO微信小秘书
                  img(src="../../assets/images/weixin-zhifu.jpg")
                  small Kaitongpano
              p 使用微信扫描，或保存该图片，用微信扫一扫支付

</template>

<script>
import KtCell from '../../components/kt-cell.vue'

export default {
  components: {
    KtCell
  }
}
</script>

<style lang="scss">
@import './qa.scss';
.success-card {
  font-size: 0.338164rem; //42px
  padding: 0.644122rem 0;
  .success-icons {
    position: relative;
  }
  .icon-man3 {
    font-size: 1.36876rem; //170px
    color: #adb1bc;
  }
  .icon-checkbox {
    color: #27c8c3;
    margin-left: -.5em;
    font-size: 0.563607rem; //70px
    vertical-align: -1px;
    border-radius: 50%;
    background: white;
  }
  h3 {
    font-weight: normal;
    margin: 0.402576rem 0; //50px
    color: #3f3f3f;
  }
  small {
    font-size: 0.83em;
    color: #adb1bc;
    margin: 0.402576rem 0; //50px
    display: block;
  }
  .wx-pano {
    margin: 0.402576rem 0; //50px
    text-align: center;
    figcaption {
      line-height: 0.724638rem; //90px
      color: #adb1bc;
      font-size: 0.281804rem; //35px
    }
    figure {
      width: 3.816425rem;
      padding: 0 0.161031rem; //20px
      background: #f8f9fb;
      margin: 0 auto;
      img {
        width: 100%;
        vertical-align: top;
      }
      small {
        line-height: 0.724638rem; //90px
        color: #adb1bc;
        margin: 0;
      }
    }
  }
  p {
    color: #3f3f3f;
    font-weight: normal;
  }
}
</style>
