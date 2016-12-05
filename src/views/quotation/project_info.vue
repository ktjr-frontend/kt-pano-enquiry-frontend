<template lang="jade">
.project-form
  kt-loading(:visible='$loadingRouteData')
  validator(name='validation')
    form(action='', novalidate='', @submit.prevent='onSubmit($event)')
      .group
        kt-cell(title='*项目名称')
          .textarea(v-validate-class='', :class='{"not-empty": model.name}', v-kt-textarea-count='model.name', display-into='.count-box', :max-length='validator.name.maxlength.rule')
            textarea(placeholder='请填写项目名称，建议包含资产名称、融资方、增信方、融资期限等要素', v-model='model.name', v-validate:name='validator.name')
            i.weui_icon.weui_icon_clear(v-touch:tap='clearModel("name")')
            i.weui_icon.weui_icon_warn(v-touch:tap='showError("name")')
            span.count-box 0/{{validator.name.maxlength.rule}}
      group.asset-type-picker
        input(type='hidden' v-model='model.asset_type_id', v-validate:asset_type_id='validator.asset_type_id')
        a.vux-popup-mask(href='javascript:void(0)')
        popup-picker(v-if='assetTypeList.length', title='*项目类型', :data='assetTypeList', :columns='2', :value.sync='asset_type_id', v-ref:picker3, show-name)
        i.weui_icon.weui_icon_warn(v-touch:tap='showError("asset_type_id")')
      .group
        kt-cell(title='项目说明书')
          .content-body
            .input-file
              input(type='file', @change='uploadFile($event)', capture='camera')
              span 上传文件/图片
                i.icon-pano.icon-plus
            span.remark 支持pdf,doc,png,jpg
            .file-list(v-for='file in model.files')
              a.file-name {{file.name}}
                i.icon-pano.icon-plus(@click.prevent='delFile(file)')
          .content-footer
            p 不方便传文件？可将文件发送到  helloPANO@ktjr.com<br>（邮件标题格式：项目名称-您的姓名-电话）
      .group
        kt-cell(title='项目详述')
          .textarea(v-validate-class='', :class='{"not-empty": model.desc}', v-kt-textarea-count='model.desc', display-into='.count-box', :max-length='validator.desc.maxlength.rule')
            textarea(placeholder='对项目信息进行更多的介绍', v-model='model.desc', v-validate:desc='validator.desc')
            i.weui_icon.weui_icon_clear(v-touch:tap='clearModel("desc")')
            i.weui_icon.weui_icon_warn(v-touch:tap='showError("desc")')
            span.count-box 0/{{validator.desc.maxlength.rule}}
      .group
        kt-cell(title='*联系方式')
          input(type='hidden', id='contact_method', v-model='model.contact_method', v-validate:contact_method='validator.contact_method')
          .contact-methods(v-validate-class='')
            .c-m-head 可以通过如下方式与我联系项目事宜（多选）：
              i.weui_icon.weui_icon_warn(v-touch:tap='showError("contact_method")')
            .line
              .checkbox-simple
                input(id='wx0', type='checkbox', name='contact_method', v-model='model.contact_method', value='0')
                label(for='wx0')
                  i.icon-pano.icon-checkbox.mr5
                  | 微信号：
              span(v-if='user.wx') {{user.wx}}
              input(v-show='!user.wx', v-model='model.wx_account', v-validate:wx_account='wxAccountValidator')
            .line
              .checkbox-simple
                input(id='wx1', type='checkbox', name='contact_method', v-model='model.contact_method', value='1')
                label(for='wx1')
                  i.icon-pano.icon-checkbox.mr5
                  | 手机号：
              span {{user.mobile}}
            .line(v-if='user.email')
              .checkbox-simple
                input(id='wx2', type='checkbox', name='contact_method', v-model='model.contact_method', value='2')
                label(for='wx2')
                  i.icon-pano.icon-checkbox.mr5
                  | 邮
                  span.blank
                  | 箱：
                  span {{user.email || '-'}}

      .buttons
        button 确定
</template>

<script>
import Group from 'vux-components/group'
import PopupPicker from 'vux-components/popup-picker'
import KtCell from '../../components/kt-cell.vue'
import KtLoading from '../../components/kt-loading.vue'
import _ from 'lodash'
import {
  persons,
  projects,
  panoFiles
} from '../../common/resources.js'
// import pruneParams from '../../common/helpers.js'
import {
  user
} from '../../vuex/getters.js'
import {
  updateUser
} from '../../vuex/actions.js'

