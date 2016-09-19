export default {
  '/profile': {
    data: {
      title: '个人信息页',
      logoBottomVisible: false,
      headVisible: false,
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
      logoBottomVisible: false,
      headVisible: true,
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
      logoBottomVisible: false,
      headVisible: true,
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
      headVisible: true,
      tabVisible: true
    },
    name: 'settings',
    needLogin: true,
    component(resolve) {
      require(['../views/settings/settings'], resolve)
    }
  },
  '/forget_password1': {
    data: {
      title: '忘记密码-手机号校验',
      logoBottomVisible: true,
      headVisible: true,
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
      logoBottomVisible: true,
      headVisible: true,
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
      headVisible: true,
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
      headVisible: true,
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
      headVisible: true,
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
      headVisible: false,
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
      headVisible: false,
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
      headVisible: true,
      tabVisible: false
    },
    component(resolve) {
      require(['../views/perfect'], resolve)
    }
  }
}
