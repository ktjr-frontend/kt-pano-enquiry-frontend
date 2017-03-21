<template lang="jade">
div
  kt-loading(:visible='$loadingRouteData')
  //- 用户基本信息
  .profile
    .head
      //- button.btn-cyan.btn-share(@click="openShareTips()") 邀请好友
      .avatar-container.item(v-link='{name: "settings"}', @click="$root.bdTrack(['个人信息页', '点击进入', '详情页'])")
        i.icon-pano.icon-arrow-bold
        .avatar(:class='[{"no-avatar": !user.avatar_url}, model.avatarDirection]')
          img(v-show='user.avatar_url', :src='user.avatar_url', :style='model.avatarStyles')
          i.icon-pano.icon-man-simple(v-else)
      .name.item
        | {{user.name}}
      //- .company.item
        | {{user.company}}
      .gs.item
        span.tag.tag-blue.group(v-if="user.group === 'premium'" style="margin-right:0.120773rem;")
          i.icon-pano.icon-vip
          | 高级会员
        span.tag.tag-blue.group(v-if="user.group === 'certified'" style="margin-right:0.120773rem;")
          i.icon-pano.icon-ok
          | 已认证
        span.tag.tag-blue.group(v-if="user.group === 'normal'")
          | 非认证
        span.tag.tag-green.status(v-if="user.status === 'passed' && user.group !== 'normal'")
          | 审核通过
        span.tag.tag-orange.status(v-if="user.status === 'pended' && user.group !== 'normal'")
          | 待审核
        span.tag.tag-red.status(v-if="user.status === 'rejected' && user.group !== 'normal'")
          | 审核不通过
        span.remark(v-if="user.group === 'premium'")
          span(v-if="user.premium_duration") 剩余期限{{user.premium_duration}}天
          //- span(v-if="!user.premium_duration") 永久会员
          i.icon-pano.icon-info(@click.stop="showMemberTips()")
        span.remark(v-if="user.group === 'certified'", @click="upgradeMember()")
          span(v-show="user.status === 'passed'") 升级
            i.icon-pano.icon-arrow-bold
          i.icon-pano.icon-info(@click.stop="showMemberTips()")
        span.remark(v-if="user.group === 'normal'", @click="$root.bdTrack(['个人信息页', '点击', '去认证', '账号信息'])" , v-link="{name:'perfect', query:{certifyApplication:1}}")
          | 去认证
          i.icon-pano.icon-arrow-bold
          i.icon-pano.icon-info(@click.stop="showMemberTips()")
      .dj.item(v-if='user.company || user.job')
        span.company(v-if='user.company', :class="{'has-job': user.job}")
          //- | {{user.department}}
          | {{user.company}}
        span.job(v-if='user.job')
          | {{user.job}}
      //- .intro-con(@click.prevent='')
        .intro(:class="{'edit': editingIntro}")
          i.icon-pano(@click.prevent='editIntro()', v-el:icon-intro, :class="{'icon-edit': !editingIntro, 'icon-ok2': editingIntro}")
          p(v-show='!editingIntro', @click.prevent='editIntro()') {{user.intro.trim() || '介绍我的业务'}}
          textarea(v-show='editingIntro', v-el:intro-textarea, cols='2', rows='2', v-model='user.intro')
    //- 邀请好友
    .group.invitation-group(v-if="invitationGroupVisibel")
      kt-cell(title='邀请好友')
        span(slot='title') 邀请好友
          span.tag.tag-green-light Hot
        p 邀请好友，获得高级用户权限，可享受开通PANO全域的数据权限及数据检索，以及每月1次数据定制服务等。
        p 每成功邀请一位互金/金融相关的用户注册开通PANO并通过认证，您和好友均可免费获得30天高级用户权限，多邀可累计。

        .default-content(@click='openShareTips()')
          i.icon-pano.icon-plus
          | 邀请好友
        .invitation-count
          | 您已成功邀请好友
          em {{user.invitee_account_count}}
          | 人，其中认证通过
          em {{user.certified_invitee_account_count}}
          | 人。
          a.color-main.tu(@click="showInvitees()") 详情
    //- 业务角色和偏好资产
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
    .group(v-if='user.institution && info.products.all.length')
      kt-cell(title='参与发行的产品', icon='icon-plus', @on-icon-click='openRelativeProducts()')
        .kt-list-normal(v-if='info.products.selected.length')
          ul
            li(v-for='item in info.products.selected')
              h3 {{item.name}}
              p {{item.desc}}
        .default-content(@click='openRelativeProducts()', v-if='!info.products.selected.length')
          i.icon-pano.icon-plus
          | 参与发行的产品
    //- 我的项目
    group.user-select-none
      cell(title='我发出的项目', is-link, @click='$root.routerGo({name: "myProjects"}, ["个人信息页", "选择", "我发出的项目"])')
        span.tip(v-if='info.my_projects.info' slot='value')
    //- 为我推介项目
    group.user-select-none(v-if='info.referral_projects && info.referral_projects.count')
      cell(title='我收到的项目', is-link, @click='$root.routerGo({name: "referProjects"})')
        span.tip(v-if='info.referral_projects.info' slot='value') {{info.referral_projects.info}}
    //- 感兴趣的项目
    group.user-select-none(v-if='info.interesee_projects && info.interesee_projects.count')
      cell(title='感兴趣的项目', is-link, @click='$root.routerGo({name: "interestProjects", query: {status_list: ["interested", "docking", "dock_passed", "dock_failed"]}})')
        //- span.tip(v-if='info.referral_projects.info' slot='value') {{info.referral_projects.info}}
    //- 关注的互联网金融平台
    .group
      kt-cell(title='关注的互联网金融平台', icon='icon-arrow-bold', @on-title-click='$root.routerGo({name: "moreInstitutions"}, ["个人信息页", "选择", "关注的互联网金融平台"])')
        div(slot='title') 关注的互联网金融平台
        .kt-list(v-for='item in info.platforms.institutions | limitBy 3', v-if='info.platforms.institutions.length', class='one-line-content', :title='item.name', @click='goInstDetail(item)')
          .icon
            img(:src='item.logo', :alt='item.name')
          .main
            h3 {{item.name}}
            p(v-if='item.asset_types')
              | 已发行资产类型：<br/>
              span.gray {{item.asset_types.join(' ')}}

          .right(@click.stop='toggleAttention(item, 0, update)')
            a
              i.icon-pano(:class='{"icon-ok2": item.is_followed, "icon-plus": !item.is_followed}')
              | {{item.is_followed ? '已关注' : '关注'}}
        .default-content(v-if='!info.platforms.institutions.length', v-link='{name: "moreInstitutions"}')
          i.icon-pano.icon-plus
          | 选择要关注的互联网金融平台
      //- 为您推荐
      kt-cell.sub-cell(title='为您推荐', :icon='recommended.platforms.pages > 1 ? "icon-refresh" : ""', @on-icon-click='changeRecommendedBatch(0)', v-if='info.platforms.recommended.length')
        .kt-list-column(:class='"count-" + recommendedPlatformsCurrent.length')
          .kt-list-short(v-for='item in recommendedPlatformsCurrent | limitBy 3', :title='item.name', @click='goInstDetail(item)')
            .icon
              img(:src='item.logo', :alt='item.name')
            .main
              h3
                div.ellipsis {{item.name}}
              a(@click.stop='toggleAttention(item, 0, update)')
                i.icon-pano(:class='{"icon-ok2": item.is_followed, "icon-plus": !item.is_followed}')
                | {{item.is_followed ? '已关注' : '关注'}}
      //- 关注的挂牌场所
      kt-cell(title='关注的挂牌场所', icon='icon-arrow-bold', @on-title-click='$router.go({name: "moreInstitutions", query:{dimension: "mapped_exchange"}})')
        div(slot='title') 关注的挂牌场所
        .kt-list(v-for='item in info.institutions.institutions | limitBy 3', v-if='info.institutions.institutions.length', class='one-line-content', :title='item.name', @click='goInstDetail(item, {dimension: "mapped_exchange"})')
          .icon
            img(:src='item.logo', :alt='item.name')
          .main
            h3 {{item.name}}
            p(v-if='item.partners')
              | 主要合作机构：<br/>
              span.gray {{item.partners.join(' ')}}
          .right(@click.stop='toggleAttention(item, 1, update)')
            a
              i.icon-pano(:class='{"icon-ok2": item.is_followed, "icon-plus": !item.is_followed}')
              | {{item.is_followed ? '已关注' : '关注'}}
        .default-content(v-if='!info.institutions.institutions.length', v-link='{name: "moreInstitutions", query:{dimension: "mapped_exchange"}}')
          i.icon-pano.icon-plus
          | 选择要关注的挂牌场所
      //- 为您推荐
      kt-cell.sub-cell(title='为您推荐', :icon='recommended.institutions.pages > 1 ? "icon-refresh" : ""', @on-icon-click='changeRecommendedBatch(1)', v-if='info.institutions.recommended.length')
        .kt-list-column(:class='"count-" + recommendedInstitutionsCurrent.length')
          .kt-list-short(v-for='item in recommendedInstitutionsCurrent | limitBy 3', :title='item.name', @click='goInstDetail(item, {dimension: "mapped_exchange"})')
            .icon
              img(:src='item.logo', :alt='item.name')
            .main
              h3
                div.ellipsis {{item.name}}
              a(@click.stop='toggleAttention(item, 1, update)')
                i.icon-pano(:class='{"icon-ok2": item.is_followed, "icon-plus": !item.is_followed}')
                | {{item.is_followed ? '已关注' : '关注'}}
  //- 设置业务角色和偏好资产
  a.vux-popup-mask(href='javascript:void(0)')
  popup(v-kt-prevent='', :show.sync='popups.baTypes.show', :height='popups.baTypes.height')
    .header
      a(@click='closeBATypes(true)', @touchstart.stop='', class='cancel') 取消
      a(@click='closeBATypes()', @touchstart.stop='', class='ok') 确定
    .popup-body
      kt-asset-types(:info.sync='info', v-ref:ba-types)
  //- 参与发行的产品
  a.vux-popup-mask(href='javascript:void(0)')
  popup(v-kt-prevent='', :show.sync='popups.relativeProducts.show', :height='popups.relativeProducts.height', @on-show='initProductData()')
    .header
      a(@click='closeProducts(true)', @touchstart.stop='', class='cancel') 取消
      a(@click='closeProducts()', @touchstart.stop='', class='ok') 确定
    .popup-body
      .group
        kt-cell(title='参与发行的产品')
          //- checkbox组
          div
            .clfix
              .checkbox-label(v-for='item in info.products.all', @touchstart.stop='')
                input(autocomplete='off', v-model='model.relativeProducts', :id="'rp_' + item.id", :value='item.id',  type='checkbox')
                label(:for="'rp_' + item.id", v-cloak='') {{item.name}}
                //- 参与发行的产品
  //- 升级高级会员
  a.vux-popup-mask(href='javascript:void(0)')
  popup(v-kt-prevent='', :show.sync='popups.upgradeMember.show', :height='popups.upgradeMember.height')
    .header
      a(@click='popups.upgradeMember.show = false', @touchstart.stop='', class='cancel') 取消
      a(@click='popups.upgradeMember.show = false', @touchstart.stop='', class='ok') 确定
    .popup-body
      .group
        kt-upgrade-member(@submit-wx-success="submitWxSuccess()")
  //- 邀请好友列表
  a.vux-popup-mask(href='javascript:void(0)')
  popup(v-kt-prevent='', :show.sync='popups.invitees.show', :height='popups.invitees.height')
    .header
      a(@click='popups.invitees.show = false', @touchstart.stop='', class='cancel') 取消
      a(@click='popups.invitees.show = false', @touchstart.stop='', class='ok') 确定
    .popup-body
      .group
        kt-invitees-table

