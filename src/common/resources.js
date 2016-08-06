let sessions
let registrations
let cards
let enquiries
let sharedEnquiries
let feedbacks
let signatures
let log

export default function setResources(resource) {
  sessions = resource('sessions')
  registrations = resource('registrations{/content}')
  cards = resource('cards{/content}')
  enquiries = resource('inquiries{/content}')
    // sharedEnquiries = resource('shared_enquiries{/type}')
  feedbacks = resource('feedbacks')
  signatures = resource('inquiries/get_wx_tokens')
  log = resource('shadows')
}

export { sessions, registrations, cards, enquiries, feedbacks, sharedEnquiries, signatures, log }
