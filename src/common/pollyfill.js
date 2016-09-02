export default {
  setup() {
    if (!String.prototype.startsWith) {
      /*eslint no-extend-native: ["error", { "exceptions": ["String"] }]*/
      String.prototype.startsWith = function(searchString, position) { // 不能用箭头函数，注意this指针的问题
        position = position || 0
        return this.substr(position, searchString.length) === searchString
      }
    }
  }
}
