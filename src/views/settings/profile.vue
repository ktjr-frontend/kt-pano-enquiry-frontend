<template lang="jade">
div
  kt-loading(:visible='$loadingRouteData')
  //- 用户基本信息
  .profile
    .head
      .protrait-container.item
        i.icon-pano.icon-edit(v-link='{name: "settings"}')
        .portrait(:class='{"no-avatar": !user.avatar_url}')
          img(v-show='user.avatar_url', :src='user.avatar_url')
          i.icon-pano.icon-man-simple(v-else)
      .name.item
        | {{user.name}}
      .company.item
        | {{user.company}}
      .dj.item(ng-if='user.department || user.job')
        span.department(ng-if='user.department')
          | {{user.department}}
        span.job(ng-if='user.job')
          | {{user.job}}
      .intro-con(@click.prevent='')
        .intro(:class="{'edit': editingIntro}")
          i.icon-pano(@click.prevent='editIntro()', v-el:icon-intro, :class="{'icon-edit': !editingIntro, 'icon-ok2': editingIntro}")
          p(v-show='!editingIntro') {{user.intro || '介绍我的业务'}}
          textarea(v-show='editingIntro', v-el:intro-textarea, cols='2', rows='2', v-model='user.intro')
    //- 业务角色和资产类型
    .group
      kt-cell(title='业务偏好', icon='icon-plus' @on-icon-click='openBATypes()')
        .kt-list-normal(v-if='info.business_types.selected.length || info.asset_types.selected.length')
          ul
            li(v-if='info.business_types.selected.length')
              h3 业务角色
              p {{selectedBt}}
            li(v-if='info.asset_types.selected.length')
              h3 偏好资产
              p {{selectedAt}}
        .default-content(@click='openBATypes()', v-if='!info.business_types.selected.length && !info.asset_types.selected.length')
          i.icon-pano.icon-plus
          | 选择关注的业务范围
    //- 发行产品
    .group(v-if='user.institution')
      kt-cell(title='参与发行的产品', icon='icon-plus', @on-icon-click='openRelativeProducts()')
        .kt-list-normal(v-if='info.products.selected.length')
          ul
            li(v-for='item in info.products.selected')
              h3 {{item.name}}
              p {{item.desc}}
        .default-content(@click='openRelativeProducts()', v-if='!info.products.selected.length')
          i.icon-pano.icon-plus
          | 参与发行的产品
    //- 关注的互联网金融平台
    .group
      kt-cell(title='关注的互联网金融平台', icon='icon-arrow-right', @on-title-click='$router.go({name: "moreInstitutions"})')
        div(slot='title') 关注的互联网金融平台
        .kt-list(v-for='item in info.platforms.institutions | limitBy 3', v-if='info.platforms.institutions.length', class='one-line-content', :title='item.name', @click='goInstDetail(item.name)')
          .icon
            img(:src='item.logo', :alt='item.name')
          .main
            h3 {{item.name}}
            p(v-if='item.asset_types')
              | 已发行资产类型：<br/>
              span(class='gray') {{item.asset_types.join(' ')}}

          .right
            a(@click.stop='toggleAttention(item)')
              i.icon-pano(:class='{"icon-ok2": item.is_followed, "icon-plus": !item.is_followed}')
              | {{item.is_followed ? '已关注' : '关注'}}
        .default-content(v-if='!info.platforms.institutions.length', v-link='{name: "moreInstitutions"}')
          i.icon-pano.icon-plus
          | 选择要关注的互联网金融平台
      kt-cell(title='为您推荐', class='sub-cell', v-if='info.platforms.recommended.length')
        .kt-list-column
          .kt-list-short(v-for='item in info.platforms.recommended | limitBy 3', :title='item.name', @click='goInstDetail(item.name)')
            .icon
              img(:src='item.logo', :alt='item.name')
            .main
              h3 {{item.name}}
              a(@click.stop='toggleAttention(item)')
                i.icon-pano(:class='{"icon-ok2": item.is_followed, "icon-plus": !item.is_followed}')
                | {{item.is_followed ? '已关注' : '关注'}}
      //- 关注的挂牌场所
      kt-cell(title='关注的挂牌场所', icon='icon-arrow-right', @on-title-click='$router.go({name: "moreInstitutions", query:{dimension: "mapped_exchange"}})')
        div(slot='title') 关注的挂牌场所
        .kt-list(v-for='item in info.institutions.institutions | limitBy 3', v-if='info.institutions.institutions.length', class='one-line-content', :title='item.name', @click='goInstDetail(item.name, {dimension: "mapped_exchange"})')
          .icon
            img(:src='item.logo', :alt='item.name')
          .main
            h3 {{item.name}}
            p(v-if='item.partners')
              | 主要合作机构：<br/>
              span(class='gray') {{item.partners.join(' ')}}
          .right
            a(@click.stop='toggleAttention(item)')
              i.icon-pano(:class='{"icon-ok2": item.is_followed, "icon-plus": !item.is_followed}')
              | {{item.is_followed ? '已关注' : '关注'}}
        .default-content(v-if='!info.institutions.institutions.length', v-link='{name: "moreInstitutions", query:{dimension: "mapped_exchange"}}')
          i.icon-pano.icon-plus
          | 选择要关注的挂牌场所
      kt-cell(title='为您推荐', class='sub-cell', v-if='info.institutions.recommended.length')
        .kt-list-column
          .kt-list-short(v-for='item in info.institutions.recommended | limitBy 3', :title='item.name', @click='goInstDetail(item.name, {dimension: "mapped_exchange"})')
            .icon
              img(:src='item.logo', :alt='item.name')
            .main
              h3 {{item.name}}
              a(@click.stop='toggleAttention(item)')
                i.icon-pano(:class='{"icon-ok2": item.is_followed, "icon-plus": !item.is_followed}')
                | {{item.is_followed ? '已关注' : '关注'}}
  //- 设置业务角色和资产类型
  a.vux-popup-mask(href='javascript:void(0)')
  popup(:show.sync='popups.baTypes.show', :height='popups.baTypes.height', @on-show='initBAData()')
    .header
      a(@click='closeBATypes(true)', class='cancel') 取消
      a(@click='closeBATypes()', class='ok') 确定
    .popup-body
      .group
        kt-cell(title='业务角色')
          //- checkbox组
          div
            .clfix
              .checkbox-label(v-for='item in info.business_types.all')
                input(autocomplete='off', v-model='model.businessTypes', :id="'bt_' + item.id", :value='item',  type='checkbox')
                label(:for="'bt_' + item.id", v-cloak='', :class='{"has-icon-close": item.customized}') {{item.name}}
                  i.icon-pano.icon-plus.icon-for-close(v-if='item.customized', @click.stop.prevent='deleteTag(item, "业务角色")')
              .add-button(@click='openCustomTag()', v-if='!businessTypesHasCustomTag')
                i.icon-pano.icon-plus
                | 标签
      .group
        kt-cell(title='偏好资产')
          //- checkbox组
          div
            .clfix
              .checkbox-label(v-for='item in info.asset_types.all')
                input(autocomplete='off', v-model='model.assetTypes', :id="'at_' + item.id", :value='item',  type='checkbox')
                label(:for="'at_' + item.id", v-cloak='', :class='{"has-icon-close": item.customized}') {{item.name}}
                  i.icon-pano.icon-plus.icon-for-close(v-if='item.customized', @click.stop.prevent='deleteTag(item)')
              .add-button(@click='openCustomTag("偏好资产")', v-if='!assetTypesHasCustomTag')
                i.icon-pano.icon-plus
                | 标签
  //- 参与发行的产品
  a.vux-popup-mask(href='javascript:void(0)')
  popup(:show.sync='popups.relativeProducts.show', :height='popups.relativeProducts.height', @on-show='initProductData()')
    .header
      a(@click='closeProducts(true)', class='cancel') 取消
      a(@click='closeProducts()', class='ok') 确定
    .popup-body
      .group
        kt-cell(title='参与发行的产品')
          //- checkbox组
          div
            .clfix
              .checkbox-label(v-for='item in info.products.all')
                input(autocomplete='off', v-model='model.relativeProducts', :id="'rp_' + item.id", :value='item.id',  type='checkbox')
                label(:for="'rp_' + item.id", v-cloak='') {{item.name}}
  //- 自定义标签
  a.vux-popup-mask(href='javascript:void(0)')
  popup(:show.sync='popups.customTag.show', :height='popups.customTag.height')
    .header
      a(@click='closeCustomTag(true)', class='cancel') 取消
      a(@click='closeCustomTag()', class='ok') 确定
    .popup-body
      .group
        kt-cell
          .weui_cell.weui_select_after
            .wrapper
              .weui_cell_hd
                label.weui_label
                  | 标签名称
              div
                input.weui_input(placeholder='自定义标签名称', v-model='model.customTag')

