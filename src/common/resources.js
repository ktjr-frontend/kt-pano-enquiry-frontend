let sessions
let registrations
let cards
let enquiries

export default function setResources(resource) {
  sessions = resource('sessions')
  registrations = resource('registrations{/content}')
  cards = resource('cards{/content}')
  enquiries = resource('enquiries{/content}')
}

export { sessions, registrations, cards, enquiries }
