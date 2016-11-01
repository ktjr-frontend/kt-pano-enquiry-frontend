<template lang="jade">
.project-detail
  kt-loading(:visible='$loadingRouteData')
  .head
    h3 {{project.name}}
    //- .sub-title 待查看
    //- .icon-pano.icon-edit(v-link='{name:"projectInfo", params:{type: project.id}}')
  .group-title
    .left 项目信息
    .right 更新时间：{{project.updated_at}}
  group
    cell(title='资产类型')
      {{assetTypeName}}
  .group
    kt-cell(title='相关文件')
      div(v-if='!project.files || !project.files.length') 无
      .file-list(v-for='file in project.files')
        a.file-name.no-icon {{file.name}}
  .group
    kt-cell(title='项目描述')
      div.desc {{project.desc || '无'}}
  .group-title
    .left 项目信息
  .group
    kt-cell
      .profile-card
        .icon(:class='[submitterInfo.avatarDirection]')
          i.icon-pano.icon-meng(v-if='!project.submitter_info.logo')
          img(v-if='project.submitter_info.logo', :src='project.submitter_info.logo', :style='submitterInfo.avatarStyles')
        .card-info
          .name {{project.submitter_info.name || '无名氏'}}
          .institution_name {{project.submitter_info.institution_name || '公司不详'}}
          .job(:class='{"has-all": project.submitter_info.department && project.submitter_info.job}')
            span {{project.submitter_info.department}}
            span {{project.submitter_info.job}}
      .other-info(v-if='project.submitter_info.business_types.length || project.submitter_info.asset_types.length')
        .business_types(v-if='project.submitter_info.business_types.length')
          .name 业务角色
          .types {{project.submitter_info.business_types.join('、')}}
        .asset_types(v-if='project.submitter_info.asset_types.length')
          .name 资产类型
          .types {{project.submitter_info.asset_types.join('、')}}
  .buttons-footer.fixed(:class='{"more-than-one": includes(["to_audit", "audited"], project.refer_status)}')
    button.green(v-show='includes(["to_audit", "audited"], project.refer_status)', @click='notInterested()') 不感兴趣
    button(v-show='includes(["to_audit", "audited", "not_interest"], project.refer_status)', @click='interested()') 感兴趣
    button.gray(v-show='includes(["docking", "interested"], project.refer_status)') 项目联系中
    button.gray(v-show='project.refer_status === "docking_passed"') 对接成功
    button.gray(v-show='project.refer_status === "docking_failed"') 对接失败
    button.gray(v-show='project.refer_status === "expired"', @click='expired()')
</template>

<script>
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import KtLoading from '../../components/kt-loading.vue'
import KtCell from '../../components/kt-cell.vue'
import {
  persons,
  projects,
  projectInterest
} from '../../common/resources.js'
import _ from 'lodash'
import Utils from '../../common/utils.js'

export default {
  components: {
    Group,
    Cell,
    KtLoading,
    KtCell
  },

  route: {
    data({
      to: {
        params,
        query
      }
    }) {
      let projectP = persons.get({
        content: 'project_commended_detail',
        project_id: params.id,
        ...query
      })

      let typesP = projects.get({
        content: 'types'
      })

      return Promise.all([projectP, typesP]).then(([res1, res2]) => {
        let project = res1.json().res

        return {
          project: project,
          assetTypeList: res2.json().res
        }
      }).catch(res => {
        this.$root.showToast(res.json().error || '抱歉，服务器繁忙！')
      })
    }
  },

  methods: {
    includes: _.includes,
    notInterested() {
      this.$root.showConfirm({
        title: '对该项目不感兴趣？',
        content: '请尽量详细地配置个人偏好，以便更精确地为您推送项目。',
        onConfirm: function() {
          this.$root.showLoadingStatus()
          projectInterest.delete({}, {
            project_id: this.$route.params.id,
            ...this.$route.query
          }).then(res => {
            this.project.refer_status = 'not_interest'
            this.$root.hideLoadingStatus()
          }).catch(res => {
            this.$root.showToast(res.json().error || '抱歉，服务器繁忙！')
          })
        }.bind(this)
      })
    },

    interested() {
      this.$root.showConfirm({
        title: '对该项目感兴趣？',
        content: '如对该项目感兴趣，我们将会在2个工作日内与您联系，沟通下一步进展。',
        onConfirm: function() {
          this.$root.showLoadingStatus()
          projectInterest.save({}, {
            project_id: this.$route.params.id,
            ...this.$route.query
          }).then(res => {
            this.project.refer_status = 'docking'
            this.$root.hideLoadingStatus()

            let wxQrcode = require('../../assets/images/weixin-pano.jpg')
            this.$root.showAlert({
              title: '提交成功',
              content: `<div class="text-center">提交成功，我们会尽快与您沟通。您可联系PANO微信小秘书，随时了解进度情况：<br><img src="${wxQrcode}" width="80%"/></div>`
            })
          }).catch(res => {
            this.$root.showToast(res.json().error || '抱歉，服务器繁忙！')
          })
        }.bind(this)
      })
    },

    expired() {
      let wxQrcode = require('../../assets/images/weixin-pano.jpg')
      this.$root.showAlert({
        title: '已失效',
        content: `<div class="text-center">由于已超过10天查看期，故您无法再对该项目表达意向。如您想进一步沟通该项目事宜，请联系PANO微信小秘书：<br><img src="${wxQrcode}" width="80%"/></div>`
      })
    }
  },

  watch: {
    'project.submitter_info.logo': {
      handler: function(val) {
        if (!val) return
        Utils.getImageInfo(val).then((res) => {
          this.submitterInfo.avatarDirection = res.direction

          // 保证头像的cover居中
          this.submitterInfo.avatarStyles = {
            transform: ` ${res.direction === 'portrait' ? 'translateY(-' : 'translateX(-'}${res.widthHeightDiffPercent * 100 / 2}%)`
          }
        }).catch(error => {
          console.warn(error)
        })
      },
      immediate: true
    }
  },

  computed: {
    'assetTypeName' () {
      let name = ''
      _.each(this.assetTypeList, v => {
        _.each(v.data, vd => {
          if (vd.id === this.project.asset_type) {
            name = v.name + ' ' + vd.name
            return false
          }
        })

        if (name) {
          return false
        }
      })
      return name
    }
  },

  data() {
    return {
      project: {
        submitter_info: {
          logo: '',
          business_types: [],
          asset_types: []
        }
      },
      submitterInfo: {
        avatarDirection: '',
        avatarStyles: {}
      }, //for class  style
      assetTypeList: []
    }
  }
}
</script>

<style lang="scss">
@import './project_detail.scss';
.project-detail {
  padding-bottom: 1.932367rem; //240pxs
}
</style>
