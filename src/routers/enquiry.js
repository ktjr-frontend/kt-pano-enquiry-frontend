import Utils from '../common/utils'

let scrollYCache = Utils.getSessionByKey('scrollYCache')
let headVisible = process.env.NODE_ENV.indexOf('app') > -1
export default {
  '/enquiry': {
    data: {
      title: '选择类型',
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: true
    },
    name: 'enquiry',
    component(resolve) {
      require(['../views/enquiry/index'], resolve)
    }
  },
  'enquiry/:type': {
    data: {
      title: '请选择资产类型',
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: true
    },
    name: 'enquiryAssetTypes',
    component(resolve) {
      require(['../views/enquiry/enquiry-asset-types'], resolve)
    }
  },
  'enquiry/obligatory_right/eslate': {
    data: {
      title: '房地产类',
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: false
    },
    name: 'enquiryAssetEslate',
    component(resolve) {
      require(['../views/bond/enquiry-asset-eslate'], resolve)
    }
  },
  'enquiry/obligatory_right/government': {
    data: {
      title: '政信类',
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: false
    },
    name: 'enquiryAssetGovernment',
    component(resolve) {
      require(['../views/bond/enquiry-asset-government'], resolve)
    }
  },
  'enquiry/obligatory_right/enterprise': {
    data: {
      title: '企业借款类',
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: false
    },
    name: 'enquiryAssetEnterprise',
    component(resolve) {
      require(['../views/bond/enquiry-asset-enterprise'], resolve)
    }
  },
  'enquiry/obligatory_right/supply_chain': {
    data: {
      title: '供应链类',
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: false
    },
    name: 'enquiryAssetSupplyChain',
    component(resolve) {
      require(['../views/bond/enquiry-asset-supply-chain'], resolve)
    }
  },
  'enquiry/obligatory_right/mini_finance': {
    data: {
      title: '小微金融类',
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: false
    },
    name: 'enquiryAssetMiniFinance',
    component(resolve) {
      require(['../views/bond/enquiry-asset-mini-finance'], resolve)
    }
  },
  'enquiry/asset_manage/index': {
    data: {
      title: '资管类',
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: false
    },
    name: 'enquiryAssetManage',
    component(resolve) {
      require(['../views/asset-manage/index'], resolve)
    }
  },
  'enquiry/result': {
    data: {
      title: '询价结果',
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: true
    },
    name: 'enquiryResult',
    waitForData: true,
    scrollY: scrollY.enquiryResult,
    component(resolve) {
      require(['../views/enquiry/enquiry-result'], resolve)
    }
  },
  'enquiry/result/am': {
    data: {
      title: '询价结果',
      scrollY: scrollYCache.enquiryAmResult || 0,
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: true
    },
    name: 'enquiryAmResult',
    waitForData: false,
    component(resolve) {
      require(['../views/enquiry/enquiry-am-result'], resolve)
    }
  },
  'enquiry/share': {
    data: {
      title: '开通金融PANO询价服务',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false
    },
    name: 'enquiryShare',
    component(resolve) {
      require(['../views/enquiry/enquiry-share'], resolve)
    }
  },
  'enquiry/error': {
    data: {
      title: '询价结果',
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: true
    },
    name: 'enquiryError',
    component(resolve) {
      require(['../views/enquiry/enquiry-error'], resolve)
    }
  },
  'serivce_introduce': {
    data: {
      title: '开通服务介绍',
      logoBottomVisible: true,
      headVisible: headVisible,
      tabVisible: true
    },
    name: 'serviceIntroduce',
    component(resolve) {
      require(['../views/service-introduce'], resolve)
    }
  }
}
