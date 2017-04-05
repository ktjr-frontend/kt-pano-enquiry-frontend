import Vue from 'vue'
import Router from 'vue-router'
import App from './app'
import VueValidator from 'vue-validator'
import setValidators from './common/validators'
import _ from 'lodash'
import log from './common/log'
import routes from './routes'
import { showConfirm, showAlert, showToast, updateTabVisible } from './vuex/actions'
import store from './vuex/store'
import permitJudge from './routes/permits.js'

// 自定义validator
Vue.use(Router)
Vue.use(VueValidator) //这个插件的注入要和路由放到一起 不然报错 reqiure is not defined
setValidators(Vue.validator)

const router = new Router({
  // history: true // 打开以后再ios上面会导致微信jssdk config不成功
})

router.map(routes)

router.redirect({
  '*': '/quotation/ob',
  '/quotation': '/quotation/ob'
})

router.beforeEach(({ from, to, abort, next }) => {
  const permit = permitJudge(to)
  if (permit.passed) {
    next()
  } else { //已经登录的
    if (permit.showToast) {
      showToast(store, {
        text: '由于您未通过认证审核，无权访问该页面！'
      })
    }
    if (permit.redirect) {
      router.replace(permit.redirect)
    } else {
      abort()
    }
  }
})

// 哪些页面可以回跳
const canBackToRoutes = [
  'profile', 'settings', 'allInstitutions',
  'moreInstitutions', 'myProjects', 'myProjectDetail', 'referProjects',
  'referProjectDetail', 'interestProjects', 'interestProjectDetail', 'forgetPassword1',
  'forgetPassword2', 'changeMobile1', 'changeMobile2', 'changePassword'
]

router.afterEach(({ from, to }) => {
  updateTabVisible(store, to.query.shared ? false : to.data.tabVisible)
  const user = store.state.user

  if (to.data.normalLimit && user.group === 'normal') { // 非认证用户
    showConfirm(store, {
      content: '请您进行名片认证，以使用该功能。',
      confirmText: '去认证',
      onConfirm() {
        router.go({
          name: 'perfect',
          query: {
            certifyApplication: true // 认证申请，不显示跳过按钮
          }
        })
      },
      onCancel() {
        if (_.includes(canBackToRoutes, from.name)) {
          router.go({
            name: from.name
          })
        } else {
          router.go({
            name: 'quotationOB'
          })
        }
      }
    })
  } else if (to.data.pendedLimit && user.status === 'pended') { // 待审核用户
    showAlert(store, {
      content: '您的名片认证正在审核，审核通过后才可使用该功能，请耐心等候。',
      buttonText: '好的',
      onHide() {
        if (_.includes(canBackToRoutes, from.name)) {
          router.go({
            name: from.name
          })
        } else {
          router.go({
            name: 'quotationOB'
          })
        }
      }
    })
  } else if (to.data.rejectedLimit && user.status === 'rejected') { // 审核不通过用户
    showConfirm(store, {
      content: '您的认证审核未通过，暂时无法使用该功能，请重新提交审核。',
      confirmText: '前往',
      onConfirm() {
        router.go({
          name: 'settings'
        })
      },
      onCancel() {
        if (_.includes(canBackToRoutes, from.name)) {
          router.go({
            name: from.name
          })
        } else {
          router.go({
            name: 'quotationOB'
          })
        }
      }
    })
  }

  const getTitle = function(to) {
    if (_.includes(['quotationDetail'], to.name)) { // 报价板详情 定制化title
      return to.query.asset_type
    }
    return to.data.title
  }

  document.title = getTitle(to) || document.title
  document.querySelector('.logo-bottom').style.display = 'none'
  document.body.setAttribute('page', to.name)

  // hack ios title not update bug
  const iframe = document.createElement('iframe')
  iframe.classList.add('dn')
  iframe.src = require('./assets/images/weixin-secret.jpeg')
  document.body.appendChild(iframe)
  iframe.onload = () => {
    setTimeout(() => {
      iframe.onload = null
      document.body.removeChild(iframe)
    }, 10)
  }

  // url跟踪
  log({
    path: to.path
  })

  // 每页默认滚动到顶部
  // let app = document.getElementById('app')
  // app.scrollTop = 0

  window.scrollTo(0, 0)

  // 动态解决logo的位置问题
  if (to.data.logoBottomVisible) {
    setTimeout(() => {
      updateLogoBottomStyle()
    }, 10)
  }

  // 是否有tab
  const tabVisible = function() {
    if (_.includes(['quotationAM', 'quotationOB'], to.name) && to.query.shared) {
      return false
    }

    return to.data.tabVisible
  }

  document.body.classList.toggle('tab-visible', tabVisible())
})

// 底部logo控制
const updateLogoBottomStyle = function() {
  const wH = window.innerHeight
  const aH = document.querySelector('#app .child-view').offsetHeight
  if (aH + 60 >= wH) { // 60 logo-bottom 高度
    document.body.classList.add('overflow-height') // 判断内容是否高于超过窗口
  } else {
    document.body.classList.remove('overflow-height')
  }

  setTimeout(() => { document.querySelector('.logo-bottom').style.display = 'block' }, 10)
}

// 启动路由
export default function routerStart() {
  router.start(App, 'body')
}

export { router, updateLogoBottomStyle }
