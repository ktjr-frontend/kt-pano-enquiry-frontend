<template lang="jade">
.project-detail
  kt-loading(:visible='$loadingRouteData')
  .head
    h3 {{project.name}}
    //- .sub-title 待查看
    .icon-pano.icon-edit(v-link='{name:"projectInfo", params:{type: project.id}, query:{redirect_to: $route.path}}')
  .group-title
    .left
    .right 更新时间：{{project.updated_at}}
  group
    cell(title='资产类型') {{assetTypeName}}
  .group
    kt-cell(title='项目说明书')
      div(v-if='!project.files || !project.files.length') 无
      .file-list(v-for='file in project.files')
        a.file-name.no-icon(:href='"/api/v1/pano_files?id=" + file.id') {{file.name}}
  .group
    kt-cell(title='项目描述')
      div.desc {{project.desc || '无'}}
  .group
    kt-cell.sub-cell.join-inst-list(title='对接机构')
      .kt-list-column(v-if='project.institutions', :class='"count-" + Math.min(project.institutions.length + 1, 5)')
        .kt-list-short(v-for='inst in project.institutions', :title='inst.name', @click='goInstDetail(inst)')
          .icon
            img(:src='inst.logo', :alt='inst.name')
          .main
            h3
              div.ellipsis {{inst.name}}
        .kt-list-short.add-new-inst(v-if='project.status_data.status !== "audit_failed"')
          .icon(@click='addPlatform()')
            i.icon-pano.icon-plus
          .main
            h3
              div.ellipsis 每天可新增1次

</template>

<script>
import {
  persons,
  projects
} from '../../common/resources.js'
import KtLoading from '../../components/kt-loading.vue'
import KtCell from '../../components/kt-cell.vue'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import _ from 'lodash'
import instDetailMixin from '../../mixins/inst-detail-mixin.js'

export default {
  mixins: [instDetailMixin],
  components: {
    KtLoading,
    KtCell,
    Group,
    Cell
  },

  route: {
    data({
      to: {
        params
      }
    }) {
      let projectP = persons.get({
        content: 'project_submitted_detail',
        project_id: params.id
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
    Math,
    addPlatform() {
      if (!this.project.can_submit_platform) {
        this.$root.showToast('每天最多只能新增一个机构哦！')
        return
      }

      this.$router.go({
        name: 'joinInst',
        query: {
          redirect_to: this.$route.path
        },
        params: {
          type: this.project.id
        }
      })
    }
  },

  watch: {
    'project.status_data' () {
      let {
        status,
        reason,
        solution
      } = this.project.status_data

      if (status === 'audit_failed') {
        this.$root.showMessage({
          content: `很抱歉，您所提交的信息因<em>${reason}</em>未完成推送，请<em>${solution}</em>`
        })
      }
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
      assetTypeList: [],
      project: {}
    }
  }
}
</script>

<style lang="scss">
@import './project_detail.scss';
</style>