export default {
  components: {
    Group,
    PopupPicker,
    KtCell,
    KtLoading
  },

  vuex: {
    getters: {
      user
    },
    actions: {
      updateUser
    }
  },

  route: {
    data({
      to: {
        params,
        query
      }
    }) {
      let projectP = Promise.resolve(null)
      let typesP = typesP = projects.get({
        content: 'types'
      })

      if (params.type !== 'add') {
        projectP = persons.get({
          content: 'project_submitted_detail',
          project_id: params.type
        })
      }

      return Promise.all([typesP, projectP]).then(([res1, res2]) => {
        let types = res1.json().res
        let list = []

        _.each(types, t => {
          list.push({
            name: t.name,
            value: String(t.id)
              // parent: 1000
          })
          _.each(t.data, t2 => {
            list.push({
              name: t2.name,
              value: String(t2.id),
              parent: String(t.id)
            })
          })
        })

        // 项目类型默认值
        // let defaultAssetTypeId = [String(types[0].id), String(types[0].data[0].id)]
        let defaultAssetTypeId = []
        let project = {}

        if (res2) {
          project = res2.json().res
          project.project_id = project.id
          project.asset_type_id = project.asset_type

          // 重构数据
          let loop = true
          _.each(types, t => {
            _.each(t.data, td => {
              if (td.id === project.asset_type_id) {
                defaultAssetTypeId = [String(t.id), String(td.id)]
                loop = false
                return false
              }
            })
            return loop
          })

          return {
            assetTypeList: list,
            asset_type_id: defaultAssetTypeId,
            model: project
          }
        } else {
          // 如果参数上有
          if (query.asset_type) {
            let loop = true
            _.each(types, t => {
              _.each(t.data, td => {
                if (td.name === query.asset_type) {
                  defaultAssetTypeId = [String(t.id), String(td.id)]
                  loop = false
                  return false
                }
              })
              return loop
            })
          }

          return {
            assetTypeList: list,
            asset_type_id: defaultAssetTypeId
          }
        }
      }).catch(res => {
        this.$root.showToast(res.json().error || '抱歉，服务器繁忙！')
      })
    },

    activate({
      to,
      from,
      next
    }) {
      this.submitRedirect = to.query.redirect_to ? decodeURIComponent(to.query.redirect_to) : from.path
      next()
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
    }
  },

  methods: {
    // 清空表单
    clearModel(name) {
      this.model[name] = ''
    },

    clearPreRouteCache() {
      if (this.$route.params.type === 'add' && this.$router._prevTransition) {
        // this.$router._prevTransition.to 上一个路由
        delete window.sessionStorage[this.$router._prevTransition.to.path]
      }
    },

    uploadFile(e) {
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      this.fileUploading = true
      this.$root.showLoadingStatus()

      panoFiles.update({}, formData)
        .then(res => {
          this.model.files.push(res.json().res)
          this.$root.hideLoadingStatus()
        })
        .catch(res => {
          this.$root.showToast(res.json().error || '抱歉，服务器繁忙！')
          this.$root.hideLoadingStatus()
        })
    },

    delFile(file) {
      this.model.files.$remove(file)
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
          let project = _.cloneDeep(this.model)
          let savePromise
          project.files = _.map(this.model.files, 'id')

          this.$root.showLoadingStatus()
          if (this.$route.params.type === 'add') { // 新建项目
            project.platform_id = this.$route.query.platform_id
            project.kaitong_refer = this.$route.query.kaitong_refer
            savePromise = projects.save({}, project)
          } else { // 编辑项目
            savePromise = projects.update({}, project)
          }

          savePromise.then(res => {
            this.$root.showAlert({
              content: '<p>提交成功，我们将在2个工作日内完成项目审核，并推送给相关互金平台。</p><p>每天登录PANO，每天“选择”一个新机构！</p>',
              onHide: function() {
                this.$router.go({
                  name: 'myProjectDetail',
                  params: {
                    id: res.json().res
                  }
                  // path: this.submitRedirect.replace(/(\?|&){1}_r=\d+/g, '') || '/quotation/ob',
                  // query: {
                  //   _r: Math.random().toString().slice(2)
                  // }
                })
              }.bind(this)
            })

            this.user.wx = this.user.wx || this.model.wx_account
            this.updateUser(this.user)

            this.clearPreRouteCache()
            this.submitted = true
            this.$root.hideLoadingStatus()
          }).catch(res => {
            this.$root.showToast(res.json().error || '抱歉，服务器繁忙！')
            this.$root.hideLoadingStatus()
          })
        }
      })
    }
  },

  watch: {
    'asset_type_id' () {
      this.$nextTick(() => {
        this.model.asset_type_id = this.asset_type_id[1]
      })
    },
    'contact_method_length' () { // hack vue-validator not work well for checkbox
      this.$validate('contact_method')
    }
  },

  computed: {
    contact_method_length() { // for watch
      return this.model.contact_method.length
    },
    'wxAccountValidator' () {
      return _.includes(this.model.contact_method, '0') && !this.user.wx ? {
        required: {
          rule: true,
          message: '请填写微信账号！'
        },
        maxlength: {
          rule: 50,
          message: '请填写微信账号，2-50个字符'
        },
        minlength: {
          rule: 2,
          message: '请填写微信账号，2-50个字符'
        }
      } : {
        maxlength: 100 //hack vue-validate bug
      }
    }
  },

  data() {
    return {
      model: {
        project_id: null,
        name: '',
        files: [],
        asset_type_id: '',
        desc: '',
        wx_account: '',
        contact_method: []
      },
      submitRedirect: '', // 提交表单后的跳转路径
      submitted: false, // 确认已经提交，正常跳转离开
      asset_type_id: [], // 用于popuppicker的逻辑，区分model.asset_type_id
      assetTypeList: [], // 项目类型列表
      validator: {
        name: {
          required: {
            rule: true,
            message: '请填写项目名称'
          },
          maxlength: {
            rule: 30,
            message: '项目名称不能大于30字符'
          }
        },
        asset_type_id: {
          required: {
            rule: true,
            message: '请选择项目类型'
          }
        },
        contact_method: {
          required: {
            rule: true,
            message: '请选择联系方式'
          }
        },
        desc: {
          maxlength: {
            rule: 3000,
            message: '项目详述不能大于3000字符'
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.textarea {
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
}

textarea {
  background: #f8f9fb;
  border-radius: 5px;
  border: 1px solid #eff2f7;
  padding: 0.241546rem; //30px
  display: block;
  flex: 1;
  resize: none;
  -webkit-appearance: none;
}

.input-file {
  position: relative;
  display: inline-block;
  overflow: hidden;
  /*width: 3.019324rem; //375px*/
  padding: 2px 5px;
  text-align: center;
  background: #194373;
  border-radius: 5px;
  color: white;
  vertical-align: middle;
  &:active {
    background: lighten(#194373, 10%);
  }
  input {
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
  }
  .icon-plus {
    font-size: 1em;
    transform: scale(.7);
    vertical-align: -1px;
    margin-left: 5px;
    color: #3bc5ba;
    display: inline-block;
  }
}

.input-file + span.remark {
  margin-left: 1em;
  color: #adb1bc;
}

.content-body {
  /*font-size: 36px;*/
  text-align: left;
  padding-bottom: 0.322061rem; //40px
}

.content-footer {
  color: #adb1bc;
  padding: 0.322061rem 0 0; //40px
  border-top: 1px solid #eff2f7;
  /*text-align: left;*/
}

.buttons {
  padding: 0.402576rem; // 50px
}

#contact_method {
  &.invalid.touched {
    & ~ .contact-methods .weui_icon_warn {
      display: inline-block;
    }
  }
}

.contact-methods {
  text-align: left;
  .checkbox-simple {
    vertical-align: middle;
    margin-right: .5em;
  }
  .weui_icon_warn {
    vertical-align: 1px;
    display: none;
    &:before {
      font-size: 14px;
    }
  }
  .line {
    line-height: 2em;
    input {
      text-indent: .5em;
      background: #f8f9fb;
      border: 1px solid #eff2f7;
      border-radius: 5px; //5px
      width: 3.864734rem; // 480px
      height: 0.563607rem; //70px
    }
  }
}

.c-m-head {
  color: #adb1bc;
  margin-bottom: 1em;
}

.asset-type-picker {
  .weui_icon_warn {
    position: absolute;
    display: none;
    /*font: 14px;*/
    right: 0;
    line-height: 0;
    top: 50%;
    transform: translateY(-50%);
    &:before {
      font-size: 14px;
    }
  }
  input.invalid.touched ~ .weui_icon_warn {
    display: block;
  }
}
</style>
