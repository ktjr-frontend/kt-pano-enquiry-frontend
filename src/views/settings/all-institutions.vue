<template lang="jade">
div
  kt-loading(:visible='$loadingRouteData')
  .institutions-list
    .group
      kt-cell(@on-title-click='$router.go({name: "allInstitutions"})')
        .kt-list(v-for='item in institutions', v-if='institutions.length', class='one-line-content', :title='item.name', @click='goInstDetail(item, {dimension: "mapped_exchange"})')
          .icon
            img(:src='item.logo', :alt='item.name')
          .main
            h3 {{item.name}}
            p(v-if='item.partners || item.asset_types')
              | {{$route.query.dimension === 'mapped_exchange' ? '主要合作机构' : '已发行的资产类型'}}：<br/>
              span(class='gray') {{$route.query.dimension === 'mapped_exchange' ? item.partners.join(' ') : item.asset_types.join(' ')}}
          .right(@click.stop='toggleAttention(item)')
            a
              i.icon-pano(:class='{"icon-ok2": item.is_followed, "icon-plus": !item.is_followed}')
              | {{item.is_followed ? '已关注' : '关注'}}
</template>

<script>
import KtCell from '../../components/kt-cell'
import {
  persons
} from '../../common/resources'
import institutionMixins from './institution-mixins'
import _ from 'lodash'
import Utils from '../../common/utils'

// 多音字hack
let pinyinMap = {
  '乐视': 'L',
  '重庆': 'C'
}

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
      to.data.title = to.query.dimension !== 'mapped_exchange' ? '互联网金融平台列表' : '挂牌场所列表'
      next()
    },
    data({
      to: {
        query
      }
    }) {
      return persons.get({
        content: 'relative_institutions',
        need_all: true,
        institution_type: query.dimension === 'mapped_exchange' ? 1 : 0
      }).then(res => {
        let data = res.json()

        // 按首字拼音排序
        data.institutions = _.chain(data.institutions).each(v => {
          v.pinyin = this.getFirstCharPinyin(v.name)
        }).sortBy('pinyin').value()

        let _self = this
        setTimeout(() => {
          window.scrollTo(0, _self.$route.data.scrollY || 0)
        }, 200)

        return data
      })
    }
  },

  methods: {
    getFirstCharPinyin(str) {
      return pinyinMap[str.slice(0, 2)] || Utils.HanZiPinYin.get(str.slice(0, 1))
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
.user-card {
  .user-card-box {
    padding: 0.241546rem 0.080515rem; //20px
    text-align: center;
    img {
      // max-height: 2.415459rem;
      max-width: 100%;
    }
  }
}

.buttons {
  padding: 0.322061rem; //40px
  button {
    &:first-child {
      background: #194373;
      &:active {
        background: darken(#194373, 10%)
      }
    }
    margin-bottom: 0.322061rem;
    background: #b7bed1;
    &:active {
      background: darken(#b7bed1, 10%)
    }
  }
}
</style>
