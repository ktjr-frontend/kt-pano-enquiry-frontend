<template lang="jade">
.refer-projects
  group
    cell(v-for='p in projects', :title='p.name', is-link, v-link='{name: "referProjectDetail", params:{id: p.id}}')
      .status(slot='after-title', :class='p.status | statusClass') {{p.status | status}}

</template>

<script>
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import {
  persons
} from '../../common/resources.js'

export default {
  components: {
    Group,
    Cell
  },

  ready() {
    persons.get({
      content: 'projects_commended'
    }).then(res => {
      // this.projects = res.json().list
    }).catch(res => {
      this.$root.showToast(res.json().error || '抱歉，服务器繁忙！')
    })
  },

  filters: {
    status(val) {
      let statusMap = {
        0: '待查看',
        1: '不感兴趣',
        2: '感兴趣',
        3: '对接中',
        4: '对接成功',
        5: '对接失败',
        6: '已失效'
      }
      return statusMap[val] || '未知'
    },
    statusClass(val) {
      let statusClassMap = {
        0: 'status-new',
        1: '',
        2: 'status-going',
        3: 'status-going',
        4: 'status-going',
        5: '',
        6: ''
      }
      return statusClassMap[val] || ''
    }
  },

  data() {
    return {
      projects: [{
        name: '测试',
        status: 0
      }, {
        name: '测试',
        status: 1
      }, {
        name: '测试',
        status: 2
      }, {
        name: '测试',
        status: 3
      }, {
        name: '测试',
        status: 4
      }, {
        name: '测试',
        status: 5
      }, {
        name: '测试',
        status: 6
      }]
    }
  }
}
</script>

<style lang="scss">
.refer-projects {
  .weui_cell .weui_cell_ft {
    top: 8px;
    right: 10px;
    position: absolute;
  }
  .status {
    font-size: 0.322061rem; //40px
    color: #adb1bc;
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
