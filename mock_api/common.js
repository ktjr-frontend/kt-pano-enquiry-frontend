var proxyMidWare = require('./proxy').proxyMidWare
var Mock = require('mockjs')

module.exports = function(app) {
  var apiPrefix = app.get('apiPrefix')

  app.get(apiPrefix + '/inquiries/get_wx_tokens', proxyMidWare)
  app.get(apiPrefix + '/shadows', proxyMidWare)

  app.get(apiPrefix + '/inquiries/:content', function(req, res, next) {
    var data = {}
    console.log(req.query)
    if (req.params.content === 'search') {
      data = Mock.mock({
        params_key: '@id',
        // 'canot_publish': '@csentence(30,50)',
        'inquiry_life_asset_rate|0-100.0-1': 0,
        'inquiry_tactics_data|3': [{
          platform: '@cword(4,8)',
          recomm_reason: '@csentence(10, 20)',
          logo: '@image("200x100")',
          'rate|1-100.1': 1
        }]
      })
    } else if (req.params.content === 'res_by_key') {
      if (req.query.mark === 'search_am') {
        data = Mock.mock({
          params: req.query,
          res: {
            'inquiry_tactics_data|3': [{
              'rate|1-100.1': 1,
              'life_group|+1': ['1天', '1周', '2周'],
              'platforms|3': [{
                platform: '@cword(4,8)',
                'rate|1-100.1': 1,
                recomm_reason: '@csentence(10, 20)',
                logo: '@image("200x100")'
              }]
            }]
          }
        })
      } else {
        data = Mock.mock({
          params: req.query,
          res: {
            'inquiry_life_asset_rate|0-100.0-1': 0,
            'inquiry_tactics_data|3': [{
              platform: '@cword(4,8)',
              recomm_reason: '@csentence(10, 20)',
              logo: '@image("200x100")',
              'rate|1-100.1': 1
            }]
          }
        })
      }
    } else if (req.params.content === 'search_am') {
      data = Mock.mock({
        params_key: '@id',
        'inquiry_tactics_data|3': [{
          'rate|1-100.1': 1,
          'life_group|+1': ['1天', '1周', '2周'],
          'platforms|3': [{
            platform: '@cword(4,8)',
            'rate|1-100.1': 1,
            recomm_reason: '@csentence(10, 20)',
            logo: '@image("200x100")'
          }]
        }]
      })
    }

    setTimeout(function() {
      res.json(data)
    }, 300)
  })
}
