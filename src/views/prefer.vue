<template lang="jade">
.perfect
  kt-loading(:visible='$loadingRouteData')
  .form-title
    .left
      //- small *请上传与注册手机号一致的名片信息
    .right
      button.btn.btn-simple(@click='skipOver()') 跳过
  .form-container
    kt-asset-types(:info="info", v-ref:ba-types)
  .form-footer
    flexbox
      flexbox-item
        button.btn(@click.prevent="onSubmit()") 提交

</template>

<script>
import Flexbox from 'vux-components/flexbox'
import FlexboxItem from 'vux-components/flexbox-item'
import KtLoading from '../components/kt-loading.vue'
import KtAssetTypes from '../components/kt-asset-types.vue'

import {
  persons
} from '../common/resources'
import _ from 'lodash'

export default {
  components: {
    Flexbox,
    FlexboxItem,
    KtLoading,
    KtAssetTypes
  },
  route: {
    data() {
      return persons.get({
        content: 'info'
      }).then((res) => {
        let data = res.json()

        // **将select内的对象和all中使用同一个对象，保证checkbox的对象比较是相等的，v-model使用对象才能保证用户的选择顺序
        data.business_types.selected = data.business_types.selected.map(v => {
          return _.find(data.business_types.all, va => {
            return v.id === va.id
          })
        })

        data.asset_types.selected = data.asset_types.selected.map(v => {
          return _.find(data.asset_types.all, va => {
            return v.id === va.id
          })
        })
        return {
          info: data
        }
      })
    }
  },
  methods: {
    // 跳过
    skipOver() {
      const _self = this
      this.$root.showConfirm({
        confirmText: '不需要',
        cancelText: '马上设置',
        content: '设置了业务偏好，才可以获得更多个性化服务哦',
        onConfirm() {
          _self.$router.go({
            name: 'quotationOB'
          })
        }
      })
    },

    onSubmit() {
      this.$root.log({
        name: '完成'
      })

      this.$refs.baTypes.saveBAdata().then(() => {
        this.$root.showAlert({
          content: '名片上传成功，快去开启您的询价之旅吧！'
        })
        this.$router.go({
          name: 'quotationOB'
        })
      })
    }
  },
  data() {
    return {
      info: {
        business_types: {
          all: [],
          selected: []
        },
        asset_types: {
          all: [],
          selected: []
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-title {
  padding: 0 0.362319rem; //45px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.207729rem; //150px
  .left {
    flex: 1;
    font-size: 0.289855rem; //36px
  }
  .right {
    width: 40%;
    text-align: right;
  }
  .btn {
    font-size: 0.354267rem; //44px
    height: 0.644122rem; //80px;
    line-height: 0.644122rem; //80px;
    width: 1.449275rem; //180px
    border-radius: 100px;
    color: #626d8b;
    color: #626d8b;
  }
}

.form-container {
  margin-top: -0.322061rem; //40px
  padding: 0;
  // background: white;
}

.form-footer {
  padding: 0.644122rem 0.402576rem; //80px 50px
}
</style>
