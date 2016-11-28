let headVisible = process.env.NODE_ENV.indexOf('app') > -1

export default {
  '/quotation': {
    name: 'quotation',
    // needLogin: true,
    component: resolve => require(['../views/quotation/layout.vue'], resolve),
    subRoutes: {
      '/ob': {
        data: {
          title: '开通PANO市场报价板',
          shareButtonVisible: true,
          logoBottomVisible: false,
          headVisible: headVisible,
          tabVisible: true
        },
        name: 'quotationOB',
        component: resolve => require(['../views/quotation/ob.vue'], resolve)
      },
      '/am': {
        data: {
          title: '开通PANO市场报价板',
          shareButtonVisible: true,
          logoBottomVisible: false,
          headVisible: headVisible,
          tabVisible: true
        },
        name: 'quotationAM',
        component: resolve => require(['../views/quotation/am.vue'], resolve)
      },
      '/detail': {
        data: {
          title: '报价详情',
          shareButtonVisible: false,
          logoBottomVisible: false,
          headVisible: headVisible,
          tabVisible: true
        },
        needLogin: true,
        name: 'quotationDetail',
        component: resolve => require(['../views/quotation/detail.vue'], resolve)
      }
    }
  },
  '/join_inst/:type': {
    name: 'joinInst',
    needLogin: true,
    component: resolve => require(['../views/quotation/join_inst.vue'], resolve),
    data: {
      title: '选择意向对接机构',
      shareButtonVisible: false,
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: true
    }
  },
  '/project_info/:type': {
    name: 'projectInfo',
    needLogin: true,
    component: resolve => require(['../views/quotation/project_info.vue'], resolve),
    data: {
      title: '填写项目信息',
      shareButtonVisible: false,
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: true
    }
  }
}
