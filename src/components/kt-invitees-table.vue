<template lang="jade">
.invitees-table
  table
    tr
      th 好友
      th 手机号
      th 注册日期
      th 状态
    tr(v-for='invitee in invitees')
      td {{invitee.name}}
      td {{invitee.phone}}
      td {{invitee.created_at}}
      td(:class="{'color-main': invitee.status === '已生效'}") {{invitee.status}}
    tr
      td.text-center(colspan="4") 无数据！
</template>

<script>
import {
  persons
} from '../common/resources.js'

export default {
  ready: function() {
    persons.get({
      content: 'invitees'
    }).then(res => res.json()).then(data => {
      this.invitees = data.res
    })
  },

  data() {
    return {
      invitees: []
    }
  }
}
</script>

<style lang="scss" scoped>
.invitees-table {
  padding: 0.402576rem; //50px
  background: white;
  margin-top: 0.322061rem; //40px
  table {
    width: 100%;
  }
  th,td {
    height: 0.805153rem; //100px
    border:1px solid #eff2f7;
    padding: 0 .5em;
  }
}
</style>
