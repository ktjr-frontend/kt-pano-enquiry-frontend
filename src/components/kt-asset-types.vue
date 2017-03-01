<template lang="jade">
.asset-types
  .groups
    .group
      kt-cell(title='业务角色')
        //- checkbox组
        div
          .clfix
            .checkbox-label(v-for='item in info.business_types.all', @touchstart.stop='')
              input(autocomplete='off', v-model='model.businessTypes', :id="'bt_' + item.id", :value='item',  type='checkbox')
              label(:for="'bt_' + item.id", v-cloak='', :class='{"has-icon-close": item.customized}') {{item.name}}
                i.icon-pano.icon-plus.icon-for-close(v-if='item.customized', @click.stop.prevent='deleteTag(item, "业务角色")')
            .add-button(@touchstart.stop='', @click='openCustomTag()', v-if='!businessTypesHasCustomTag')
              i.icon-pano.icon-plus
              | 标签
    .group
      kt-cell(title='偏好资产')
        //- checkbox组
        div
          .clfix
            .checkbox-label(v-for='item in info.asset_types.all', @touchstart.stop='')
              input(autocomplete='off', v-model='model.assetTypes', :id="'at_' + item.id", :value='item',  type='checkbox')
              label(:for="'at_' + item.id", v-cloak='', :class='{"has-icon-close": item.customized}') {{item.name}}
                i.icon-pano.icon-plus.icon-for-close(v-if='item.customized', @click.stop.prevent='deleteTag(item)')
            .add-button(@touchstart.stop='', @click='openCustomTag("偏好资产")', v-if='!assetTypesHasCustomTag')
              i.icon-pano.icon-plus
              | 标签
  //- 自定义标签
  a.vux-popup-mask(href='javascript:void(0)')
  popup(v-kt-prevent='', :show.sync='popups.customTag.show', :height='popups.customTag.height')
    .header
      a(@click='closeCustomTag(true)', @touchstart.stop='', class='cancel') 取消
      a(@click='closeCustomTag()', @touchstart.stop='', class='ok') 确定
    .popup-body
      .group
        kt-cell
          .weui_cell.weui_select_after
            .wrapper
              .weui_cell_hd
                label.weui_label
                  | 标签名称
              div(@touchstart.stop='')
                input.weui_input(placeholder='自定义标签名称', v-model='model.customTag')

</template>

<script>
import KtCell from './kt-cell.vue'
import Popup from 'vux-components/popup'
import {
  assetTypes,
  businessTypes
} from '../common/resources'
import _ from 'lodash'

