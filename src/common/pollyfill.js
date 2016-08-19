export default {
  setup() {
    if (!String.prototype.startsWith) {
      /*eslint no-extend-native: ["error", { "exceptions": ["String"] }]*/
      String.prototype.startsWith = function(searchString, position) {
        position = position || 0
        return this.substr(position, searchString.length) === searchString
      }
    }
  }
}