</template>

<script>
import Popup from 'vux-components/popup'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import KtCell from '../../components/kt-cell'
import KtAssetTypes from '../../components/kt-asset-types.vue'
import KtUpgradeMember from '../../components/kt-upgrade-member.vue'
import KtInviteesTable from '../../components/kt-invitees-table.vue'
import institutionMixins from './intitution_mixins'
import {
  accounts,
  persons
} from '../../common/resources'
import {
  user
} from '../../vuex/getters'
import _ from 'lodash'
import Utils from '../../common/utils'
import wxMixin from '../../mixins/wx-mixin'

export default {
  mixins: [institutionMixins, wxMixin],
  components: {
    Popup,
    Group,
    Cell,
    KtCell,
    KtAssetTypes,
    KtUpgradeMember,
    KtInviteesTable
  },

  vuex: {
    getters: {
      user
    }
  },

  ready() {
    // 初始化微信jssdk
    if (this.invitationGroupVisibel) {
      let host = location.protocol + '//' + location.host
      this.wxInit({
        title: '最全的互联网金融市场数据都在这儿了',
        desc: '现在还能在线对接资产项目',
        link: `${host}#!/register?_u=${this.user.id}` // 分享链接
      }, (to) => {
        this.$root.bdTrack(['个人信息页', '成功分享', '邀请好友', to])
      }, (to) => {
        this.$root.bdTrack(['个人信息页', '取消分享', '邀请好友', to])
      })
    }
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

        _.each(data.platforms.institutions, v => {
          v.is_followed = true
        })

        _.each(data.platforms.recommended, v => {
          v.is_followed = false
        })

        _.each(data.institutions.institutions, v => {
          v.is_followed = true
        })

        _.each(data.institutions.recommended, v => {
          v.is_followed = false
        })

        let _self = this
        setTimeout(() => {
          window.scrollTo(0, _self.$route.data.scrollY || 0)
        }, 200)

        return {
          info: data
        }
      })
    }
  },

  watch: {
    'user.avatar_url': {
      handler: function(val) {
        Utils.getImageInfo(val).then((res) => {
          this.model.avatarDirection = res.direction

          // 保证头像的cover居中
          this.model.avatarStyles = {
            transform: ` ${res.direction === 'portrait' ? 'translateY(-' : 'translateX(-'}${res.widthHeightDiffPercent * 100 / 2}%)`
          }
        }).catch(error => {
          console.warn(error)
        })
      },
      immediate: true
    }
  },

  methods: {
    /*routerGo(route) {
      // route.query = route.query || {}
      // route.query._r = Math.random().toString().slice(2)
      this.$router.go(route)
    },*/

    // 分享提示
    openShareTips() {
      this.$root.bdTrack(['个人信息页', '点击', '邀请好友'])
      this.$root.showAlert({
        content: '点击右上角马上分享给你的小伙伴吧！'
      })
    },

    // 升级高级会员
    upgradeMember() {
      this.popups.upgradeMember.show = true
      this.$root.bdTrack(['个人信息页', '点击', '升级高级会员', '账户信息'])
    },

    submitWxSuccess() {
      this.popups.upgradeMember.show = false
    },

    // 显示邀请好友列表
    showInvitees() {
      this.popups.invitees.show = true
      this.$root.bdTrack(['个人信息页', '点击', '邀请好友详情', '账户信息'])
    },

    // 会员提示
    showMemberTips() {
      this.$root.showAlert({
        content: `<p class="text-left"><b style="color:#29aca8;">非认证</b>：注册成功但未进行名片认证，只可访问总览页。</p>
                  <p class="text-left"><b style="color:#29aca8;">已认证</b>：注册成功且已完成名片认证，可访问市场数据和部分产品信息，不可进行检索等高级操作。</p>
                  <p class="text-left"><b style="color:#29aca8;">高级用户</b>：可享受PANO的最高级权限，使用网站的全部功能以及全域的数据检索等。</p>`
      })
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
          text: `不能大于40个字符，您已超出${diff}个字符`
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
        this.$root.bdTrack(['个人信息页', '保存', '介绍我的业务'])

        this.onSubmitIntro()
      } else {
        this.$root.log({
          name: '编辑个人业务'
        })
        this.$root.bdTrack(['个人信息页', '编辑', '介绍我的业务'])

        setTimeout(() => {
          this.$els.introTextarea.focus()
        }, 10)

        this.editingIntro = true
      }
    },

    // 打开业务偏好和偏好资产
    openBATypes() {
      this.$root.log({
        name: '编辑业务偏好和偏好资产'
      })
      this.$root.bdTrack(['个人信息页', '添加', '业务偏好'])
      this.popups.baTypes.show = true
    },

    // 关闭业务偏好和偏好资产
    closeBATypes(cancelled) {
      if (cancelled) {
        this.$root.log({
          name: '取消编辑业务偏好和偏好资产'
        })
        this.$root.bdTrack(['个人信息页', '取消', '业务偏好'])

        this.popups.baTypes.show = false
        return
      }

      this.$refs.baTypes.saveBAdata().then(() => {
        this.popups.baTypes.show = false
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
    },

    // 机构数据适配
    dataAdaptor(data) {
      _.each(data.institutions, v => {
        v.is_followed = true
      })

      _.each(data.recommended, v => {
        v.is_followed = false
      })
    },

    // 关注切换回调
    update(data, instType) { // 0 平台 1交易所
      this.dataAdaptor(data)

      this.info[instType ? 'institutions' : 'platforms'].institutions = data.institutions
      this.info[instType ? 'institutions' : 'platforms'].recommended = data.recommended
    },

    changeRecommendedBatch(instType) {
      this.$root.bdTrack(['个人信息页', '刷新', instType ? '交易所' : '互联网平台'])
      this.$root.log({
        name: `换一批${instType ? '交易所' : '互联网平台'}`
      })

      // 获取机构类型的信息
      let r = this.recommended[instType ? 'institutions' : 'platforms']

      if (r.page < r.pages - 1) {
        ++r.page
      } else {
        r.page = 0
      }

      Utils.setSessionByKey('profilePageSession', {
        r_p_page: this.recommended.platforms.page,
        r_i_page: this.recommended.institutions.page
      })
    }
  },

  computed: {
    invitationGroupVisibel() {
      return (this.user.group === 'certified' && this.user.status === 'passed') || this.user.group === 'premium'
    },
    // 选择的业务偏好名称
    selectedBt() {
      return _.map(this.info.business_types.selected, 'name').join('、')
    },
    // 选择的偏好资产名称
    selectedAt() {
      return _.map(this.info.asset_types.selected, 'name').join('、')
    },
    // 分页取推荐的交易所
    recommendedInstitutionsCurrent() {
      let r = this.recommended.institutions
      let insts = this.info.institutions.recommended.slice(0)
      r.pages = Math.ceil(insts.length / r.pageSize)

      if (r.pages > 1) {
        // 补全-满足pageSize的整数倍
        insts = _.concat(insts, insts.slice(0, r.pageSize - insts.length % r.pageSize))
        return insts.slice(r.page * r.pageSize, (r.page + 1) * r.pageSize)
      } else {
        return insts
      }
    },
    // 分页取推荐的互金平台
    recommendedPlatformsCurrent() {
      let r = this.recommended.platforms
      let insts = this.info.platforms.recommended.slice(0)
      r.pages = Math.ceil(insts.length / r.pageSize)

      if (r.pages > 1) {
        // 补全-满足pageSize的整数倍
        insts = _.concat(insts, insts.slice(0, r.pageSize - insts.length % r.pageSize))
        return insts.slice(r.page * r.pageSize, (r.page + 1) * r.pageSize)
      } else {
        return insts
      }
    }
  },

  data() {
    let profilePageSession = Utils.getSessionByKey('profilePageSession')

    return {
      editingIntro: false,
      recommended: { // 推荐 recommended
        platforms: {
          page: profilePageSession.r_p_page || 0,
          pageSize: 3,
          pages: 0
        },
        institutions: {
          page: profilePageSession.r_i_page || 0,
          pageSize: 3,
          pages: 0
        }
      },
      model: {
        avatarDirection: 'portrait',
        avatarStyles: {},
        // customTag: '',
        // businessTypes: [],
        // assetTypes: [],
        relativeProducts: []
      },
      popups: {
        baTypes: {
          show: false,
          height: '100%'
        },
        relativeProducts: {
          show: false,
          height: '100%'
        },
        upgradeMember: {
          show: false,
          height: '100%'
        },
        invitees: {
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
        refer_projects: {
          info: '',
          list: []
        },
        my_projects: {
          info: ''
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
    height: 5.555556rem; //690px
    // height: 6.441224rem; //800px
    background: linear-gradient(to bottom, #304366, #27719d);
    transform: translate3d(0, 0, 0);
    // .btn-share {
    //   position: absolute;
    //   right: 0.281804rem; //35px
    //   top: 0.241546rem; //30px
    //   width: auto;
    //   height: auto;
    //   line-height: 1.8;
    //   border-radius: 100px;
    //   padding: 0 .8em;
    //   font-size: 0.273752rem; //34px
    //   color: #adc1d2;
    //   background-color: #314f76;
    // }
    .item {
      margin-bottom: 0.161031rem; //30px
    }
    .avatar-container {
      position: relative;
      .icon-arrow-bold {
        font-size: 0.302576rem;
        position: absolute;
        right: -0.805153rem; //100px
        top: 1.08rem; //120px
        color: #29b9ae;
      }
    }
    .avatar {
      position: relative;
      z-index: 9;
      box-sizing: border-box;
      border: 0.161031rem solid rgba(52, 146, 211, .15); // 20px
      overflow: hidden;
      border-radius: 50%;
      width: 2.616747rem; //325px
      height: 2.616747rem; //325px
      &.no-avatar {
        display: flex;
        align-items: flex-end;
        justify-content: center;
      }
      .icon-pano {
        color: rgba(52, 146, 211, .15);
        font-size: 1.610306rem; //200px
      }
      img {
        position: absolute;
      }
      &.portrait {
        img {
          width: 100%;
          // transform: translateY(-20%);
        }
      }
      &.landscape {
        img {
          // transform: translateX(-20%);
          height: 100%;
        }
      }
    }
    .name {
      color: white;
    }
    // .company {
    //   color: #29b9ae;
    // }
    .company {
      position: relative;
      &.has-job {
        margin-right: 0.483092rem; //60px
        &:after {
          right: -0.241546rem; //30px
          top: 0.10515rem; //10px
          content: '';
          position: absolute;
          width: 0;
          border-right: 1px solid rgba(122, 161, 193, 0.59);
          height: 0.8em;
        }
      }
    }
    .dj {
      // .department {
      //   margin-right: 0.483092rem; //60px
      // }
      display: flex;
      align-items: center;
      color: #adc1d2;
      font-size: 0.289855rem; // 36px
      // padding-top: 0.161031rem; //30px
      padding: 0.161031rem 1em 0; //30px
      border-top: 1px solid #3378a7;
      margin-top: 0.080515rem; //10px
    }
    .gs {
      font-size: 0.273752rem; //34px
    }
    .remark {
      position: absolute;
      color: white;
      transform: translateX(0.322061rem); //40px
      .icon-pano {
        color: #b1b7c4;
      }
      .icon-info {
        font-size: 1em;
        vertical-align: -1px;
        margin-left: 0.080515rem; //5px
      }
      .icon-arrow-bold {
        vertical-align: 1px;
        font-size: .7em;
        margin-left: 0.024155rem; //3px
        margin-right: 0.040258rem; //5px
      }
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
      padding: 0.080515rem 0.563607rem; //10px 70px
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
        // background: none;
        box-shadow: 2px 2px 3px rgba(51, 120, 167, 1), -2px -2px 3px rgba(51, 120, 167, 1);
      }
      textarea {
        width: 100%;
        height: 100%;
        resize: none;
        vertical-align: top;
        // background: none;
        border: 0;
        background: none;
        color: white;
        line-height: 1;
        // padding: 0;
        border-radius: 0;
        box-shadow: none;
        -webkit-appearance: none;
      }
      .icon-pano {
        padding: 1em;
        position: absolute;
        right: -.5em;
        top: 1.25em;
        transform: translateY(-50%);
        color: #29b9ae;
        &.icon-edit {
          right: -.5em;
          top: .95em;
        }
      }
    }
  }
  .tag {
    display: inline-block;
    border-radius: 100px;
    padding: 0.024155rem 0.201288rem; //3px 25px
    background-color: #a6afbe;
    color: white;
    font-size: 0.273752rem; //34px
    line-height: 1.4;
    .icon-pano {
      font-size: .9em;
      margin-right: 2px;
    }
    &.tag-blue {
      background-color: #4380dd;
    }
    &.tag-green {
      background-color: #29aca8;
    }
    &.tag-green-light {
      background-color: #3bc5ba;
    }
    &.tag-orange {
      background-color: #ffc445;
    }
    &.tag-red {
      background-color: #e06161;
    }
  }
  .invitation-group {
    p {
      text-align: left;
      font-size: 0.289855rem; //36px
      color: #acb1bd;
      line-height: 1.8;
    }
    .default-content {
      margin: 0.402576rem 0 0.241546rem; //50px 30px
    }
    .tag {
      vertical-align: 3px;
      margin-left: 0.241546rem; //30px
    }
    .invitation-count {
      font-size: 0.322061rem; //40px
      color: #3d4351;
    }
    em {
      font-size: 1.5em;
    }
  }
}
</style>
