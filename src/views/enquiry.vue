<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

  </div>
  <tabbar>
    <tabbar-item show-dot>
      <i slot="icon" class="icon-pano icon-search"></i>
      <span slot="label">询价</span>
    </tabbar-item>
    <tabbar-item selected>
      <i slot="icon" class="icon-pano icon-man"></i>
      <span slot="label">我</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
import Tabbar from 'vux-components/tabbar'
import TabbarItem from 'vux-components/tabbar-item'

export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: '你好'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
