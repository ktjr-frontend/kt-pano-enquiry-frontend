import { pruneParams } from 'src/common/helpers.js'

describe('helpers 模型数据处理', () => {
  it('pruneParams 验证', () => {
    let demoParams = {
      p1: null,
      p2: '',
      p3: 0,
      p4: undefined,
      p5: 1,
      p6: 2,
      p7: 3,
      p8: 'hello'
    }

    let visible = {
      p5: false,
      p7: false
    }

    let pDemoparams = pruneParams(demoParams, visible)
    expect(pDemoparams).to.be.an('object')
    expect(pDemoparams).to.not.have.property('p1')
    expect(pDemoparams).to.not.have.property('p2')
    expect(pDemoparams).to.have.property('p3')
    expect(pDemoparams).to.have.property('p4')
    expect(pDemoparams).to.not.have.property('p5')
    expect(pDemoparams).to.have.property('p6')
    expect(pDemoparams).to.not.have.property('p7')
    expect(pDemoparams).to.have.property('p8')
  })
})
