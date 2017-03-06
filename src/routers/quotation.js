let headVisible = process.env.NODE_ENV.indexOf('app') > -1

export default {
  '/quotation': {
    name: 'quotation',
    component: resolve => require(['../views/quotation/layout.vue'], resolve),
    subRoutes: {
      '/ob': {
        data: {
          title: '开通PANO市场报价板',
          shareButtonVisible: true,
          logoBottomVisible: false,
          headVisible: headVisible,
          tabVisible: true,
          skipAuth: true
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
          tabVisible: true,
          skipAuth: true
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
          tabVisible: true,
          permits: {
            premium: ['passed', 'pended'],
            certified: ['passed', 'pended'],
            normal: ['passed', 'pended']
          }
        },
        name: 'quotationDetail',
        component: resolve => require(['../views/quotation/detail.vue'], resolve)
      }
    }
  },
  '/join_inst/:type': {
    name: 'joinInst',
    component: resolve => require(['../views/quotation/join_inst.vue'], resolve),
    data: {
      title: '选择意向对接机构',
      shareButtonVisible: false,
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: true,
      permits: {
        premium: ['passed', 'pended'],
        certified: ['passed', 'pended'],
        normal: ['passed', 'pended']
      }
    }
  },
  '/project_info/:type': {
    name: 'projectInfo',
    component: resolve => require(['../views/quotation/project_info.vue'], resolve),
    data: {
      title: '填写项目信息',
      shareButtonVisible: false,
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: true,
      permits: {
        premium: ['passed', 'pended'],
        certified: ['passed', 'pended'],
        normal: ['passed', 'pended']
      }
    }
  }
}
