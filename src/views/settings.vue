<template>
  <div class="settings">
    <group>
      <cell title="姓名" :value="user.name"></cell>
      <cell title="手机号码" :value="user.mobile.toString()" is-link @click="changeUserMobile()"></cell>
    </group>
    <group>
      <cell title="工作邮箱" :value="user.email"></cell>
      <cell title="公司名称" :value="user.company"></cell>
      <cell title="部门" :value="user.department"></cell>
      <cell title="职位" :value="user.job"></cell>
      <cell title="地址" :value="user.address"></cell>
    </group>

    <group class="user-card">
      <cell title="名片" value="重新认证" is-link @click="changeUserCard()">
        <div slot="after-title" class="user-card-box">
          <img :src="user.card_url" alt="您的名片" />
        </div>
      </cell>
    </group>

    <group>
      <cell title="修改密码" is-link v-link="{name: 'changePassword'}">
      </cell>
    </group>
    <div class="buttons">
      <button @click="logOutWithLog()">退出登录</button>
    </div>
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

  methods: {
    changeUserMobile() {
      let _self = this
      this.$root.log({
        name: '修改手机'
      })

      this.$root.showConfirm({
        content: '修改手机号后需要重新审核，确定修改手机号吗？',

        onConfirm() {
          _self.$root.log({
            name: '确定修改手机'
          })

          _self.$router.go({
            name: 'changeMobile1'
          })
        },

        onCancel() {
          _self.$root.log({
            name: '取消修改手机'
          })
        }
      })
    },

    changeUserCard() {
      let _self = this
      this.$root.log({
        name: '重新上传名片'
      })

      this.$root.showConfirm({
        content: '上传名片后需要重新审核，确定重新上传吗？',

        onConfirm() {
          _self.$root.log({
            name: '确定重新上传名片'
          })

          _self.$router.go({
            name: 'perfect',
            query: {
              update: true
            }
          })
        },

        onCancel() {
          _self.$root.log({
            name: '取消重新上传名片'
          })
        }
      })
    },

    logOutWithLog() {
      this.$root.log({
        name: '退出登录'
      })
      this.logOut()
    }
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

<style scoped lang="scss">
.user-card {
  .user-card-box {
    padding: 0.161031rem 0; //20px
    text-align: center;
    img {
      // max-height: 2.415459rem;
      max-width: 100%;
    }
  }
}

.buttons {
  padding: 0.322061rem; //40px
}
</style>
