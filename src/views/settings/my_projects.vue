<template lang="jade">
 .my-projects
  .my-projects-head
    .add(v-link='{name: "joinInst", params: {type: "add"}}')
      i.icon-pano.icon-plus
      | 新增
  .group
      kt-cell(v-for='p in projects', icon='icon-arrow-right', @on-title-click='$router.go({name: "myProjectDetail", params:{id: p.id}})')
        div(slot='title') {{p.name}}
        .in-content
          .status(:class='p.status | statusClass') {{p.status | status}}
          .in-content-right
            .button(v-link='{name: "joinInst", params: {type: p.id}}') 新增对接机构
              i.icon-pano.icon-plus

</template>

<script>
import KtCell from '../../components/kt-cell.vue'
import {
  persons
} from '../../common/resources.js'

export default {
  components: {
    KtCell
  },
  ready() {
    persons.get({
      content: 'projects_submitted'
    }).then(res => {
      // this.projects = res.json().res.list
    }).catch(res => {
      this.$root.showToast(res.json().error || '抱歉，服务器繁忙！')
    })
  },
  filters: {
    status(val) {
      let statusMap = {
        0: '已提交',
        1: '已推送',
        2: '已推送',
        3: '已推送',
        4: '未推送'
      }

      return statusMap[val] || '未知'
    },
    statusClass(val) {
      let statusClassMap = {
        0: 'status-ok',
        1: 'status-ok',
        2: 'status-ok',
        3: 'status-ok',
        4: ''
      }

      return statusClassMap[val] || ''
    }
  },
  data() {
    return {
      projects: [{
        id: 0,
        name: '哈哈哈',
        status: 0
      }]
    }
  }
}
</script>

<style lang="scss">
.my-projects {
  .my-projects-head {
    margin: 0 0.402576rem; //50px
    height: 0.966184rem; //120px
    line-height: 0.966184rem;
    border-bottom: 1px solid #3bc5ba;
    text-align: right;
    .add {
      color: #3bc5ba;
      .icon-plus {
        font-size: 12px;
        transform: scale(.8);
        display: inline-block;
        vertical-align: -1px;
        margin-right: .2em;
      }
    }
  }
  .in-content {
    display: flex;
    .status {
      color: #adb1bc;
      flex: 1;
      text-align: left;
      &.status-ok {
        color: #3bc5ba;
      }
      &.status-error {
        color: #f05661;
      }
    }
    .in-content-right {
      text-align: right;
    }
    .button {
      font-size: 0.322061rem; //40px
      width: 2.657005rem; //330px
      height: 0.563607rem; //70px
      line-height: 0.563607rem; //70px
      border-radius: 5px;
      color: #adb1bc;
      background: #f8f9fb;
      text-align: center;
      &:active {
        background: #3bc5ba;
        color: white;
        .icon-plus {
          color: white;
        }
      }
      .icon-plus {
        font-size: 0.096618rem; //12px
        margin-left: .3em;
        color: #3bc5ba;
        display: inline-block;
        transform: scale(.8);
      }
    }
  }
}
</style>