</template>

<script>
import Popup from 'vux-components/popup'
import KtCell from '../../components/kt-cell'
import institutionMixins from './intitution_mixins'
import {
  accounts,
  assetTypes,
  businessTypes,
  persons
} from '../../common/resources'
import {
  user
} from '../../vuex/getters'
import _ from 'lodash'

export default {
  mixins: [institutionMixins],
  components: {
    Popup,
    KtCell
  },

  vuex: {
    getters: {
      user
    }
  },

  route: {
    data() {
      return persons.get({
        content: 'info'
      }).then((res) => {
        let data = res.json()

        // 将select内的对象和all中使用同一个对象，保证checkbox的对象比较是相等的，v-model使用对象才能保证用户的选择顺序
        data.business_types.selected = data.business_types.selected.map(v => {
          return data.business_types.all.find(va => {
            return v.id === va.id
          })
        })

        data.asset_types.selected = data.asset_types.selected.map(v => {
          return data.asset_types.all.find(va => {
            return v.id === va.id
          })
        })

        data.platforms.institutions.forEach(v => {
          v.is_followed = true
        })

        data.platforms.recommended.forEach(v => {
          v.is_followed = false
        })

        data.institutions.institutions.forEach(v => {
          v.is_followed = true
        })

        data.institutions.recommended.forEach(v => {
          v.is_followed = false
        })

        return {
          info: data
        }
      })
    }
  },

  watch: {
    'model.businessTypes': {
      handler: function(val) {
        if (val.length > 2) {
          this.$root.showToast({
            text: '不能大于2个'
          })
        }
      },
      deep: true
    },
    'model.assetTypes': function(val) {
      if (val.length > 3) {
        this.$root.showToast({
          text: '不能大于3个'
        })
      }
    }
  },

  methods: {
    // 初始化默认业务偏好和资产类型
    initBAData() {
      let data = this.info
      this.model.businessTypes = data.business_types.selected
      this.model.assetTypes = data.asset_types.selected
    },

    // 初始化参与发行的产品
    initProductData() {
      this.model.relativeProducts = _.map(this.info.products.selected, 'id')
    },

    // 个人业务介绍提交
    onSubmitIntro() {
      let introLength = this.$els.introTextarea.value.length
      if (introLength > 40) {
        let diff = introLength - 40
        this.$root.showToast({
          text: `不能大于40个字符，您以超出${diff}个字符`
        })
      } else {
        this.$root.showLoadingStatus()

        accounts.update({
          content: 'intro'
        }, {
          intro: this.user.intro
        }).then(() => {
          this.$root.hideLoadingStatus()
          this.editingIntro = false
        }).catch((res) => {
          this.$root.hideLoadingStatus()
          this.$root.showToast({
            text: res.json().error || '抱歉，服务器繁忙！'
          })
        })
      }
    },

    // 编辑个人业务内容
    editIntro() {
      if (this.$els.iconIntro.classList.contains('icon-ok2')) {
        this.$root.log({
          name: '保存个人业务'
        })

        this.onSubmitIntro()
      } else {
        this.$root.log({
          name: '编辑个人业务'
        })

        setTimeout(() => {
          this.$els.introTextarea.focus()
        }, 10)

        this.editingIntro = true
      }
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
                _self.model.businessTypes.$remove(tag.id)
              })
            } else {
              p = assetTypes.delete({
                id: tag.id
              }).then(() => {
                _self.$root.hideLoadingStatus()
                _self.info.asset_types.all.$remove(tag)
                _self.model.assetTypes.$remove(tag.id)
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
    },

    // 打开业务偏好和资产类型
    openBATypes() {
      this.$root.log({
        name: '编辑业务偏好和资产类型'
      })
      this.popups.baTypes.show = true
    },

    // 关闭业务偏好和资产类型
    closeBATypes(cancelled) {
      if (cancelled) {
        this.$root.log({
          name: '取消编辑业务偏好和资产类型'
        })

        this.popups.baTypes.show = false
        return
      }

      if (this.model.businessTypes.length > 2) {
        this.$root.showToast({
          text: '业务角色不能超过2个'
        })
        return
      }

      if (this.model.assetTypes.length > 3) {
        this.$root.showToast({
          text: '资产类型不能超过3个'
        })
        return
      }

      this.$root.log({
        name: '保存业务偏好和资产类型'
      })

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

        // let selectedBts = this.info.business_types.all.filter(v => {
        //   return _.includes(this.model.businessTypes, v.id)
        // })

        // let selectedAts = this.info.asset_types.all.filter(v => {
        //   return _.includes(this.model.assetTypes, v.id)
        // })

        // this.info.business_types.selected = selectedBts
        // this.info.asset_types.selected = selectedAts

        this.popups.baTypes.show = false
      }).catch(res => {
        this.$root.hideLoadingStatus()
        this.$root.showToast({
          text: res.json().error || '抱歉，服务器繁忙！'
        })
      })
    },

    // 打开参与发行的产品
    openRelativeProducts() {
      this.$root.log({
        name: '编辑参与发行的产品'
      })
      this.popups.relativeProducts.show = true
    },

    // 关闭参与发行的产品
    closeProducts(cancelled) {
      if (cancelled) {
        this.$root.log({
          name: '取消编辑参与发行的产品'
        })

        this.popups.relativeProducts.show = false
        return
      }

      this.$root.log({
        name: '保存参与发行的产品'
      })

      this.$root.showLoadingStatus()

      persons.save({
        content: 'relative_products'
      }, {
        ids: this.model.relativeProducts
      }).then(() => {
        this.$root.hideLoadingStatus()

        this.info.products.selected = this.info.products.all.filter(v => {
          return _.includes(this.model.relativeProducts, v.id)
        })

        this.popups.relativeProducts.show = false
      }).catch(res => {
        this.$root.showToast({
          text: res.json().error || '抱歉，服务器繁忙！'
        })
      })
    }
  },

  computed: {
    selectedBt() {
      return _.map(this.info.business_types.selected, 'name').join('、')
    },
    selectedAt() {
      return _.map(this.info.asset_types.selected, 'name').join('、')
    },
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
      editingIntro: false,
      model: {
        customTag: '',
        businessTypes: [],
        assetTypes: [],
        relativeProducts: []
      },
      popups: {
        customTag: {
          show: false,
          height: '100%'
        },
        baTypes: {
          show: false,
          height: '100%'
        },
        relativeProducts: {
          show: false,
          height: '100%'
        }
      },
      info: {
        business_types: {
          all: [],
          selected: []
        },
        asset_types: {
          all: [],
          selected: []
        },
        products: {
          all: [],
          selected: []
        },
        platforms: {
          institutions: [],
          recommended: []
        },
        institutions: {
          institutions: [],
          recommended: []
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/mixins.scss';
.profile {
  font-size: 0.322061rem; //40px
  h2 {
    font-size: 0.402576rem; //50px
  }
  .head {
    @include flex(column);
    height: 6.441224rem; //800px
    background: linear-gradient(to bottom, #304366, #27719d);
    .item {
      margin-bottom: 0.161031rem; //30px
    }
    .protrait-container {
      position: relative;
      .icon-edit {
        font-size: 0.402576rem;
        position: absolute;
        right: -0.805153rem; //100px
        top: 0.764895rem; //95px
        color: #29b9ae;
      }
    }
    .portrait {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      border: 0.161031rem solid rgba(52, 146, 211, .15); // 20px
      overflow: hidden;
      border-radius: 50%;
      width: 2.616747rem; //325px
      height: 2.616747rem; //325px
      &.no-avatar {
        align-items: flex-end;
      }
      .icon-pano {
        color: rgba(52, 146, 211, .15);
        font-size: 1.610306rem; //200px
      }
      img {
        // max-width: 100%;
        height: 100%;
      }
    }
    .name {
      color: white;
    }
    .company {
      color: #29b9ae;
    }
    .dj {
      .department {
        margin-right: 0.483092rem; //60px
      }
      display: flex;
      align-items: center;
      color: #adc1d2;
      font-size: 0.289855rem;
      padding-top: 0.161031rem; //30px
      border-top: 1px solid #3378a7;
    }
    .intro-con {
      width: 100%;
      form {
        background: none;
      }
    }
    .intro {
      position: relative;
      display: block;
      margin: 0 0.805153rem; //100px
      padding: 0.201288rem 0.563607rem; //25px 70px
      text-align: center;
      // min-height: 0.724638rem;
      // line-height: 0.724638rem; //90px
      border-radius: 0.241546rem; //30px
      background: #2b5b83;
      color: #e1e6ec;
      line-height: 1.5;
      p {
        padding-right: .5em;
      }
      &.edit {
        background: none;
      }
      textarea {
        width: 100%;
        height: 100%;
        resize: none;
        vertical-align: top;
        // background: none;
        border: 1px solid #3378a7;
        background: #2b5b83;
        color: white;
        padding: .2em .5em;
        border-radius: 0;
        box-shadow: none;
        -webkit-appearance: none;
      }
      .icon-pano {
        padding: 1em;
        position: absolute;
        right: -2em;
        top: 50%;
        transform: translateY(-50%);
        color: #29b9ae;
        &.icon-edit {
          right: 0;
        }
      }
    }
  }
}
</style>
