export default function setValidators(validator) {
  let validators = [{
    name: 'mobile',
    message: '手机号码有误',
    check: function(value) {
      return value.match(/^1[3-9]\d{9}$/)
    }
  }, {
    name: 'required',
    message: '必填项不能为空',
    check: validator('required')
  }, {
    name: 'email',
    message: '邮箱地址有误',
    check: function(value) {
      return value.match(/[^@]+@.+/)
    }
  }]

  validators.forEach(function(v) {
    validator(v.name, {
      message: v.message,
      check: v.check
    })
  })
}
