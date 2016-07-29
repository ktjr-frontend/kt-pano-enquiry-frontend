var sessions
var registrations
var cards

export default function setResources(resource) {
  sessions = resource('sessions')
  registrations = resource('registrations{/content}')
  cards = resource('cards{/content}')
}

export { sessions, registrations, cards }
