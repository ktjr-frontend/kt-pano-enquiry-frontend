<template lang="jade">
  section.qa.qa-question
    validator(name='validation')
      form(action='', novalidate='', @submit.prevent='onSubmit($event)')
        .group
          .header
            img(src="../../assets/images/logo.svg")
        .group
          kt-cell
            ul.tip-list
              li 互金平台 / P2P / 交易所 / 消费金融 / 小微金融等相关机构全覆盖
              li 3000+金融专业人士，快速解答您的咨询
            //- .tip 提问说明：请详细描述您的问题，您的问题越详细，越容易得到精准的回答。愿意支付的费用越高，被回答的速度越快。如48小时内无人回答，您的费用将会全额退还。
        .group
          kt-cell(title='*我的咨询')
            .textarea(v-validate-class='', :class='{"not-empty": model.content}', v-kt-textarea-count='model.content', display-into='.count-box', :max-length='validator.content.maxlength.rule')
              textarea(placeholder='请详细描述您要咨询的问题，您的描述越详细，越容易得到精准的解答哦 : )', v-model='model.content', v-validate:content='validator.content', rows="5")
              i.weui_icon.weui_icon_clear(v-touch:tap='clearModel("content")')
              i.weui_icon.weui_icon_warn(v-touch:tap='showError("content")')
              span.count-box 0/{{validator.content.maxlength.rule}}
            .amendline(v-validate-class='', :class='{"not-empty": model.fee}',)
              .title *咨询费用：
              input(type="text", v-model="model.fee", v-validate:fee="validator.fee")
              | 元
              i.weui_icon.weui_icon_clear(v-touch:tap='clearModel("fee")')
              i.weui_icon.weui_icon_warn(v-touch:tap='showError("fee")')
            .amendline
              .tip 您愿意支付的咨询费用越高，咨询被解答的速度越快。在收到解答后24小时内，如您对解答无异议，该费用将支付给解答者。如48小时内无人解答，该费用将全额退还。
            .amendline.bd-t(v-validate-class='')
              .title *是否匿名：
              .checkbox-simple
                input(id='anonymity1', type='radio', name='anonymity1', v-model='model.anonymity', :value='true')
                label(for='anonymity1')
                  i.icon-pano.icon-checkbox.mr5
                  | 是
              .checkbox-simple
                input(id='anonymity2', type='radio', name='anonymity2', v-model='model.anonymity', :value='false')
                label(for='anonymity2')
                  i.icon-pano.icon-checkbox.mr5
                  | 否
            .kt-cell-footer
              button.btn 提交
</template>

<script>
import KtCell from '../../components/kt-cell.vue'
import {
  userQuestions,
  userOptionLogs
} from '../../common/resources.js'
import _ from 'lodash'

export default {
  components: {
    KtCell
  },
  methods: {
    // 清空表单
    clearModel(name) {
      this.model[name] = ''
    },

    showError(name) {
      let error = _.find(this.$validation.errors, e => e.field === name)
      error && this.$root.showToast(error.message)
    },

    showFirstError() {
      this.$root.showToast(this.$validation.errors[0].message)
    },

    onSubmit() {
      this.$validate(true, () => {
        if (this.$validation.invalid) {
          this.showFirstError()
        } else {
          this.$root.showLoadingStatus()
          userQuestions.save(this.model).then(res => {
            this.submitted = true
            this.$root.hideLoadingStatus()
            this.$router.go({
              name: 'qaSuccess',
              query: {
                type: 'question'
              }
            })
          }).catch(res => {
            this.$root.showToast(res.json().error || '抱歉，服务器繁忙！')
            this.$root.hideLoadingStatus()
          })
        }
      })
    }
  },

  ready() {
    this.model.m = this.$route.query.m
    userOptionLogs.save({
      m: this.model.m,
      option: encodeURIComponent(location.href)
    })
  },

  canDeactivate({
    next,
    abort
  }) {
    if (this.$validation.touched && !this.submitted) {
      this.$root.showConfirm({
        content: '数据还没有提交，确定离开吗？',
        onConfirm() {
          next()
        },
        onCancel() {
          abort()
        }
      })
    } else {
      next()
    }
  },

  data() {
    return {
      model: {
        fee: null,
        m: null,
        content: '',
        anonymity: true
      },
      submitted: false, // 确认已经提交，正常跳转离开
      validator: {
        content: {
          required: {
            rule: true,
            message: '请填写您的问题'
          },
          maxlength: {
            rule: 300,
            message: '问题内容不能超过300字符'
          }
        },
        fee: {
          required: {
            rule: true,
            message: '请输入咨询费用'
          },
          pint: true,
          min: {
            rule: 0,
            message: '不能小于0元'
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import './qa.scss';
</style>
