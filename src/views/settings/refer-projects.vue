<template lang="jade">
.refer-projects
  kt-loading(:visible='$loadingRouteData')
  group
    cell(v-for='p in projects', :title='p.name', is-link, v-link='{name: "referProjectDetail", params:{id: p.id}, query: {refer_id: p.refer_id}}')
      .date(slot='after-title') {{p.updated_at}}
        span.status(v-if='p.status === "to_audit"', :class='p.status | statusClass') {{p.status | status}}

</template>

<script>
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import KtLoading from '../../components/kt-loading.vue'
import {
  persons
} from '../../common/resources.js'

export default {
  components: {
    Group,
    Cell,
    KtLoading
  },

  route: {
    data({
      to: {
        query
      }
    }) {
      return persons.get({
        content: 'projects_commended',
        ...query
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
        'to_audit': '待查看',
        'audited': '已查看',
        'not_interest': '不感兴趣',
        'interested': '感兴趣',
        'docking': '对接中',
        'dock_passed': '对接成功',
        'dock_failed': '对接失败',
        'expired': '已失效'
      }
      return statusMap[val] || '未知'
    },
    statusClass(val) {
      let statusClassMap = {
        'to_audit': 'status-new',
        'audited': 'status-going',
        'not_interest': '',
        'interested': 'status-going',
        'docking': 'status-going',
        'dock_passed': 'status-going',
        'dock_failed': '',
        'expired': ''
      }
      return statusClassMap[val] || ''
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
.refer-projects {
  padding-bottom: 0.805153rem; //100px
  .date {
    color: #adb1bc;
    font-size: 0.322061rem; // 40px
  }
  .status {
    font-size: 0.289855rem; //3px
    color: #adb1bc;
    margin-left: .5em;
    &.status-normal {
      color: #adb1bc;
    }
    &.status-new {
      color: #f05661;
    }
    &.status-going {
      color: #3bc5ba;
    }
  }
}
</style>
