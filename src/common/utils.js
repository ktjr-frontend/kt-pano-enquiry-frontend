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
  },
  getEnvParams() {
    let panoMap = {
      'dev-enquiry.pano.ktjr.com': 'http://dev-pano.ktjr.com',
      'stage-enquiry.pano.ktjr.com': 'http://stage-pano.ktjr.com',
      'pano-enquiry.ktjr.com': 'https://pano.ktjr.com'
    }

    let token = encodeURIComponent(window.localStorage.token)
    let isProduction = process.env.NODE_ENV === 'production'
    let hostName = isProduction ? panoMap[location.hostname] : 'http://localhost:8880'

    return {
      hostName,
      token
    }
  },
  getReadTime(text) {
    let time = 1000
    if (text.length <= 10) {
      time = 1500
    } else if (text.length > 10) {
      time = Math.min(text.length * 100 + 500, 4000)
    }
    return time
  },
  compressImage(img) {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    let w = img.naturalWidth
    let h = img.naturalHeight
    canvas.width = 600
    canvas.height = h / w * 600
    ctx.drawImage(img, 0, 0, w, h, 0, 0, canvas.width, canvas.height)

    let data = canvas.toDataURL('image/jpeg')
    data = data.split(',')[1]
    data = window.atob(data) // 二进制
    let ia = new Uint8Array(data.length)
    for (let i = 0; i < data.length; i++) {
      ia[i] = data.charCodeAt(i)
    }

    //canvas.toDataURL 返回的默认格式就是 image/png
    return new Blob([ia], {
      type: 'image/jpeg'
    })
  }
}
