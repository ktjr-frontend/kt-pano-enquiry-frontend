<template lang="jade">
.my-project-detail
  kt-loading(:visible='$loadingRouteData')
  .head
    h3 {{project.name}}
    .icon-pano.icon-edit(v-link='{name:"projectInfo", params:{type: project.id}}')
  .group-title
    更新时间：{{project.updated_at}}
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
  .group
    kt-cell.sub-cell.join-inst-list(title='对接机构')
      .kt-list-column(v-if='project.institutions', :class='"count-" + Math.min(project.institutions.length + 1, 5)')
        .kt-list-short(v-for='inst in project.institutions', :title='inst.name', @click='goInstDetail(inst.name)')
          .icon
            img(:src='inst.logo', :alt='inst.name')
          .main
            h3
              div.ellipsis {{inst.name}}
        .kt-list-short.add-new-inst
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
        params: {
          type: this.project.id
        }
      })
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
.my-project-detail {
  padding-bottom: 0.805153rem; //100px
  .head {
    color: #3bc5ba;
    padding: 0 0.402576rem; //50px
    min-height: 0.966184rem; //120px
    line-height: 0.966184rem;
    border-bottom: 1px solid #3bc5ba;
    text-align: center;
    position: relative;
    h3 {
      font-size: 0.402576rem; //50px
    }
    .icon-edit {
      position: absolute;
      right: 0;
      padding: 1em;
      top: 0;
      &:active {
        background: #f8f9fb;
      }
    }
  }
  .group-title {
    padding: 0 0.402576rem;
    font-size: 0.289855rem; // 36px
    line-height: 0.805153rem; // 100px
    color: #adb1bc;
    text-align: right;
    margin-bottom: -0.402576rem; //50px
  }
  .file-list {
    margin-top: -.5em;
  }
  .kt-list-column {
    .kt-list-short {
      &.add-new-inst {
        .icon {
          background: #f8f9fb;
          border-color: #f8f9fb;
          &:active {
            background: darken(#f8f9fb, 10%);
          }
        }
        .icon-plus {
          font-size: 12px;
          color: #3bc5ba;
        }
        .ellipsis {
          color: #adb1bc;
          font-size: 0.2657rem; //33px
        }
      }
    }
  }
  .kt-cell {
    .content {
      text-align: left;
    }
    .desc {
      font-size: 0.289855rem; //36px
      color: #737e9c;
    }
    &.join-inst-list {
      margin-top: 0.362319rem; //45px
    }
  }
}
</style>
