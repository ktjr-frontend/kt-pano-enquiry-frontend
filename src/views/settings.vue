<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

  </div>
  <div class="tabbar">
    <div class="tab" v-for="tab in tabs" :class="{'active': tab.active}">
      <a v-link="tab.link">
        <i class="icon-pano" :class="tab.icon"></i>{{tab.name}}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [{
        active: true,
        name: '询价',
        icon: 'icon-search',
        link: {
          name: 'enquiry'
        }
      }, {
        active: false,
        name: '我',
        icon: 'icon-man',
        link: {
          name: 'settings'
        }
      }]
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
