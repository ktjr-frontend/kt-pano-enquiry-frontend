import Utils from '../common/utils'

let scrollYCache = Utils.getSessionByKey('scrollYCache')
let headVisible = process.env.NODE_ENV.indexOf('app') > -1

export default {
  '/profile': {
    data: {
      title: '个人信息页',
      scrollY: scrollYCache.profile || 0,
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: true
    },
    name: 'profile',
    needLogin: true,
    component(resolve) {
      require(['../views/settings/profile'], resolve)
    }
  },
  '/more_institutions': {
    data: {
      title: '关注的挂牌场所',
      scrollY: scrollYCache.moreInstitutions || 0,
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false
    },
    name: 'moreInstitutions',
    needLogin: true,
    component(resolve) {
      require(['../views/settings/more_institutions'], resolve)
    }
  },
  '/all_institutions': {
    data: {
      title: '关注的互联网金融平台',
      scrollY: scrollYCache.allInstitutions || 0,
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false
    },
    name: 'allInstitutions',
    needLogin: true,
    component(resolve) {
      require(['../views/settings/all_institutions'], resolve)
    }
  },
  '/settings': {
    data: {
      title: '我',
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: true
    },
    name: 'settings',
    needLogin: true,
    component(resolve) {
      require(['../views/settings/settings'], resolve)
    }
  },
  '/my_projects': {
    data: {
      title: '我发出的项目',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: true
    },
    name: 'myProjects',
    needLogin: true,
    component(resolve) {
      require(['../views/settings/my_projects.vue'], resolve)
    }
  },
  '/my_project/:id': {
    data: {
      title: '项目信息',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: true
    },
    name: 'myProjectDetail',
    needLogin: true,
    component(resolve) {
      require(['../views/settings/my_project_detail.vue'], resolve)
    }
  },
  '/refer_projects': {
    data: {
      title: '我收到的项目',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: true
    },
    name: 'referProjects',
    needLogin: true,
    component(resolve) {
      require(['../views/settings/refer_projects.vue'], resolve)
    }
  },
  '/refer_project/:id': {
    data: {
      title: '项目信息',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false
    },
    name: 'referProjectDetail',
    needLogin: true,
    component(resolve) {
      require(['../views/settings/refer_project_detail.vue'], resolve)
    }
  },
  '/interest_projects': {
    data: {
      title: '感兴趣的项目',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: true
    },
    name: 'interestProjects',
    needLogin: true,
    component(resolve) {
      require(['../views/settings/refer_projects.vue'], resolve)
    }
  },
  '/interest_project/:id': {
    data: {
      title: '项目信息',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false
    },
    name: 'interestProjectDetail',
    needLogin: true,
    component(resolve) {
      require(['../views/settings/refer_project_detail.vue'], resolve)
    }
  },
  '/forget_password1': {
    data: {
      title: '忘记密码-手机号校验',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false
    },
    name: 'forgetPassword1',
    needLogin: false,
    component(resolve) {
      require(['../views/settings/forget-password1'], resolve)
    }
  },
  '/forget_password2': {
    data: {
      title: '忘记密码-设置新密码',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false
    },
    name: 'forgetPassword2',
    needLogin: false,
    component(resolve) {
      require(['../views/settings/forget-password2'], resolve)
    }
  },
  '/change_mobile1': {
    data: {
      title: '修改手机-原手机号校验',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false
    },
    name: 'changeMobile1',
    needLogin: true,
    component(resolve) {
      require(['../views/settings/change-mobile1'], resolve)
    }
  },
  '/change_mobile2': {
    data: {
      title: '修改手机-新手机号校验',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false
    },
    name: 'changeMobile2',
    needLogin: true,
    component(resolve) {
      require(['../views/settings/change-mobile2'], resolve)
    }
  },
  '/change_password': {
    data: {
      title: '修改密码',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false
    },
    name: 'changePassword',
    needLogin: true,
    component(resolve) {
      require(['../views/settings/change-password'], resolve)
    }
  },
  '/register': {
    name: 'register',
    data: {
      title: '注册',
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: false
    },
    component(resolve) {
      require(['../views/register'], resolve)
    }
  },
  '/login': {
    name: 'login',
    data: {
      title: '登录',
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: false
    },
    component(resolve) {
      require(['../views/login'], resolve)
    }
  },
  '/perfect': {
    needLogin: true,
    name: 'perfect',
    data: {
      title: '上传名片',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false
    },
    component(resolve) {
      require(['../views/perfect'], resolve)
    }
  }
}
