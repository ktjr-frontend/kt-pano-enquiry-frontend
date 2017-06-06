let headVisible = process.env.NODE_ENV.indexOf('app') > -1
export default {
  '/qa/question': {
    data: {
      title: '我要提问',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false,
      skipAuth: true,
      compatiblePc: true
    },
    name: 'askQuestion',
    component(resolve) {
      require(['../views/qa/question.vue'], resolve)
    }
  },
  '/qa/answer': {
    data: {
      title: '我要回答',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false,
      skipAuth: true,
      compatiblePc: true
    },
    name: 'askQuestion',
    component(resolve) {
      require(['../views/qa/answer.vue'], resolve)
    }
  },
  '/qa/success': {
    data: {
      title: '提交成功',
      logoBottomVisible: false,
      headVisible: headVisible,
      tabVisible: false,
      skipAuth: true,
      compatiblePc: true
    },
    name: 'qaSuccess',
    component(resolve) {
      require(['../views/qa/success.vue'], resolve)
    }
  }
}
