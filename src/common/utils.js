export default {
  toQueryString: function(obj, encode) { // 写成function 否则格式化代码有问题
    let parts = []
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (encode) {
          parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]))
        } else {
          parts.push(i + '=' + obj[i])
        }
      }
    }
    return parts.join('&')
  },
  uniqeId(length) {
    let text = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  },
  isWeixin() {
    var ua = navigator.userAgent.toLowerCase()
    if (ua.match(/.*MicroMessenger/i)) {
      return true
    }
    return false
  }
}
