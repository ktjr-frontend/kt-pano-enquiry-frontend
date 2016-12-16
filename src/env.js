let env = {
}

let panoMap = {
  'dev-enquiry.pano.ktjr.com': 'http://dev-pano.ktjr.com',
  'stage-enquiry.pano.ktjr.com': 'http://stage-pano.ktjr.com',
  'pano-enquiry.ktjr.com': 'http://pano.ktjr.com'
}

let isProduction = process.env.NODE_ENV === 'production'
let isApp = process.env.NODE_ENV.indexOf('app') > -1

if (isApp) {
  env.hostName = 'http://pano.ktjr.com'
} else {
  env.hostName = isProduction ? panoMap[location.hostname] : 'http://localhost:8880'
}

export default env
