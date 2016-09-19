<template lang="jade">
div
  kt-loading(:visible='$loadingRouteData')
  .institutions-list
  .group
    kt-cell(title='我的关注', icon='icon-arrow-right', @on-title-click='$router.go({name: "allInstitutions", query: $route.query})')
      .kt-list(v-for='item in institutions', v-if='institutions.length', class='one-line-content', :title='item.name', @click='goInstDetail(item.name, {dimension: "mapped_exchange"})')
        .icon
          img(:src='item.logo', :alt='item.name')
        .main
          h3 {{item.name}}
          p(v-if='item.partners')
            | {{$route.query.dimension === 'mapped_exchange' ? '主要合作机构' : '已发行的资产类型'}}：<br/>
            span(class='gray') {{$route.query.dimension === 'mapped_exchange' ? item.partners.join(' ') : item.asset_types.join(' ')}}
        .right
          a(@click.stop='toggleAttention(item)')
            i.icon-pano(:class='{"icon-ok2": item.is_followed, "icon-plus": !item.is_followed}')
            | {{item.is_followed ? '已关注' : '关注'}}
      .default-content(v-if='!institutions.length', v-link='{name: "allInstitutions", query: $route.query}')
        i.icon-pano.icon-plus
        选择要关注的互联网金融平台
    kt-cell(title='为我推荐', v-if='recommended.length')
      //- div(slot='title', v-link='{name: "allInstitutions"}') 我的关注
      .kt-list(v-for='item in recommended', v-if='recommended.length', class='one-line-content', :title='item.name', @click='goInstDetail(item.name, {dimension: "mapped_exchange"})')
        .icon
          img(:src='item.logo', :alt='item.name')
        .main
          h3 {{item.name}}
          p(v-if='item.partners')
            | {{$route.query.dimension === 'mapped_exchange' ? '主要合作机构' : '已发行的资产类型'}}：<br/>
            span(class='gray') {{$route.query.dimension === 'mapped_exchange' ? item.partners.join(' ') : item.asset_types.join(' ')}}
        .right
          a(@click.stop='toggleAttention(item)')
            i.icon-pano(:class='{"icon-ok2": item.is_followed, "icon-plus": !item.is_followed}')
            | {{item.is_followed ? '已关注' : '关注'}}

</template>

<script>
import KtCell from '../../components/kt-cell'
import {
  persons
} from '../../common/resources'
import institutionMixins from './intitution_mixins'

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

        data.institutions.forEach(v => {
          v.is_followed = true
        })

        data.recommended.forEach(v => {
          v.is_followed = false
        })

        return data
      })
    }
  },
  methods: {},

  computed: {
    dimension() {
      return this.$route.query.dimension
    }
  },
  data() {
    return {
      institutions: [],
      recommended: []
    }
  }
}
</script>

<style scoped lang="scss">

</style>
