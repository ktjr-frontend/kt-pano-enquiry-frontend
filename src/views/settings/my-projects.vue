<template lang="jade">
 .my-projects
  kt-loading(:visible='$loadingRouteData')
  .my-projects-head
    .add(v-link='{name: "joinInst", params: {type: "add"}, query:{redirect_to: $route.path}}')
      i.icon-pano.icon-plus
      | 新增
  kt-no-data(v-if='!$loadingRouteData && !projects.length', content='没有项目，快快创建吧^_^')
  .group
    kt-cell(v-for='p in projects', icon='icon-arrow-bold', @on-title-click='$router.go({name: "myProjectDetail", params:{id: p.id}})')
      div(slot='title') {{p.name}}
        .date {{p.updated_at}}
          span.status(:class='p.status | statusClass') {{p.status | status}}
      .in-content
        h5 已推荐平台
        ul.platform-list.clfix
          li(v-for='platform in p.platforms') {{platform.name}}
          li.add-platform(@click='addPlatform(p)', v-if='p.status !== "audit_failed"')
            i.icon-pano.icon-plus

</template>

<script>
import KtNoData from '../../components/kt-no-data.vue'
import KtCell from '../../components/kt-cell.vue'
import KtLoading from '../../components/kt-loading.vue'
import {
  persons
} from '../../common/resources.js'

export default {
  components: {
    KtNoData,
    KtCell,
    KtLoading
  },

  route: {
    data() {
      return persons.get({
        content: 'projects_submitted'
      }).then(res => {
        return {
          projects: res.json().res.list
        }
      }).catch(res => {
        this.$root.showToast(res.json().error || '抱歉，服务器繁忙！')
      })
    }
  },

  filters: {
    status(val) {
      let statusMap = {
        'to_audit': '',
        'audit_passed': '',
        'dock_passed': '',
        'dock_failed': '',
        'audit_failed': '项目待完善'
      }

      return statusMap[val] || ''
    },
    statusClass(val) {
      let statusClassMap = {
        'to_audit': '',
        'audit_passed': '',
        'dock_passed': '',
        'dock_failed': '',
        'audit_failed': 'status-error'
      }

      return statusClassMap[val] || ''
    }
  },

  methods: {
    addPlatform(project) {
      if (!project.can_submit_platform) {
        this.$root.showToast('每天最多只能选择一个机构哦！')
        return
      }

      this.$router.go({
        name: 'joinInst',
        params: {
          type: project.id
        }
      })
    }
  },

  data() {
    return {
      projects: []
    }
  }
}
</script>

<style lang="scss">
.my-projects {
  .my-projects-head {
    padding: 0 0.402576rem; //50px
    height: 0.966184rem; //120px
    line-height: 0.966184rem;
    border-bottom: 1px solid #3bc5ba;
    text-align: right;
    .add {
      color: #3bc5ba;
      .icon-plus {
        font-size: 0.2898550724637681rem;
        transform: scale(.6);
        display: inline-block;
        vertical-align: -1px;
        margin-right: .2em;
      }
    }
  }
  .kt-cell {
    .title {
      .status {
        color: #adb1bc;
        flex: 1;
        text-align: left;
        font-size: 0.289855rem; //36px
        margin-left: .7em;
        &.status-ok {
          color: #3bc5ba;
        }
        &.status-error {
          color: #f05661;
        }
      }
    }
    .date {
      font-size: 0.322061rem; //40px
      color: #adb1bc;
      margin-top: -1em;
      line-height: 2em;
    }
  }
  .kt-cell {
    .content {
      padding: 0.080515rem 0.402576rem 0.161031rem; //10px 50px 20px
    }
  }
  .in-content {
    h5 {
      font-size: 0.289855rem; //36px
      line-height: 2.5em;
      text-align: left;
      color: #818aa5;
    }
    .platform-list {
      li {
        margin-right: .5em;
        margin-bottom: .5em;
        padding: 0.04830917874396135rem 0.12077294685990339rem;
        color: #3bc5ba;
        border-radius: 0.12077294685990339rem;
        background: #f8f9fb;
        float: left;
        &.add-platform {
          .icon-plus {
            &:before {
              display: inline-block;
              vertical-align: -1px;
              transform: scale(.6);
            }
          }
          &:active {
            background: darken(#f8f9fb, 10%);
          }
        }
      }
    }
  }
}
</style>
