import Vue from 'vue'
import Filters from 'src/filters/index'

Vue.use(Filters)

describe('自定义过滤器', () => {
  it('ktPercent 验证', () => {
    let ktPercent = Vue.filter('ktPercent')
    expect(ktPercent(1.223, 2)).to.equal('1.22')
    expect(ktPercent('非数字', 2)).to.equal('')
    expect(ktPercent(null, 2)).to.equal('')
    expect(ktPercent(0, 2)).to.equal('0.00')
    expect(ktPercent(1.223, 2, '%')).to.equal('1.22%')
  })

  it('ktAppend 验证', () => {
    let ktAppend = Vue.filter('ktAppend')
    expect(ktAppend(null, '元')).to.equal('元')
    expect(ktAppend(0, '元')).to.equal('0元')
    expect(ktAppend(100, '元')).to.equal('100元')
  })

  it('ktNull 验证', () => {
    let ktNull = Vue.filter('ktNull')
    expect(ktNull(null, '-')).to.equal('-')
    expect(ktNull(undefined, '-')).to.equal('-')
    expect(ktNull('', '-')).to.equal('-')
    expect(ktNull(0, '-')).to.equal('-')
    expect(ktNull(false, '-')).to.equal('-')
  })
})
