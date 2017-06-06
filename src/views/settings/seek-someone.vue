<template lang="jade">
.seek-someone(:class="{pc: isPc}")
  //- .header
    .in
      | 找人
      em 限时免费
  //- .group
    kt-cell
      figure
  figure
    img(src="../../assets/images/seek-someone-bg.jpg")
  .buttons
    button(@click="go()") 火速前往
      i.icon-pano.icon-arrow-bold
</template>

<script>
import KtCell from '../../components/kt-cell.vue'
import Utils from '../../common/utils.js'
import Env from '../../env.js'

export default {
  components: {
    KtCell
  },

  ready() {
    this.isPc = !Utils.isMobile()
  },

  methods: {
    go() {
      this.$root.bdTrack(['找人介绍页', '点击', '火速前往'])
      if (this.isPc) {
        const uriToken = encodeURIComponent(localStorage.token || '')
        location.href = `${Env.hostName}/pano/find?_t=${uriToken}`
      } else {
        this.$router.go({
          name: 'seekSomeoneEdit',
          params: {
            type: 'add'
          }
        })
      }
    }
  },

  data() {
    return {
      isPc: false
    }
  }
}
</script>

<style lang="scss" scoped>
.seek-someone.pc {
  figure {
    text-align: center;
  }
  img {
    max-width: 600px;
  }
  .buttons {
    text-align: center;
    button {
      max-width: 600px;
    }
  }
}

figure {
  img {
    vertical-align: top;
    width: 100%;
  }
}

.buttons {
  padding: 0.402576rem; // 50px
  button {
    background: #53a2e4;
    position: relative;
    &:active {
      background: lighten(#53a2e4, 5%);
    }
  }
  .icon-arrow-bold {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(4em);
  }
}


/* .header {
  height: 1.288245rem; //160px
  line-height: 1.288245rem; //160px
  font-size: 0.402576rem; //50px
  color: #3bc5ba;
  border-bottom: 0.032206rem solid #3bc5ba; //4px
  // text-align: center;
  .in {
    display: inline-block;
    margin-left: 50%;
    transform: translateX(-1em);
  }
  em {
    font-size: 0.289855rem; //36px
    color: #e06161;
    margin-left: 1em;
    vertical-align: .1em;
  }
} */

figure {
  min-height: 10.466989rem; //1300px
}
</style>
