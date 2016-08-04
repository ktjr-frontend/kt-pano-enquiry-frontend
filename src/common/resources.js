let sessions
let registrations
let cards
let enquiries
let feedbacks

export default function setResources(resource) {
  sessions = resource('sessions')
  registrations = resource('registrations{/content}')
  cards = resource('cards{/content}')
  enquiries = resource('enquiries{/type}')
  feedbacks = resource('feedbacks')
}

export { sessions, registrations, cards, enquiries, feedbacks }
