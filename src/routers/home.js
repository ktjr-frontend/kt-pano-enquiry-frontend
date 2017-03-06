let headVisible = process.env.NODE_ENV.indexOf('app') > -1
export default {
  '/index': {
    data: {
      title: '首页',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false
    },
    name: 'home',
    component(resolve) {
      require(['../views/home'], resolve)
    }
  }
}
