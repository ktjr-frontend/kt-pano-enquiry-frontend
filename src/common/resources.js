var users

export default function setResources(resource) {
  users = resource('sessions')
}

export { users }
