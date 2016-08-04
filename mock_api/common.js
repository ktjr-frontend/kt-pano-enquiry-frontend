var proxyMidWare = require('./proxy').proxyMidWare
var Mock = require('mockjs')

module.exports = function(app) {
  var apiPrefix = app.get('apiPrefix')

  app.get(apiPrefix + '/enquiries/:type', function(req, res, next) {
    var data = Mock.mock({
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
    }, 500)
  })

  app.post(apiPrefix + '/feedbacks', function(req, res, next) {
    res.json({
      ok: true
    })
  })

  app.get(apiPrefix + '/shadows', proxyMidWare)
}
