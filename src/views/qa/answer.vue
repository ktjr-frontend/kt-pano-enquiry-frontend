<template lang="jade">
  section.qa.qa-answer
    kt-loading(:visible='$loadingRouteData')
    validator(name='validation')
      form(action='', novalidate='', @submit.prevent='onSubmit($event)')
        .group
          .header
            img(src="../../assets/images/logo.svg")
        .group
          kt-cell
            .user-card
              .avatar
                .icon-pano.icon-man-solid
              .info
                .name {{question.name}}
                .company {{question.company}}
            .question-card
              h3 向您咨询：
              .question {{question.content}}
              .fee
                i.icon-pano.icon-fee
                | 问题费用：{{question.fee}}元
        .group
          kt-cell
            .textarea-head
              .fee-tip
                | 解答问题，领取{{question.fee}}元现金
                i.icon-pano.icon-ticket
              small 您将在提问者确认解答后48小时内收到费用
            .textarea(v-validate-class='', :class='{"not-empty": model.content}', v-kt-textarea-count='model.content', display-into='.count-box', :max-length='validator.content.maxlength.rule')
              textarea(placeholder='请输入您的回答', v-model='model.content', v-validate:content='validator.content', rows="5")
              i.weui_icon.weui_icon_clear(v-touch:tap='clearModel("content")')
              i.weui_icon.weui_icon_warn(v-touch:tap='showError("content")')
              span.count-box 0/{{validator.content.maxlength.rule}}
            .kt-cell-footer
              button.btn 提交
</template>

<script>
import KtCell from '../../components/kt-cell.vue'
import KtLoading from '../../components/kt-loading.vue'
import {
  userQuestions,
  userOptionLogs,
  userAnswers
} from '../../common/resources.js'
import _ from 'lodash'

export default {
  components: {
    KtCell,
    KtLoading
  },

  route: {
    data({
      to: {
        query
      }
    }) {
      return userQuestions.get({
        q: query.q
      }).then(res => {
        return {
          question: res.json().res
        }
      }).catch(res => {
        this.$root.showToast(res.json().error || '抱歉，服务器繁忙！')
      })
    }
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
          userAnswers.save(this.model).then(res => {
            this.submitted = true
            this.$root.hideLoadingStatus()
            this.$router.go({
              name: 'qaSuccess',
              query: {
                type: 'answer'
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
    this.model.q = this.$route.query.q
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
        q: null,
        m: null,
        content: ''
      },
      question: {
        content: '',
        fee: null,
        name: '',
        company: ''
      },
      submitted: false, // 确认已经提交，正常跳转离开
      validator: {
        content: {
          required: {
            rule: true,
            message: '请填写您的回答'
          },
          maxlength: {
            rule: 800,
            message: '回答内容不能超过800字符'
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import './qa.scss';
.qa-answer {
  .textarea-head {
    text-align: left;
    .fee-tip {
      font-size: 0.281804rem; //35px
      color: white;
      background: #f6ce61;
      line-height: 0.724638rem; //90px
      border-radius: 100em;
      display: inline-block;
      padding: 0 1em;
    }
    small {
      display: block;
      color: #adb1bc;
      line-height: 0.885668rem; //110px
      padding-left: 1em;
    }
    .icon-ticket {
      font-size: 1.8em;
      vertical-align: middle;
      margin-left: .3em;
    }
  }
  .kt-cell-footer {
    border-top: 0;
    margin-top: 0;
  }
}
</style>
