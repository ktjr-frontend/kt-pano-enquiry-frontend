import Utils from 'src/common/utils.js'

describe('Utils 工具库类', () => {
  it('toQueryString 验证', () => {
    expect(Utils.toQueryString({ a: 'bbbb', b: 'cccc' })).to.be.equal('a=bbbb&b=cccc')
    expect(Utils.toQueryString({ a: 'bbbb=', b: 'cccc%' }, true)).to.be.equal('a=bbbb%3D&b=cccc%25')
  })

  it('uniqeId 验证', () => {
    expect(Utils.uniqeId(8)).to.have.lengthOf(8)
    expect(Utils.uniqeId(8)).to.have.match(/\w{8}/)
  })

  it('isWeixin 验证', () => {
    expect(Utils.isWeixin()).to.be.false
  })

  it('getReadTime 验证', () => {
    expect(Utils.getReadTime(11222)).to.equal(1000)
    expect(Utils.getReadTime('这是一句话')).to.be.equal(1500)
    expect(Utils.getReadTime('11111111112222')).to.be.below(4000)
    expect(Utils.getReadTime('11111111112222ddddddddddddddddddddddddddddddssfsdffdfdf')).to.be.below(4100)
  })

  it('getSessionByKey, setSessionByKey 验证', () => {
    let data = {
      a: 1
    }
    expect(Utils.getSessionByKey('test')).to.be.an('object')
    Utils.setSessionByKey('test', data)
    expect(Utils.getSessionByKey('test').a).to.be.equal(1)
    Utils.setSessionByKey('test', data, 'b')
    expect(Utils.getSessionByKey('test').b.a).to.be.equal(1)
  })

  it('getLocalByKey, setLocalByKey 验证', () => {
    let data = {
      a: 1
    }
    expect(Utils.getLocalByKey('test')).to.be.an('object')
    Utils.setLocalByKey('test', data)
    expect(Utils.getLocalByKey('test').a).to.be.equal(1)
  })

  it('compressImage 验证', () => {
    let img = new Image()
    img.onload = function() {
      let cInfo = Utils.compressImage(img)
      // expect(cInfo).to.be.an('object')
      expect(cInfo).to.have.property('size')
      expect(cInfo).to.have.property('type')
      expect(cInfo).to.have.property('slice')
    }

    img.src = require('../../../src/assets/images/weixin.jpg')
  })

  it('getImageInfo 验证', () => {
    Utils.getImageInfo(require('../../../src/assets/images/weixin.jpg')).then((imgInfo) => {
      expect(imgInfo).to.be.an('object')
      expect(imgInfo).to.have.property('direction')
      expect(imgInfo).to.have.property('width')
      expect(imgInfo).to.have.property('height')
      expect(imgInfo).to.have.property('widthHeightDiffPercent')
    }).catch(() => {
      console.error('getImageInfo error')
    })
  })

  it('HanZiPinYin 验证', () => {
    expect(Utils.HanZiPinYin.get('测试用例')).to.be.equal('CSYL')
    expect(Utils.HanZiPinYin.get('haha')).to.be.equal('HAHA')
    expect(Utils.HanZiPinYin.get('ha你好')).to.be.equal('HANH')
  })
})
