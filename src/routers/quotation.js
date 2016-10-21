export default {
  '/quotation': {
    name: 'quotation',
    // needLogin: true,
    component: resolve => require(['../views/quotation/layout.vue'], resolve),
    subRoutes: {
      '/ob': {
        data: {
          title: '市场报价板-资产类',
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
          title: '市场报价板-资管类',
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
          title: '市场报价板-详情',
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
  }
}
