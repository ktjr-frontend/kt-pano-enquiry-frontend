var proxyMidWare = require('./proxy').proxyMidWare

module.exports = function(app) {
  var apiPrefix = app.get('apiPrefix')

  app.get(apiPrefix + '/sessions', proxyMidWare)
  app.post(apiPrefix + '/sessions', proxyMidWare)
}
