export default {
  '/index': {
    data: {
      title: '首页',
      logoBottomVisible: false,
      headVisible: false,
      tabVisible: false
    },
    name: 'home',
    // needLogin: true,
    component(resolve) {
      require(['../views/home'], resolve)
    }
  }
}
