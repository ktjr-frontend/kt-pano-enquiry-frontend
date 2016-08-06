var proxyMidWare = require('./proxy').proxyMidWare
var Mock = require('mockjs')

module.exports = function(app) {
  var apiPrefix = app.get('apiPrefix')

  app.get(apiPrefix + '/enquiries', function(req, res, next) {
    var data = Mock.mock({
      'enquiry_error': '@csentence(30,50)',
      'average_rate|0-100.0-10': 0,
      'key': '@id',
      'results|3': [{
        name: '@cword(4,8)',
        desc: '@csentence(10, 20)',
        logo: '@image("200x100")',
        'rate|1-100.1-10': 1
      }]
    })
    setTimeout(function() {
      res.json(data)
    }, 300)
  })

  app.get(apiPrefix + '/shared_enquiries', function(req, res, next) {
    var data = Mock.mock({
      'query': {
        'amount|100000-1000000': 1,
        'duration|1-100': 1,
        'guarantee|1': true,
        'type|1': ['eslate', 'government', 'enterprise', 'supply_chain', 'mini_finance']
      },
      'enquiry_error': '@csentence(30,50)',
      'average_rate|0-100.0-10': 0,
      'results|3': [{
        name: '@cword(4,8)',
        desc: '@csentence(10, 20)',
        logo: '@image("200x100")',
        'rate|1-100.1-10': 1
      }]
    })
    setTimeout(function() {
      res.json(data)
    }, 300)
  })

  app.get(apiPrefix + '/shared_enquiries', function(req, res, next) {
    var data = Mock.mock({
      'query': {
        'amount|100000-1000000': 1,
        'duration|1-100': 1,
        'guarantee|1': true,
        'type|1': ['eslate', 'government', 'enterprise', 'supply_chain', 'mini_finance']
      },
      'enquiry_error': '@csentence(30,50)',
      'average_rate|0-100.0-10': 0,
      'results|3': [{
        name: '@cword(4,8)',
        desc: '@csentence(10, 20)',
        logo: '@image("200x100")',
        'rate|1-100.1-10': 1
      }]
    })
    setTimeout(function() {
      res.json(data)
    }, 300)
  })

  app.post(apiPrefix + '/feedbacks', function(req, res, next) {
    res.json({
      ok: true
    })
  })

  app.get(apiPrefix + '/signatures', function(req, res, next) {
    res.json({
      timestamp: +new Date(), // 必填，生成签名的时间戳
      nonceStr: '@id', // 必填，生成签名的随机串
      signature: '@guid', // 必填，签名，见附录1
    })
  })

  app.get(apiPrefix + '/shadows', proxyMidWare)
}
