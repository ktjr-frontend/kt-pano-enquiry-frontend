const env = {
}

const panoMap = {
  'dev-enquiry.pano.ktjr.com': 'http://dev-pano.ktjr.com',
  'stage-enquiry.pano.ktjr.com': 'http://stage-pano.ktjr.com',
  'pano-enquiry.ktjr.com': 'http://pano.ktjr.com'
}

const isProduction = process.env.NODE_ENV === 'production'
const isApp = process.env.NODE_ENV.indexOf('app') > -1

if (isApp) {
  env.hostName = 'http://pano.ktjr.com'
} else {
  env.hostName = isProduction ? panoMap[location.hostname] : `http://${location.hostname}:8880`
}

export default env
