export default [{
  name: '*融资规模',
  group: 'group1',
  key: 'asset_amount',
  type: 'input',
  subType: 'number',
  format: 'wy',
  placeholder: '不少于100万元',
  validate: {
    required: {
      rule: true,
      message: '融资规模不能为空'
    },
    min: {
      rule: 100,
      message: '融资规模最少为100万元'
    },
    pattern: {
      rule: '/^\\d+$/',
      message: '融资规模需要填数字'
    }
  },
  unit: '万元'
}, {
  name: '*融资期限',
  group: 'group1',
  key: 'asset_life',
  type: 'input',
  subType: 'number',
  placeholder: '大于等于1个月',
  validate: {
    required: {
      rule: true,
      message: '融资期限不能为空'
    },
    min: {
      rule: 1,
      message: '融资期限不能为0'
    },
    pattern: {
      rule: '/^\\d+$/',
      message: '融资期限需要填数字'
    }
  },
  unit: '个月'
}]
