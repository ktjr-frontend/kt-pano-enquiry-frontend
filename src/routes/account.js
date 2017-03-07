import Utils from '../common/utils'

const scrollYCache = Utils.getSessionByKey('scrollYCache')
const headVisible = process.env.NODE_ENV.indexOf('app') > -1

export default {
  '/profile': {
    data: {
      title: '个人信息页',
      scrollY: scrollYCache.profile || 0,
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: true,
      permits: {
        premium: ['passed', 'pended', 'rejected'],
        certified: ['passed', 'pended', 'rejected'],
        normal: ['passed', 'pended', 'rejected']
      }
    },
    name: 'profile',
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
      tabVisible: false,
      permits: {
        premium: ['passed', 'pended', 'rejected'],
        certified: ['passed', 'pended', 'rejected'],
        normal: ['passed', 'pended', 'rejected']
      }
    },
    name: 'moreInstitutions',
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
      tabVisible: false,
      permits: {
        premium: ['passed', 'pended', 'rejected'],
        certified: ['passed', 'pended', 'rejected'],
        normal: ['passed', 'pended', 'rejected']
      }
    },
    name: 'allInstitutions',
    component(resolve) {
      require(['../views/settings/all_institutions'], resolve)
    }
  },
  '/settings': {
    data: {
      title: '我',
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: true,
      permits: {
        premium: ['passed', 'pended', 'rejected'],
        certified: ['passed', 'pended', 'rejected'],
        normal: ['passed', 'pended', 'rejected']
      }
    },
    name: 'settings',
    component(resolve) {
      require(['../views/settings/settings'], resolve)
    }
  },
  '/my_projects': {
    data: {
      title: '我发出的项目',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: true,
      permits: {
        premium: ['passed', 'pended', 'rejected'],
        certified: ['passed', 'pended', 'rejected'],
        normal: ['passed', 'pended', 'rejected']
      }
    },
    name: 'myProjects',

    component(resolve) {
      require(['../views/settings/my_projects.vue'], resolve)
    }
  },
  '/my_project/:id': {
    data: {
      title: '项目信息',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: true,
      permits: {
        premium: ['passed', 'pended', 'rejected'],
        certified: ['passed', 'pended', 'rejected'],
        normal: ['passed', 'pended', 'rejected']
      }
    },
    name: 'myProjectDetail',
    component(resolve) {
      require(['../views/settings/my_project_detail.vue'], resolve)
    }
  },
  '/refer_projects': {
    data: {
      title: '我收到的项目',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: true,
      permits: {
        premium: ['passed', 'pended', 'rejected'],
        certified: ['passed', 'pended', 'rejected'],
        normal: ['passed', 'pended', 'rejected']
      }
    },
    name: 'referProjects',
    component(resolve) {
      require(['../views/settings/refer_projects.vue'], resolve)
    }
  },
  '/refer_project/:id': {
    data: {
      title: '项目信息',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false,
      permits: {
        premium: ['passed', 'pended', 'rejected'],
        certified: ['passed', 'pended', 'rejected'],
        normal: ['passed', 'pended', 'rejected']
      }
    },
    name: 'referProjectDetail',
    component(resolve) {
      require(['../views/settings/refer_project_detail.vue'], resolve)
    }
  },
  '/interest_projects': {
    data: {
      title: '感兴趣的项目',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: true,
      permits: {
        premium: ['passed', 'pended', 'rejected'],
        certified: ['passed', 'pended', 'rejected'],
        normal: ['passed', 'pended', 'rejected']
      }
    },
    name: 'interestProjects',
    component(resolve) {
      require(['../views/settings/refer_projects.vue'], resolve)
    }
  },
  '/interest_project/:id': {
    data: {
      title: '项目信息',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false,
      permits: {
        premium: ['passed', 'pended', 'rejected'],
        certified: ['passed', 'pended', 'rejected'],
        normal: ['passed', 'pended', 'rejected']
      }
    },
    name: 'interestProjectDetail',
    component(resolve) {
      require(['../views/settings/refer_project_detail.vue'], resolve)
    }
  },
  '/forget_password1': {
    data: {
      title: '忘记密码-手机号校验',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false,
      permits: {
        premium: ['passed', 'pended', 'rejected'],
        certified: ['passed', 'pended', 'rejected'],
        normal: ['passed', 'pended', 'rejected']
      }
    },
    name: 'forgetPassword1',
    component(resolve) {
      require(['../views/settings/forget-password1'], resolve)
    }
  },
  '/forget_password2': {
    data: {
      title: '忘记密码-设置新密码',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false,
      permits: {
        premium: ['passed', 'pended', 'rejected'],
        certified: ['passed', 'pended', 'rejected'],
        normal: ['passed', 'pended', 'rejected']
      }
    },
    name: 'forgetPassword2',
    component(resolve) {
      require(['../views/settings/forget-password2'], resolve)
    }
  },
  '/change_mobile1': {
    data: {
      title: '修改手机-原手机号校验',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false,
      permits: {
        premium: ['passed', 'pended', 'rejected'],
        certified: ['passed', 'pended', 'rejected'],
        normal: ['passed', 'pended', 'rejected']
      }
    },
    name: 'changeMobile1',
    component(resolve) {
      require(['../views/settings/change-mobile1'], resolve)
    }
  },
  '/change_mobile2': {
    data: {
      title: '修改手机-新手机号校验',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false,
      permits: {
        premium: ['passed', 'pended', 'rejected'],
        certified: ['passed', 'pended', 'rejected'],
        normal: ['passed', 'pended', 'rejected']
      }
    },
    name: 'changeMobile2',
    component(resolve) {
      require(['../views/settings/change-mobile2'], resolve)
    }
  },
  '/change_password': {
    data: {
      title: '修改密码',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false,
      permits: {
        premium: ['passed', 'pended', 'rejected'],
        certified: ['passed', 'pended', 'rejected'],
        normal: ['passed', 'pended', 'rejected']
      }
    },
    name: 'changePassword',
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
      tabVisible: false,
      skipAuth: true
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
      tabVisible: false,
      skipAuth: true
    },
    component(resolve) {
      require(['../views/login'], resolve)
    }
  },
  '/perfect': {
    name: 'perfect',
    data: {
      title: '上传名片进行认证',
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: false,
      permits: {
        premium: ['passed', 'pended', 'rejected'],
        certified: ['passed', 'pended', 'rejected'],
        normal: ['passed', 'pended', 'rejected']
      }
    },
    component(resolve) {
      require(['../views/perfect'], resolve)
    }
  },
  '/prefer': {
    name: 'prefer',
    data: {
      title: '偏好信息',
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: false,
      permits: {
        premium: ['passed', 'pended', 'rejected'],
        certified: ['passed', 'pended', 'rejected'],
        normal: ['passed', 'pended', 'rejected']
      }
    },
    component(resolve) {
      require(['../views/prefer'], resolve)
    }
  }
}
