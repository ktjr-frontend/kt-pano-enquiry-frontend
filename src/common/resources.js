import Utils from './utils'

let sessions, registrations, cards, enquiries, sharedEnquiries, feedbacks, signatures, log

let previousRequestMap = {}
let commonOpts = {
  before(request) {
    let key = request.url + '?' + Utils.toQueryString(Object.assign({ method: request.method }, request.params))

    if (previousRequestMap[key]) {
      previousRequestMap[key].abort()
    }

    previousRequestMap[key] = request
  }
}

export default function setResources(resource) {
  sessions = resource('sessions', {}, {}, commonOpts)
  registrations = resource('registrations{/content}', {}, {}, commonOpts)
  cards = resource('cards{/content}', {}, {}, commonOpts)
  enquiries = resource('inquiries{/content}', {}, {}, commonOpts)
  feedbacks = resource('feedbacks', {}, {}, commonOpts)
  signatures = resource('inquiries/get_wx_tokens', {}, {}, commonOpts)
  log = resource('shadows', {}, {}, commonOpts)
}

export { sessions, registrations, cards, enquiries, feedbacks, sharedEnquiries, signatures, log }
