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
          headVisible: true,
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
          headVisible: true,
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
          headVisible: false,
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
      title: '选择对接机构',
      shareButtonVisible: false,
      logoBottomVisible: false,
      headVisible: true,
      tabVisible: false
    }
  },
  '/project_info/:type': {
    name: 'projectInfo',
    needLogin: true,
    component: resolve => require(['../views/quotation/project_info.vue'], resolve),
    data: {
      title: '选择对接机构',
      shareButtonVisible: false,
      logoBottomVisible: false,
      headVisible: true,
      tabVisible: false
    }
  }
}
