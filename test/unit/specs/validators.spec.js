import Vue from 'vue'
import setValidators from 'src/common/validators.js'
import VueValidator from 'vue-validator'
// import _ from 'lodash'

Vue.use(VueValidator)
setValidators(Vue.validator)

describe('表单验证自定义验证器', () => {
  it('mobile 验证', () => {
    let mobileValidator = Vue.validator('mobile')
    expect(mobileValidator.check('13011111111')).to.be.ok
    expect(mobileValidator.check('19911111111')).to.be.ok
    expect(mobileValidator.check('12511111111')).to.be.null
    expect(mobileValidator.check('11511111111')).to.be.null
    expect(mobileValidator.check('21511111111')).to.be.null
    expect(mobileValidator.check('115')).to.be.null
    expect(mobileValidator.check('133000011111')).to.be.null
  })

  it('email 验证', () => {
    let emailValidator = Vue.validator('email')
    expect(emailValidator.check('21323@qq.com')).to.be.ok
    expect(emailValidator.check('11111@qqq')).to.be.ok
    expect(emailValidator.check('luxueyan.ketjr')).to.be.null
    expect(emailValidator.check('@qq.com')).to.be.null
    expect(emailValidator.check('@qq@com')).to.be.null
  })

  it('required 验证', () => {
    let requiredValidator = Vue.validator('required')
    expect(requiredValidator.check('')).to.be.false
    expect(requiredValidator.check(null)).to.be.false
    expect(requiredValidator.check(undefined)).to.be.false
    expect(requiredValidator.check(1)).to.be.true
    expect(requiredValidator.check('1')).to.be.true
    expect(requiredValidator.check('add')).to.be.true
  })

  it('equal 验证', () => {
    let equalValidator = Vue.validator('equal')

    // hack a vm instance
    let hackVm = new Vue({
      data: {
        name: 22222,
        _vm: null
      }
    })
    hackVm._vm = hackVm

    expect(equalValidator.check.call(hackVm, 22222, 'name')).to.be.true
    expect(equalValidator.check.call(hackVm, 2222, 'name')).to.be.false
  })

  it('password 验证', () => {
    let passwordValidator = Vue.validator('password')
    expect(passwordValidator.check('121313')).to.be.null
    expect(passwordValidator.check('aaaaddddd')).to.be.null
    expect(passwordValidator.check('ADDDaaaaaa')).to.be.null
    expect(passwordValidator.check('1213a')).to.be.null
    expect(passwordValidator.check('12133abd_')).to.be.ok
    expect(passwordValidator.check('1234567890987654321asdff')).to.be.null
  })
})
