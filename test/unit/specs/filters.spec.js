import Vue from 'vue'
import Filters from 'src/filters/index'

Vue.use(Filters)

describe('自定义过滤器', () => {
  let vm

  before(() => {
    // 实际用例
    vm = new Vue({
      template: `<div>
              <span class='ktPercent'>{{percent | ktPercent 2 "%"}}</span>
              <span class='ktRangePercent'>{{percent | ktRangePercent percent2 2}}</span>
            </div>`,
      data: {
        percent: 0.2666,
        percent2: 0.2333
      }
    }).$mount()
  })

  it('ktPercent 验证', () => {
    let ktPercent = Vue.filter('ktPercent')
    expect(ktPercent(1.223, 2)).to.equal('1.22')
    expect(ktPercent('非数字', 2)).to.equal('')
    expect(ktPercent(null, 2)).to.equal('')
    expect(ktPercent(0, 2)).to.equal('0')
    expect(ktPercent(1.223, 2, '%')).to.equal('1.22%')
    expect(vm.$el.querySelector('.ktPercent').textContent).to.contain('0.27%')
  })

  it('ktRangePercent 验证', () => {
    let ktRangePercent = Vue.filter('ktRangePercent')
    expect(ktRangePercent(null, null, 2)).to.equal('%')
    expect(ktRangePercent('2.223', '2.223', 2)).to.equal('%')
    expect(ktRangePercent('非数字', '非数字', 2)).to.equal('%')
    expect(ktRangePercent(2.223, 3.223, 1)).to.equal('2.2-3.2%')
    expect(ktRangePercent(2.223, 2.211, 1)).to.equal('2.2%')
    expect(ktRangePercent(2.223, '', 1)).to.equal('2.2-%')
    expect(vm.$el.querySelector('.ktRangePercent').textContent).to.contain('0.27-0.23%')
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

  it('ktRound 验证', () => {
    let ktRound = Vue.filter('ktRound')
    expect(ktRound(2.333, 2)).to.equal(2.33)
    expect(ktRound(2.003, 2)).to.equal(2)
  })

  it('ktPrepend 验证', () => {
    let ktPrepend = Vue.filter('ktPrepend')
    expect(ktPrepend(2, '$')).to.equal('$2')
    expect(ktPrepend(0, '$')).to.equal('$0')
    expect(ktPrepend(null, '$')).to.equal('$')
  })

  it('ktPositveNumber 验证', () => {
    let ktPositveNumber = Vue.filter('ktPositveNumber')
    expect(ktPositveNumber(2)).to.equal('+2')
    expect(ktPositveNumber(-2)).to.equal(-2)
    expect(ktPositveNumber('2')).to.equal('2')
  })

  it('moment 验证', () => {
    let moment = Vue.filter('moment')
    expect(moment(new Date(2016, 3, 12), 'YYYY-MM-DD HH:mm:ss')).to.equal('2016-04-12 00:00:00')
    expect(moment([2016, 14, 25], 'YYYY-MM-DD HH:mm:ss')).to.equal('Invalid date')
  })
})
