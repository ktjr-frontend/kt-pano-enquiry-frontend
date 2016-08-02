<template>
  <div class="settings">
    <group>
      <cell title="姓名" :value="user.name"></cell>
      <cell title="手机号码" :value="user.mobile.toString()"></cell>
    </group>
    <group>
      <cell title="工作邮箱" :value="user.email"></cell>
      <cell title="公司名称" :value="user.company"></cell>
      <cell title="部门" :value="user.department"></cell>
      <cell title="职位" :value="user.job"></cell>
      <cell title="地址" :value="user.address"></cell>
    </group>
    <button class="mt-40" @click="logOut()">退出登录</button>
  </div>
</template>

<script>
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import {
  user
} from '../vuex/getters'
import {
  logOut
} from '../vuex/actions'

export default {
  components: {
    Group,
    Cell
  },
  vuex: {
    getters: {
      user
    },
    actions: {
      logOut
    }
  }
}
</script>
