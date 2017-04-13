<template lang="jade">
.seeks
  kt-loading(:visible='$loadingRouteData')
  .my-seeks-head
    .add(v-link='{name: "seekSomeoneEdit", params:{type: "add"}, query:{redirect_to: $route.path}}')
      i.icon-pano.icon-plus
      | 找人
  kt-no-data(v-if='!$loadingRouteData && !seeks.length', content='没有记录^_^')
  .group
    kt-cell(v-for='s in seeks', v-if="seeks.length", :title="s.created_at | moment 'YYYY-MM-DD'")
      .in-content
        h3 想要找的人：
        p {{s.search_whom}}
        h3.mt10 找人需求：
        p {{s.search_target}}
</template>

<script>
import KtNoData from '../../components/kt-no-data.vue'
import KtCell from '../../components/kt-cell'
import KtLoading from '../../components/kt-loading.vue'
import {
  peopleSearch
} from '../../common/resources'
// import _ from 'lodash'

export default {
  components: {
    KtCell,
    KtNoData,
    KtLoading
  },

  route: {
    data({
      to: {
        query
      }
    }) {
      return peopleSearch.get({
        per_page: 100,
        page: 1
      }).then(res => {
        const data = res.json()
        return {
          seeks: data.res
        }
      })
    }
  },

  methods: {},

  data() {
    return {
      seeks: []
    }
  }
}
</script>

<style scoped lang="scss">
.my-seeks-head {
  padding: 0 0.402576rem; //50px
  height: 0.966184rem; //120px
  line-height: 0.966184rem;
  border-bottom: 1px solid #3bc5ba;
  text-align: right;
  .add {
    color: #3bc5ba;
    .icon-plus {
      font-size: 0.2898550724637681rem;
      transform: scale(.6);
      display: inline-block;
      vertical-align: -1px;
      margin-right: .2em;
    }
  }
}

.kt-cell {
  .date {
    text-align: left;
    // font-size: 0.354267rem; //44px
  }
  .content {
    padding: 0.080515rem 0.402576rem 0.161031rem; //10px 50px 20px
  }
  p {
    color: #acb1bd;
  }
}

.in-content {
  text-align: left;
  h3 {
    font-size: 0.322061rem; //40px
    line-height: 2.5em;
    text-align: left;
    color: #818aa5;
  }
}
</style>
