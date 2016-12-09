<template lang="jade">
div
  kt-loading(:visible='$loadingRouteData')
  .institutions-list
  .group
    kt-cell(title='我的关注', icon='icon-plus', @on-title-click='$router.go({name: "allInstitutions", query: $route.query})')
      .kt-list(v-for='item in institutions', v-if='institutions.length', class='one-line-content', :title='item.name', @click='goInstDetail(item, {dimension: "mapped_exchange"})')
        .icon
          img(:src='item.logo', :alt='item.name')
        .main
          h3 {{item.name}}
          p(v-if='item.partners || item.asset_types')
            | {{$route.query.dimension === 'mapped_exchange' ? '主要合作机构' : '已发行的资产类型'}}：<br/>
            span(class='gray') {{$route.query.dimension === 'mapped_exchange' ? item.partners.join(' ') : item.asset_types.join(' ')}}
        .right(@click.stop='toggleAttention(item, $route.query.dimension === "mapped_exchange" ? 1 : 0, update)')
          a
            i.icon-pano(:class='{"icon-ok2": item.is_followed, "icon-plus": !item.is_followed}')
            | {{item.is_followed ? '已关注' : '关注'}}
      .default-content(v-if='!institutions.length', v-link='{name: "allInstitutions", query: $route.query}')
        i.icon-pano.icon-plus 选择要关注的互联网金融平台
    kt-cell(title='为我推荐', v-if='recommendedCurrent.length', :icon='rPages > 1 ? "icon-refresh" : ""', @on-icon-click='changeBatch()')
      //- div(slot='title', v-link='{name: "allInstitutions"}') 我的关注
      .kt-list(v-for='item in recommendedCurrent', class='one-line-content', :title='item.name', @click='goInstDetail(item, {dimension: "mapped_exchange"})')
        .icon
          img(:src='item.logo', :alt='item.name')
        .main
          h3 {{item.name}}
          p(v-if='item.partners || item.asset_types')
            | {{$route.query.dimension === 'mapped_exchange' ? '主要合作机构' : '已发行的资产类型'}}：<br/>
            span(class='gray') {{$route.query.dimension === 'mapped_exchange' ? item.partners.join(' ') : item.asset_types.join(' ')}}
        .right(@click.stop='toggleAttention(item, $route.query.dimension === "mapped_exchange" ? 1 : 0, update)')
          a
            i.icon-pano(:class='{"icon-ok2": item.is_followed, "icon-plus": !item.is_followed}')
            | {{item.is_followed ? '已关注' : '关注'}}
    //- .foot
    //-   a.change-batch(@click='changeBatch()')
    //-     em 换一批
</template>

<script>
import KtCell from '../../components/kt-cell'
import {
  persons
} from '../../common/resources'
import institutionMixins from './intitution_mixins'
import _ from 'lodash'
import Utils from '../../common/utils'

export default {
  mixins: [institutionMixins],
  components: {
    KtCell
  },

  route: {
    canActivate({
      next,
      to
    }) {
      to.data.title = to.query.dimension !== 'mapped_exchange' ? '关注的互联网金融平台' : '关注的挂牌场所'
      next()
    },

    data({
      to: {
        query
      }
    }) {
      return persons.get({
        content: 'relative_institutions',
        need_all: false,
        institution_type: query.dimension === 'mapped_exchange' ? 1 : 0
      }).then(res => {
        let data = res.json()

        this.dataAdaptor(data)

        let _self = this
        setTimeout(() => {
          window.scrollTo(0, _self.$route.data.scrollY || 0)
        }, 200)

        return data
      })
    }
  },

  methods: {
    dataAdaptor(data) {
      _.each(data.institutions, v => {
        v.is_followed = true
      })

      _.each(data.recommended, v => {
        v.is_followed = false
      })

      this.rPages = Math.ceil(data.recommended.length / this.rPageSize)

      if (this.rPages > 1) {
        // 补全-满足rPageSize的整数倍
        data.recommended = _.concat(data.recommended, data.recommended.slice(0, this.rPageSize - data.recommended.length % this.rPageSize))
      }
    },

    update(data) {
      this.dataAdaptor(data)
      this.institutions = data.institutions
      this.recommended = data.recommended
    },

    // 换一批推荐机构
    changeBatch() {
      this.$root.log({
        name: '换一批'
      })

      if (this.rPage < this.rPages - 1) {
        ++this.rPage
      } else {
        this.rPage = 0
      }

      Utils.setSessionByKey('moreInstitutionsPageSession', {
        rPage: this.rPage
      })
    }
  },

  computed: {
    dimension() {
      return this.$route.query.dimension
    },
    recommendedCurrent() {
      return this.recommended.slice(this.rPage * this.rPageSize, (this.rPage + 1) * this.rPageSize)
    }
  },

  data() {
    let moreInstitutionsPageSession = Utils.getSessionByKey('moreInstitutionsPageSession')
    return {
      rPages: 0,
      rPage: moreInstitutionsPageSession.rPage || 0,
      rPageSize: 5,
      institutions: [],
      recommended: []
    }
  }
}
</script>

<style scoped lang="scss">
/* .foot {
  text-align: center;
  padding: 0.322061rem 0; //40px
  .change-batch {
    padding: 0 1em;
  }
  a {
    font-size: 0.322061rem;
  }
} */
</style>