export default {
  props: {
    info: {
      type: Object,
      default () {
        return {
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
  },
  components: {
    Popup,
    KtCell
  },

  ready() {
    this.initBAData()
  },

  watch: {
    'info' () {
      this.initBAData()
    },
    'model.businessTypes' (val) {
      if (val.length > 2) {
        this.$root.showToast({
          text: '不能大于2个'
        })
      }
    },
    'model.assetTypes' (val) {
      if (val.length > 3) {
        this.$root.showToast({
          text: '不能大于3个'
        })
      }
    }
  },
  methods: {
    // 初始化默认业务偏好和偏好资产
    initBAData() {
      let data = this.info
      this.model.businessTypes = data.business_types.selected
      this.model.assetTypes = data.asset_types.selected
    },

    saveBAdata() {
      return new Promise((resolve, reject) => { // eslint-disable-line
        if (this.model.businessTypes.length > 2) {
          this.$root.showToast({
            text: '业务角色不能超过2个'
          })
          reject('业务角色不能超过2个')
          return
        }

        if (this.model.assetTypes.length > 3) {
          this.$root.showToast({
            text: '偏好资产不能超过3个'
          })
          reject('偏好资产不能超过3个')
          return
        }

        this.$root.log({
          name: '保存业务偏好和偏好资产'
        })
        this.$root.bdTrack(['个人信息页', '确定', '业务偏好'])

        this.$root.showLoadingStatus()

        let ap = assetTypes.update({}, {
          ids: _.map(this.model.assetTypes, 'id')
        })

        let bp = businessTypes.update({}, {
          ids: _.map(this.model.businessTypes, 'id')
        })

        // 确保两个保存成功
        Promise.all([ap, bp]).then(() => {
          this.$root.hideLoadingStatus()
            // this.popups.baTypes.show = false

          // 更新info数据,
          this.info.business_types.selected = [].concat(this.model.businessTypes)
          this.info.asset_types.selected = [].concat(this.model.assetTypes)
          resolve({
            business_types: this.model.businessTypes,
            asset_types: this.model.assetTypes
          })
        }).catch(res => {
          this.$root.hideLoadingStatus()
          this.$root.showToast({
            text: res.json().error || '抱歉，服务器繁忙！'
          })
          reject(res.json().error || '抱歉，服务器繁忙！')
        })
      })
    },

    // 打开自定义标签
    openCustomTag(type) {
      this.$root.log({
        name: '新建自定义标签',
        type: type
      })

      this.popups.customTag.type = type
      this.popups.customTag.show = true
    },

    // 关闭自定义标签
    closeCustomTag(cancelled) {
      if (cancelled) {
        this.$root.log({
          name: '取消编辑参与发行的产品'
        })

        this.popups.customTag.show = false
        return
      }

      if (!this.model.customTag.length || this.model.customTag.length > 10) {
        this.$root.showToast({
          text: '您正确填写标签名称, 不能大于10个字符'
        })
        return
      }

      this.$root.log({
        name: '保存参与发行的产品'
      })

      this.$root.showLoadingStatus()

      {
        let p
        if (this.popups.customTag.type === '偏好资产') {
          p = assetTypes.save({
            name: this.model.customTag
          }).then(res => {
            this.$root.hideLoadingStatus()
            this.model.customTag = ''
            let tag = res.json().asset_type
            tag.customized = true

            this.info.asset_types.all.push(tag)
            this.popups.customTag.show = false
          })
        } else {
          p = businessTypes.save({
            name: this.model.customTag
          }).then(res => {
            this.$root.hideLoadingStatus()
            this.model.customTag = ''
            let tag = res.json().business_type
            tag.customized = true

            this.info.business_types.all.push(tag)
            this.popups.customTag.show = false
          })
        }

        p.catch(res => {
          this.$root.hideLoadingStatus()
          this.$root.showToast({
            text: res.json().error || '抱歉，服务器繁忙！'
          })
        })
      }
    },

    // 删除自定义标签
    deleteTag(tag, type = '偏好资产') {
      let _self = this
      this.$root.showConfirm({
        content: '确定删除吗？',
        onConfirm() {
          _self.$root.log({
            name: '确定删除自定义标签：' + tag.name
          })

          _self.$root.showLoadingStatus()

          {
            let p
            if (type !== '偏好资产') {
              p = businessTypes.delete({
                id: tag.id
              }).then(() => {
                _self.$root.hideLoadingStatus()
                _self.info.business_types.all.$remove(tag)
                _self.model.businessTypes.$remove(tag)
              })
            } else {
              p = assetTypes.delete({
                id: tag.id
              }).then(() => {
                _self.$root.hideLoadingStatus()
                _self.info.asset_types.all.$remove(tag)
                _self.model.assetTypes.$remove(tag)
              })
            }

            p.catch(res => {
              _self.$root.hideLoadingStatus()
              _self.$root.showToast({
                text: res.json().error || '抱歉，服务器繁忙！'
              })
            })
          }
        },

        onCancel() {
          _self.$root.log({
            name: '确定取消删除自定义标签：' + tag.name
          })
        }
      })
    }
  },
  computed: {
    assetTypesHasCustomTag() {
      return _.some(this.info.asset_types.all, {
        customized: true
      })
    },
    businessTypesHasCustomTag() {
      return _.some(this.info.business_types.all, {
        customized: true
      })
    }
  },
  data() {
    return {
      model: {
        customTag: '',
        businessTypes: [],
        assetTypes: []
      },
      popups: {
        customTag: {
          show: false,
          height: '100%'
        }
      }
    }
  }
}
</script>
