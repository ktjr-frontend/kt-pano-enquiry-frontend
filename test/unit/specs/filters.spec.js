import Vue from 'vue'
import Filters from 'src/filters/index'

Vue.use(Filters)

describe('自定义过滤器', () => {
  it('ktPercent 验证', () => {
    let ktPercent = Vue.filter('ktPercent')
    expect(ktPercent(1.223, 2)).to.equal('1.22')
    expect(ktPercent('非数字', 2)).to.equal('')
    expect(ktPercent(1.223, 2, '%')).to.equal('1.22%')
  })
})
