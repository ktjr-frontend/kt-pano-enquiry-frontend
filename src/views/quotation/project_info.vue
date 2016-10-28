<template lang="jade">
.project-form
  validator(name='validation')
    form(action='', novalidate='', @submit.prevent='onSubmit($event)')
      .group
        kt-cell(title='*项目名称')
          .textarea(v-validate-class='', :class='{"not-empty": model.name}', v-kt-textarea-count='model.name', display-into='.count-box', :max-length='validator.name.maxlength.rule')
            textarea(placeholder='请填写项目名称，如增信方-融资方／资产名称-期限', v-model='model.name', v-validate:name='validator.name')
            i.weui_icon.weui_icon_clear(v-touch:tap='clearModel("name")')
            i.weui_icon.weui_icon_warn(v-touch:tap='showError("name")')
            span.count-box 0/{{validator.name.maxlength.rule}}
      group
        input(type='hidden' v-model='model.asset_type_id', v-validate:asset_type_id='validator.asset_type_id')
        popup-picker(v-if='assetTypeList.length', title='*项目类型', :data='assetTypeList', :columns='2', :value.sync='asset_type_id', v-ref:picker3, show-name)
      .group
        kt-cell(title='资料')
          .content-body
            .input-file
              span 上传文件/图片
                i.icon-pano.icon-plus
              input(type='file', @change='uploadFile($event)', accept='.pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif')
            span.remark 支持pdf,doc,txt,png,jpg
            .file-list(v-for='file in model.files')
              a.file-name {{file.name}}
                i.icon-pano.icon-plus(@click.prevent='delFile(file)')
          .content-footer
            p 不方便传文件？可将文件发送到  helloPANO@ktjr.com<br>（邮件标题格式：项目名称-您的姓名-电话）
      .group
        kt-cell(title='项目详述')
          .textarea(v-validate-class='', :class='{"not-empty": model.desc}')
            textarea(placeholder='对项目信息进行更多的介绍', v-model='model.desc', v-validate:desc='validator.desc')
            i.weui_icon.weui_icon_clear(v-touch:tap='clearModel("desc")')
            i.weui_icon.weui_icon_warn(v-touch:tap='showError("desc")')
      .group
        kt-cell(title='*联系方式')
          .contact-methods
            .c-m-head 后续通过什么方式与您进行项目对接？
            .line
              .checkbox-simple
                input(id='wx0', type='radio', v-model='model.contact_method', :value='0')
                label(for='wx0')
                  i.icon-pano.icon-checkbox
              | 微信号：
              span(v-if='user.wx') {{user.wx}}
              input(v-show='!user.wx', v-model='model.wx_account', v-validate:wx_account='wxAccountValidator')
            .line
              .checkbox-simple
                input(id='wx1', type='radio', v-model='model.contact_method', :value='1')
                label(for='wx1')
                  i.icon-pano.icon-checkbox
              | 手机号：
              span {{user.mobile}}
            .line
              .checkbox-simple
                input(id='wx2', type='radio', v-model='model.contact_method', :value='2')
                label(for='wx2')
                  i.icon-pano.icon-checkbox
              | 邮
              span.blank
              | 箱：
              span {{user.email}}

      .buttons
        button 确定

  </template>

<script>
import Group from 'vux-components/group'
import PopupPicker from 'vux-components/popup-picker'
import KtCell from '../../components/kt-cell.vue'
import _ from 'lodash'
import {
  projects,
  panoFiles
} from '../../common/resources.js'
// import pruneParams from '../../common/helpers.js'
import {
  user
} from '../../vuex/getters.js'

export default {
  components: {
    Group,
    PopupPicker,
    KtCell
  },

  vuex: {
    getters: {
      user
    }
  },

  ready() {
    projects.get({
      content: 'types'
    }).then(res => {
      let types = res.json().res
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

      this.assetTypeList = list
      this.$nextTick(() => {
        this.asset_type_id = [String(types[0].id), String(types[0].data[0].id)]
      })
    }).catch(res => {
      this.$root.showToast(res.json().error || '抱歉，服务器繁忙！')
    })
  },

  methods: {
    // 清空表单
    clearModel(name) {
      this.model[name] = ''
    },

    uploadFile(e) {
      let formData = new FormData()
      formData.append('file', e.target.files[0])

      panoFiles.update({}, formData)
        .then(res => {
          this.model.files.push(res.json().res)
        })
        .catch(res => {
          this.$root.showToast(res.json().error || '抱歉，服务器繁忙！')
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

        }
      })
    }
  },

  watch: {
    'asset_type_id' () {
      this.model.asset_type_id = this.asset_type_id[1]
    }
  },

  computed: {
    'wxAccountValidator' () {
      return {
        required: {
          rule: this.model.contact_method === 0,
          message: '请填写微信账号！'
        }
      }
    }
  },

  data() {
    return {
      model: {
        project_id: null,
        name: '',
        files: [{
          id: '1',
          name: 'ahhahfaf.jpg',
          url: 'adsfasf'
        }],
        asset_type_id: '',
        desc: '',
        wx_account: '',
        contact_method: null
      },
      asset_type_id: [], // 用于popuppicker的逻辑，区分model.asset_type_id
      assetTypeList: [],
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
  }
  .icon-plus {
    font-size: 1em;
    transform: scale(.8);
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

.file-list {
  .file-name {
    position: relative;
    padding: 3px 5px;
    border-radius: 5px;
    color: #3bc5ba;
    background: #f8f9fb;
    margin: .5em 0 0;
    padding-right: 2.5em;
    display: inline-block;
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

.contact-methods {
  .checkbox-simple {
    vertical-align: middle;
    margin-right: .5em;
  }
  text-align: left;
  .line {
    line-height: 2em;
    input {
      text-indent: .5em;
      background: #f8f9fb;
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
</style>
