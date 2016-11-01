<template lang="jade">
.select-join-inst
  kt-loading(:visible='$loadingRouteData')
  .head 请选择一个您想对接的机构，向他们推送项目吧！
  .insts
    ul
      li(v-for='inst in instList', :class='{"row-last": $index % 3 === 2}')
        .in
          input(id='inst{{$index}}', name='inst', :value='inst.id', type='radio', v-model='model.platform_id')
          label(for='inst{{$index}}')
            i.icon-pano.icon-checkbox
          .inst
            .img-box
              img(:src='inst.logo', @click='goInstDetail(inst.name)')
            p {{inst.name}}
    a.load-more(@click='moreInst()', v-show='model.instPage * 9 < insts.length') 更多
  group.kaitong-refer
    div.cell
      p 无明确的意向对接机构？想获得专家级的平台挑选？<br>想同时向多家平台推送项目？
      .checkbox
        input(id='kaitongRefer', type='checkbox', v-model='model.kaitong_refer')
        label(for='kaitongRefer')
          i.icon-pano.icon-checkbox
          | 开通资产推介服务
        p 开通的资产专家为您挑选最合适的平台，并将您的资产推荐给多个匹配平台，为您的金融资产发行提供全流程支持及运营服务。
  .buttons-footer
    button(v-if='$route.params.type === "add"', @click='next()') 下一步
      i.icon-pano.icon-arrow-right
    button(v-if='$route.params.type !== "add"', @click='submit()') 提交
</template>

<script>
import _ from 'lodash'
import Group from 'vux-components/group'
import KtLoading from '../../components/kt-loading.vue'
import {
  projects
} from '../../common/resources.js'

export default {
  components: {
    Group,
    KtLoading
  },

  route: {
    data() {
      return projects.get({
        content: 'platform_list'
      }).then(res => {
        return {
          insts: res.json().res
        }
      }).catch(res => {
        this.$root.showToast({
          text: res.json().error || '抱歉，服务器繁忙!'
        })
      })
    },

    activate({
      to,
      from,
      next
    }) {
      this.submitRedirect = to.query.redirect_to ? decodeURIComponent(to.query.redirect_to) : from.path
      next()
    }
  },

  /*watch: {
    'model.platform_id' () {
      if (this.model.platform_id.length > 1) {
        this.model.platform_id.shift() // 禁止选择多个
        // this.$root.showToast('每天最多只能选择一个机构哦！')
      }
    }
  },*/

  methods: {
    goInstDetail(name) {
      this.cacheModel()
      this.$root.goInstDetail(name)
    },

    // 新建-下一步
    next() {
      if (!this.model.platform_id.length) {
        this.$root.showToast('请选择一个您想对接的机构！')
        return false
      }

      this.cacheModel()
      this.$router.go({
        name: 'projectInfo',
        query: {
          ...this.model,
          asset_type: this.$route.query.asset_type || '',
          redirect_to: this.submitRedirect || ''
        }
      })
    },

    // 编辑-提交
    submit() {
      if (!this.model.platform_id.length) {
        this.$root.showToast('请选择一个您想对接的机构！')
        return false
      } else if (!this.model.platform_id.length > 1) {
        this.$root.showToast('每天最多只能选择一个机构哦！')
        return false
      }

      this.$root.showLoadingStatus()
      projects.update({}, {
        project_id: this.$route.params.type,
        platform_id: this.model.platform_id,
        kaitong_refer: this.model.kaitong_refer
      }).then(res => {
        this.$root.hideLoadingStatus()
        let wxQrcode = require('../../assets/images/weixin-pano.jpg')
        let content = `<div class="text-center">提交成功！如您选择的意向机构对该项目感兴趣，我们会尽快与您沟通。您可联系PANO微信小秘书，随时了解进度情况：<br><img src="${wxQrcode}" width="80%"/></div>`

        this.$root.showAlert({
          content: content,
          onHide: function() {
            this.$router.go({
              path: this.submitRedirect || '/quotation/ob'
            })
          }.bind(this)
        })
      }).catch(res => {
        this.$root.hideLoadingStatus()
        this.$root.showToast(res.json().error || '抱歉，服务器繁忙！')
      })
    },

    // 加载更多机构
    moreInst() {
      this.model.instPage++
    },

    // 缓存当前数据
    cacheModel() {
      window.sessionStorage[this.$route.name + '.' + (this.$route.params.type || 'new') + '.cache'] = JSON.stringify(this.model)
    }
  },

  computed: {
    instList() {
      return _.filter(this.insts, (v, i) => {
        return i < this.model.instPage * 9
      })
    }
  },

  data() {
    let cacheModel = JSON.parse(window.sessionStorage[this.$route.name + '.' + (this.$route.params.type || 'new') + '.cache'] || '{"instPage": 1}')

    return {
      model: {
        instPage: 1, // 用于记录加载了几页的机构
        kaitong_refer: true,
        platform_id: '',
        ...cacheModel
      },
      submitRedirect: '', // 提交后的跳转
      insts: []
    }
  }
}
</script>

<style lang="scss" scoped>
$green: #3bc5ba;
.head {
  height: 0.966184rem; //120px
  line-height: 0.966184rem; //120px
  font-size: 0.289855rem; //36px
  color: #adb1bc;
  padding: 0 0.402576rem; //50px
}

.load-more {
  height: 0.845411rem;
  line-height: 0.845411rem; // 105px
  font-size: 0.354267rem; //44px;
  text-align: center;
  color: $green;
  display: block;
  &:active {
    background: #f1f6fb;
  }
}

.icon-checkbox {
  color: #dde1f0;
}

input[type="checkbox"],
input[type="radio"] {
  display: none;
}

input[type="checkbox"]:checked + label,
input[type="radio"]:checked + label {
  .icon-checkbox {
    color: $green;
  }
}

.insts {
  background: white;
  border-bottom: 1px solid #e9ecf1;
  border-top: 1px solid #e9ecf1;
  ul {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 0;
      border-bottom: 1px solid #e9ecf1;
    }
  }
  li {
    // flex: 1;
    width: 33.33%;
    border: 1px solid #eff2f7;
    border-width: 0 1px 1px 0;
    box-sizing: border-box;
    &.row-last {
      border-right: 0;
    }
    .in {
      padding: 0 0 0.322061rem 1.207729rem; //40px 150px
      position: relative;
    }
    label {
      height: 100%;
      width: 1.207729rem; //150px
      left: 0;
      position: absolute;
      .icon-checkbox {
        left: 0.402576rem; //50px
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.483092rem; //50px
        position: absolute;
      }
    }
    input[type="checkbox"]:checked ~ .inst {
      p {
        color: #474650;
      }
    }
    .inst {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 0.322061rem; //40px
      p {
        color: #acb1bd;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        /* min-width: 0; */
        width: 100%;
        text-align: center;
      }
    }
    .img-box {
      height: 1.449275rem; //180px
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    img {
      max-width: 80%;
      max-height: 80%;
    }
  }
}

.kaitong-refer {
  .cell {
    color: #adb1bc;
    font-size: 0.273752rem; //34px
    padding: 0.322061rem 0.402576rem; //40px 50px
  }
  .checkbox {
    margin: 1em 0 .5em .5em;
    p {
      margin-top: .5em;
      font-size: 0.289855rem; //36px
      color: #737e9c;
    }
    label {
      font-size: 0.322061rem; //40px
      color: #737e9c;
    }
    .icon-checkbox {
      margin-right: .3em;
    }
  }
}

.buttons-footer {
  background: none;
}
</style>
